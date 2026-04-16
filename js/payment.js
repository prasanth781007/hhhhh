/* ============================================
   PAYMENT.JS – Razorpay Integration & Form Logic
   ============================================ */

(function () {
  'use strict';

  const form = document.getElementById('donationForm');
  const submitBtn = document.getElementById('donateSubmitBtn');
  if (!form || !submitBtn) return;

  // ---- Amount Preset Buttons ----
  const amountInput = document.getElementById('donorAmount');
  const amountBtns = document.querySelectorAll('.amount-btn');

  amountBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      amountBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (amountInput) amountInput.value = btn.dataset.amount;
    });
  });

  if (amountInput) {
    amountInput.addEventListener('input', () => {
      amountBtns.forEach((b) => b.classList.remove('active'));
      // Highlight preset if value matches
      amountBtns.forEach((b) => {
        if (b.dataset.amount === amountInput.value) b.classList.add('active');
      });
    });
  }

  // ---- Payment Method Toggle ----
  const paymentOptions = document.querySelectorAll('.payment-option');
  let selectedMethod = 'upi';

  paymentOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      paymentOptions.forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
      selectedMethod = opt.dataset.method;
    });
  });

  // ---- Form Validation ----
  function validateForm() {
    let valid = true;
    const name = document.getElementById('donorName');
    const email = document.getElementById('donorEmail');
    const amount = document.getElementById('donorAmount');

    // Reset errors
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
    document.querySelectorAll('.form-control').forEach((c) => c.classList.remove('error'));

    // Name
    if (!name.value.trim()) {
      document.getElementById('fg-name').classList.add('has-error');
      name.classList.add('error');
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      document.getElementById('fg-email').classList.add('has-error');
      email.classList.add('error');
      valid = false;
    }

    // Amount
    if (!amount.value || parseInt(amount.value) < 50) {
      document.getElementById('fg-amount').classList.add('has-error');
      amount.classList.add('error');
      valid = false;
    }

    return valid;
  }

  // ---- Live field validation (clear error on input) ----
  ['donorName', 'donorEmail', 'donorAmount'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const fg = el.closest('.form-group');
        if (fg) fg.classList.remove('has-error');
      });
    }
  });

  // ---- Submit / Razorpay Checkout ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.showToast('Please fill all required fields correctly.', 'error');
      return;
    }

    const name = document.getElementById('donorName').value.trim();
    const email = document.getElementById('donorEmail').value.trim();
    const phone = document.getElementById('donorPhone')?.value.trim() || '';
    const amount = parseInt(document.getElementById('donorAmount').value);
    const message = document.getElementById('donorMessage')?.value.trim() || '';

    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
      // Fallback: simulate payment for demo
      simulatePayment(name, email, phone, amount, message);
      return;
    }

    // Razorpay Options
    const options = {
      key: 'rzp_test_YourKeyHere', // Replace with your Razorpay Test Key
      amount: amount * 100, // Razorpay works in paise
      currency: 'INR',
      name: 'Virtual Tribal Tourism',
      description: 'Donation for tribal community support',
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌿</text></svg>',
      handler: function (response) {
        // Payment successful
        handlePaymentSuccess({
          paymentId: response.razorpay_payment_id,
          name,
          email,
          phone,
          amount,
          message,
          method: selectedMethod,
        });
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        donor_message: message,
        project: 'Virtual Tribal Tourism',
      },
      theme: {
        color: '#c0622f',
      },
      modal: {
        ondismiss: function () {
          window.showToast('Payment cancelled. You can try again anytime.', 'info');
        },
      },
      // Pre-select method
      method: {
        upi: selectedMethod === 'upi',
        card: selectedMethod === 'card',
        netbanking: selectedMethod === 'netbanking',
      },
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response) {
        handlePaymentFailure(response.error);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay error:', err);
      simulatePayment(name, email, phone, amount, message);
    }
  });

  // ---- Handle Successful Payment ----
  function handlePaymentSuccess(data) {
    // Show loading
    submitBtn.classList.add('loading');

    // Save to backend
    saveDonation(data)
      .then(() => {
        window.showToast(
          `Thank you, ${data.name}! ₹${data.amount.toLocaleString('en-IN')} received successfully!`,
          'success',
          6000
        );
        form.reset();
        document.getElementById('donorAmount').value = '2500';
        amountBtns.forEach((b) => b.classList.remove('active'));
        document.querySelector('.amount-btn[data-amount="2500"]')?.classList.add('active');
      })
      .catch(() => {
        window.showToast('Payment received but there was an issue saving. We will contact you.', 'info');
      })
      .finally(() => {
        submitBtn.classList.remove('loading');
      });
  }

  // ---- Handle Failed Payment ----
  function handlePaymentFailure(error) {
    console.error('Payment failed:', error);
    window.showToast(
      `Payment failed: ${error.description || 'Unknown error'}. Please try again.`,
      'error',
      5000
    );
  }

  // ---- Save Donation to Backend ----
  async function saveDonation(data) {
    try {
      const response = await fetch('backend/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_donation',
          payment_id: data.paymentId || 'SIM_' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          amount: data.amount,
          message: data.message,
          method: data.method || selectedMethod,
          status: 'success',
        }),
      });

      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (err) {
      console.warn('Backend save failed, storing locally:', err);
      // Fallback: save to localStorage
      const donations = JSON.parse(localStorage.getItem('vtt_donations') || '[]');
      donations.push({
        id: data.paymentId || 'SIM_' + Date.now(),
        ...data,
        date: new Date().toISOString(),
        status: 'success',
      });
      localStorage.setItem('vtt_donations', JSON.stringify(donations));
      return { success: true, local: true };
    }
  }

  // ---- Simulate Payment (Demo Mode) ----
  function simulatePayment(name, email, phone, amount, message) {
    submitBtn.classList.add('loading');

    window.showToast('Processing payment... (Demo Mode)', 'info', 2000);

    setTimeout(() => {
      const fakeId = 'pay_DEMO_' + Math.random().toString(36).substr(2, 14);
      handlePaymentSuccess({
        paymentId: fakeId,
        name,
        email,
        phone,
        amount,
        message,
        method: selectedMethod,
      });
    }, 2000);
  }
})();
