const form = document.getElementById('employeeForm');
const errorsDiv = document.getElementById('formErrors');
const existing = JSON.parse(localStorage.getItem('editEmployee'));

if (existing) {
  document.getElementById('firstName').value = existing.firstName;
  document.getElementById('lastName').value = existing.lastName;
  document.getElementById('email').value = existing.email;
  document.getElementById('department').value = existing.department;
  document.getElementById('role').value = existing.role;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newData = {
    id: existing ? existing.id : Date.now(),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value.trim(),
    role: document.getElementById('role').value.trim()
  };
  const errors = validateForm(newData);
  if (errors.length > 0) {
    errorsDiv.innerText = errors.join('\n');
    return;
  }
  if (existing) {
    employees = employees.map(e => e.id === newData.id ? newData : e);
    localStorage.removeItem('editEmployee');
  } else {
    employees.push(newData);
  }
  window.location = 'index.html';
});