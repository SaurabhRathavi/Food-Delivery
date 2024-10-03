function validateForm(data) {
    const errors = {};

   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

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

module.exports=validateForm
