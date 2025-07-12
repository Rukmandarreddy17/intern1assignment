function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateForm(data) {
  const errors = [];
  if (!data.firstName) errors.push("First name is required");
  if (!data.email || !validateEmail(data.email)) errors.push("Valid email is required");
  return errors;
}