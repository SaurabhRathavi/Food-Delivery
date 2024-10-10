function validateForm(data) {
  const errors = {};

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(data.phone_number)) {
    errors.mobile = "Mobile number must be exactly 10 digits.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "Email format is invalid.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = validateForm;
