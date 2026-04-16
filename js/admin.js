/* ============================================
   ADMIN.JS – Dashboard Logic, Tables, Charts
   ============================================ */

(function () {
  'use strict';

  // ---- Demo Data ----
  const DEMO_DONORS = [
    { id: 'pay_R1a2b3c4d5e6', name: 'Rahul Sharma', email: 'rahul@gmail.com', amount: 5000, method: 'UPI', status: 'success', date: '2024-10-15 14:32' },
    { id: 'pay_R7f8g9h0i1j2', name: 'Priya Nair', email: 'priya@gmail.com', amount: 2500, method: 'Card', status: 'success', date: '2024-10-14 10:15' },
    { id: 'pay_R3k4l5m6n7o8', name: 'Arjun Mehta', email: 'arjun@yahoo.com', amount: 10000, method: 'Net Banking', status: 'success', date: '2024-10-13 09:48' },
    { id: 'pay_R9p0q1r2s3t4', name: 'Sneha Krishnan', email: 'sneha@outlook.com', amount: 1000, method: 'UPI', status: 'success', date: '2024-10-12 18:22' },
    { id: 'pay_R5u6v7w8x9y0', name: 'Vijay Kumar', email: 'vijay@gmail.com', amount: 7500, method: 'Card', status: 'success', date: '2024-10-11 11:05' },
    { id: 'pay_Ra1b2c3d4e5f6', name: 'Meera Joshi', email: 'meera@gmail.com', amount: 3000, method: 'UPI', status: 'success', date: '2024-10-10 16:44' },
    { id: 'pay_Rg7h8i9j0k1l2', name: 'Karthik Reddy', email: 'karthik@gmail.com', amount: 500, method: 'UPI', status: 'success', date: '2024-10-09 08:33' },
    { id: 'pay_Rm3n4o5p6q7r8', name: 'Anita Desai', email: 'anita@outlook.com', amount: 2000, method: 'Card', status: 'pending', date: '2024-10-08 15:16' },
    { id: 'pay_Rs9t0u1v2w3x4', name: 'Suresh Babu', email: 'suresh@yahoo.com', amount: 4000, method: 'Net Banking', status: 'success', date: '2024-10-07 12:55' },
    { id: 'pay_Ry5z6a7b8c9d0', name: 'Lakshmi Menon', email: 'lakshmi@gmail.com', amount: 1500, method: 'UPI', status: 'success', date: '2024-10-06 19:07' },
    { id: 'pay_Re1f2g3h4i5j6', name: 'Deepak Gupta', email: 'deepak@gmail.com', amount: 8000, method: 'Card', status: 'success', date: '2024-10-05 10:29' },
    { id: 'pay_Rk7l8m9n0o1p2', name: 'Pooja Patel', email: 'pooja@outlook.com', amount: 2500, method: 'UPI', status: 'failed', date: '2024-10-04 14:41' },
    { id: 'pay_Rq3r4s5t6u7v8', name: 'Amit Singh', email: 'amit@gmail.com', amount: 6000, method: 'Net Banking', status: 'success', date: '2024-10-03 08:18' },
    { id: 'pay_Rw9x0y1z2a3b4', name: 'Nandini Rao', email: 'nandini@gmail.com', amount: 3500, method: 'UPI', status: 'success', date: '2024-10-02 11:36' },
    { id: 'pay_Rc5d6e7f8g9h0', name: 'Ravi Shankar', email: 'ravi@yahoo.com', amount: 1000, method: 'UPI', status: 'success', date: '2024-10-01 17:52' },
    { id: 'pay_Ri1j2k3l4m5n6', name: 'Swathi V', email: 'swathi@gmail.com', amount: 4500, method: 'Card', status: 'success', date: '2024-09-30 09:14' },
    { id: 'pay_Ro7p8q9r0s1t2', name: 'Manoj Tiwari', email: 'manoj@gmail.com', amount: 700, method: 'UPI', status: 'pending', date: '2024-09-29 13:27' },
    { id: 'pay_Ru3v4w5x6y7z8', name: 'Kavita Sharma', email: 'kavita@outlook.com', amount: 2000, method: 'Card', status: 'success', date: '2024-09-28 16:03' },
    { id: 'pay_Ra9b0c1d2e3f4', name: 'Prakash Jain', email: 'prakash@gmail.com', amount: 5500, method: 'Net Banking', status: 'success', date: '2024-09-27 10:45' },
    { id: 'pay_Rg5h6i7j8k9l0', name: 'Divya Iyer', email: 'divya@gmail.com', amount: 1200, method: 'UPI', status: 'failed', date: '2024-09-26 14:58' },
    { id: 'pay_Rm1n2o3p4q5r6', name: 'Sanjay Mishra', email: 'sanjay@yahoo.com', amount: 3000, method: 'UPI', status: 'success', date: '2024-09-25 08:31' },
    { id: 'pay_Rs7t8u9v0w1x2', name: 'Rekha Nair', email: 'rekha@gmail.com', amount: 9000, method: 'Card', status: 'success', date: '2024-09-24 12:16' },
    { id: 'pay_Ry3z4a5b6c7d8', name: 'Ganesh P', email: 'ganesh@gmail.com', amount: 750, method: 'UPI', status: 'success', date: '2024-09-23 17:42' },
    { id: 'pay_Re9f0g1h2i3j4', name: 'Sunita Kulkarni', email: 'sunita@outlook.com', amount: 2200, method: 'Net Banking', status: 'success', date: '2024-09-22 09:55' },
  ];

  const CHART_DATA = [
    { label: 'Jan', value: 180000 },
    { label: 'Feb', value: 220000 },
    { label: 'Mar', value: 195000 },
    { label: 'Apr', value: 280000 },
    { label: 'May', value: 310000 },
    { label: 'Jun', value: 245000 },
    { label: 'Jul', value: 270000 },
    { label: 'Aug', value: 350000 },
    { label: 'Sep', value: 290000 },
    { label: 'Oct', value: 260000 },
    { label: 'Nov', value: 320000 },
    { label: 'Dec', value: 280000 },
  ];

  // Merge localStorage data
  function getAllDonors() {
    const local = JSON.parse(localStorage.getItem('vtt_donations') || '[]');
    const localMapped = local.map((d) => ({
      id: d.id || d.paymentId || 'LOC_' + Date.now(),
      name: d.name,
      email: d.email,
      amount: d.amount,
      method: d.method || 'UPI',
      status: d.status || 'success',
      date: d.date ? new Date(d.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Recent',
    }));
    return [...localMapped, ...DEMO_DONORS];
  }

  // ---- Toast ----
  function showToast(msg, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.className = 'toast toast-' + type + ' show';
    toast.innerHTML = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // ---- Login ----
  const loginForm = document.getElementById('loginForm');
  const loginScreen = document.getElementById('adminLogin');
  const dashboard = document.getElementById('adminDashboard');

  if (loginForm) {
    // Check session
    if (sessionStorage.getItem('vtt_admin') === 'true') {
      loginScreen.style.display = 'none';
      dashboard.style.display = 'flex';
      initDashboard();
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('adminUser').value.trim();
      const pass = document.getElementById('adminPass').value;

      if (user === 'admin' && pass === 'admin123') {
        sessionStorage.setItem('vtt_admin', 'true');
        loginScreen.style.display = 'none';
        dashboard.style.display = 'flex';
        showToast('✅ Welcome, Admin!', 'success');
        initDashboard();
      } else {
        showToast('❌ Invalid credentials', 'error');
      }
    });
  }

  // ---- Logout ----
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('vtt_admin');
      dashboard.style.display = 'none';
      loginScreen.style.display = '';
      showToast('ℹ️ Logged out successfully', 'info');
    });
  }

  // ---- Sidebar Navigation ----
  document.querySelectorAll('.sidebar-nav-item[data-section]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;

      // Highlight active
      document.querySelectorAll('.sidebar-nav-item').forEach((i) => i.classList.remove('active'));
      item.classList.add('active');

      // Show section
      document.querySelectorAll('.admin-section').forEach((s) => s.classList.remove('active'));
      const sec = document.getElementById('sec-' + section);
      if (sec) sec.classList.add('active');

      // Update title
      const pg = document.getElementById('pageTitle');
      const ps = document.getElementById('pageSubtitle');
      if (pg) pg.textContent = item.querySelector('.sidebar-nav-label')?.textContent || 'Dashboard';
      if (ps) ps.textContent = 'Manage ' + section;

      // Close mobile sidebar
      closeMobileSidebar();
    });
  });

  // "View All" links
  document.querySelectorAll('[data-goto]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.goto;
      const navItem = document.querySelector(`.sidebar-nav-item[data-section="${target}"]`);
      if (navItem) navItem.click();
    });
  });

  // ---- Sidebar Toggle (Desktop) ----
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const mainArea = document.getElementById('adminMain');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      if (mainArea) mainArea.classList.toggle('shifted');
    });
  }

  // ---- Mobile Sidebar ----
  const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.style.display = 'none';
  }

  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      if (sidebarOverlay) sidebarOverlay.style.display = 'block';
    });
  }

  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);

  // Show mobile toggle when needed
  function checkMobileNav() {
    if (mobileSidebarToggle) {
      mobileSidebarToggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    }
  }
  window.addEventListener('resize', checkMobileNav);
  checkMobileNav();

  // ---- Init Dashboard ----
  function initDashboard() {
    renderChart('donationChart', 'chartLabels');
    renderChart('reportChart', 'reportChartLabels');
    renderRecentDonors();
    renderDonorsTable();
    renderPaymentsTable();
    animateProgressBars();
  }

  // ---- Chart ----
  function renderChart(containerId, labelsId) {
    const container = document.getElementById(containerId);
    const labelsEl = document.getElementById(labelsId);
    if (!container) return;

    const max = Math.max(...CHART_DATA.map((d) => d.value));
    container.innerHTML = '';
    if (labelsEl) labelsEl.innerHTML = '';

    CHART_DATA.forEach((d) => {
      const height = (d.value / max) * 180;
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = height + 'px';
      bar.innerHTML = `<div class="chart-bar-tooltip">₹${(d.value / 1000).toFixed(0)}K</div>`;
      container.appendChild(bar);

      if (labelsEl) {
        const lbl = document.createElement('div');
        lbl.className = 'chart-label';
        lbl.textContent = d.label;
        labelsEl.appendChild(lbl);
      }
    });
  }

  // ---- Recent Donors ----
  function renderRecentDonors() {
    const list = document.getElementById('recentDonorsList');
    if (!list) return;

    const donors = getAllDonors().slice(0, 6);
    list.innerHTML = donors
      .map(
        (d) => `
      <div class="donor-mini-item">
        <div class="donor-mini-avatar">${d.name.charAt(0)}</div>
        <div class="donor-mini-info">
          <h5>${d.name}</h5>
          <p>${d.date}</p>
        </div>
        <span class="donor-mini-amount">₹${d.amount.toLocaleString('en-IN')}</span>
      </div>
    `
      )
      .join('');
  }

  // ---- Donors Table ----
  let currentPage = 1;
  const perPage = 10;
  let filteredDonors = [];

  function renderDonorsTable() {
    filteredDonors = getAllDonors();
    applyFilters();
  }

  function applyFilters() {
    let donors = getAllDonors();

    // Search
    const searchVal = (document.getElementById('donorSearch')?.value || '').toLowerCase();
    if (searchVal) {
      donors = donors.filter(
        (d) => d.name.toLowerCase().includes(searchVal) || d.email.toLowerCase().includes(searchVal)
      );
    }

    // Status filter
    const statusVal = document.getElementById('donorStatusFilter')?.value || 'all';
    if (statusVal !== 'all') {
      donors = donors.filter((d) => d.status === statusVal);
    }

    filteredDonors = donors;
    currentPage = 1;
    renderTablePage();
  }

  function renderTablePage() {
    const tbody = document.getElementById('donorsTableBody');
    if (!tbody) return;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const page = filteredDonors.slice(start, end);

    tbody.innerHTML = page
      .map(
        (d) => `
      <tr>
        <td>
          <div class="td-name">
            <div class="td-avatar">${d.name.charAt(0)}</div>
            <span>${d.name}</span>
          </div>
        </td>
        <td>${d.email}</td>
        <td style="font-weight:700; color:var(--clr-accent);">₹${d.amount.toLocaleString('en-IN')}</td>
        <td>${d.method}</td>
        <td><span class="status-badge status-${d.status}">${d.status === 'success' ? '✓ ' : d.status === 'pending' ? '⏳ ' : '✕ '}${d.status}</span></td>
        <td style="white-space:nowrap;">${d.date}</td>
        <td style="font-size:0.78rem; color:var(--clr-mid);">${d.id.substring(0, 18)}…</td>
      </tr>
    `
      )
      .join('');

    // Pagination info
    const info = document.getElementById('paginationInfo');
    if (info) {
      info.textContent = `Showing ${start + 1}-${Math.min(end, filteredDonors.length)} of ${filteredDonors.length}`;
    }

    // Pagination controls
    const controls = document.getElementById('paginationControls');
    if (controls) {
      const totalPages = Math.ceil(filteredDonors.length / perPage);
      let html = '';
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      controls.innerHTML = html;
      controls.querySelectorAll('.page-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          currentPage = parseInt(btn.dataset.page);
          renderTablePage();
        });
      });
    }

    // Update donor count badge
    const badge = document.getElementById('donorCount');
    if (badge) badge.textContent = getAllDonors().length;
  }

  // Search / Filter listeners
  const donorSearch = document.getElementById('donorSearch');
  if (donorSearch) {
    donorSearch.addEventListener('input', () => applyFilters());
  }

  const statusFilter = document.getElementById('donorStatusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', () => applyFilters());
  }

  // ---- Payments Table ----
  function renderPaymentsTable() {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;

    const donors = getAllDonors();
    tbody.innerHTML = donors
      .slice(0, 15)
      .map(
        (d) => `
      <tr>
        <td style="font-size:0.82rem; color:var(--clr-mid);">${d.id}</td>
        <td>${d.name}</td>
        <td style="font-weight:700; color:var(--clr-accent);">₹${d.amount.toLocaleString('en-IN')}</td>
        <td>${d.method}</td>
        <td><span class="status-badge status-${d.status}">${d.status}</span></td>
        <td style="white-space:nowrap;">${d.date}</td>
      </tr>
    `
      )
      .join('');
  }

  // ---- Export CSV ----
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const donors = getAllDonors();
      let csv = 'Name,Email,Amount,Method,Status,Date,PaymentID\n';
      donors.forEach((d) => {
        csv += `"${d.name}","${d.email}",${d.amount},"${d.method}","${d.status}","${d.date}","${d.id}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vtt_donors_' + new Date().toISOString().split('T')[0] + '.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast('✅ CSV exported successfully!', 'success');
    });
  }

  // ---- Progress Bars ----
  function animateProgressBars() {
    document.querySelectorAll('.progress-fill[data-width]').forEach((bar) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 300);
    });
  }
})();
