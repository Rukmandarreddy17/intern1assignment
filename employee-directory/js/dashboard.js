function renderEmployees(list) {
  const container = document.getElementById('employeeList');
  container.innerHTML = '';
  list.forEach(emp => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${emp.firstName} ${emp.lastName}</strong><br>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>`;
    container.appendChild(div);
  });
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  localStorage.setItem('editEmployee', JSON.stringify(emp));
  window.location = 'add-edit.html';
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  renderEmployees(employees);
}

function applyFilters() {
  let list = [...employees];
  const name = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();
  if (name) list = list.filter(e => e.firstName.toLowerCase().includes(name));
  if (dept) list = list.filter(e => e.department.toLowerCase().includes(dept));
  if (role) list = list.filter(e => e.role.toLowerCase().includes(role));
  renderEmployees(list);
}

window.onload = function () {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = employees.filter(emp =>
      emp.firstName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query)
    );
    renderEmployees(filtered);
  });

  document.getElementById('filterToggle').onclick = () => {
    document.getElementById('filterPanel').classList.toggle('hidden');
  };

  document.getElementById('applyFilter').onclick = applyFilters;
  document.getElementById('resetFilter').onclick = () => {
    document.getElementById('filterFirstName').value = '';
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterRole').value = '';
    renderEmployees(employees);
  };

  document.getElementById('sortSelect').onchange = function () {
    const key = this.value;
    if (key) {
      employees.sort((a, b) => a[key].localeCompare(b[key]));
      renderEmployees(employees);
    }
  };

  renderEmployees(employees);
};