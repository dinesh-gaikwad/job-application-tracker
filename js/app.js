let applications = JSON.parse(localStorage.getItem('jobApps')) || [
    { id: 1, company: "Microsoft", role: "Software Engineer", status: "Interview", date: "2026-04-15" },
    { id: 2, company: "Google", role: "Frontend Developer", status: "Applied", date: "2026-04-20" },
    { id: 3, company: "Amazon", role: "Full Stack Engineer", status: "Offer", date: "2026-04-10" }
];

const grid = document.getElementById('applications-grid');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const appForm = document.getElementById('appForm');

// Render function
function renderApps(filter = '') {
    const filtered = applications.filter(app => 
        app.company.toLowerCase().includes(filter.toLowerCase()) ||
        app.role.toLowerCase().includes(filter.toLowerCase())
    );
    
    grid.innerHTML = filtered.map(app => `
        <div class="app-card">
            <h4>${app.company}</h4>
            <p><strong>${app.role}</strong></p>
            <p>Status: <span class="status ${app.status.toLowerCase()}">${app.status}</span></p>
            <p>Date: ${app.date}</p>
            <button onclick="deleteApp(${app.id})" class="btn-delete">Delete</button>
        </div>
    `).join('');
    
    updateStats();
    localStorage.setItem('jobApps', JSON.stringify(applications));
}

// Update statistics
function updateStats() {
    document.getElementById('total-apps').textContent = applications.length;
    document.getElementById('interviews').textContent = applications.filter(a => a.status === 'Interview').length;
    document.getElementById('offers').textContent = applications.filter(a => a.status === 'Offer').length;
}

// Delete application
function deleteApp(id) {
    applications = applications.filter(app => app.id !== id);
    renderApps(search.value);
}

// Modal controls
addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    appForm.reset();
});

// Form submit
appForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newApp = {
        id: Date.now(),
        company: document.getElementById('company').value,
        role: document.getElementById('role').value,
        status: document.getElementById('status').value,
        date: document.getElementById('date').value
    };
    applications.unshift(newApp);
    renderApps();
    modal.classList.add('hidden');
    appForm.reset();
});

// Search
search.addEventListener('input', (e) => renderApps(e.target.value));

// Initial render
renderApps();