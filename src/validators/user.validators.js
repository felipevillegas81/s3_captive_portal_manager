class UserValidator {
  
    validateCreateUser(data) {
      const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password', 'role'];
      
      for (const field of requiredFields) {
        if (!data[field]) {
          return { valid: false, message: `El campo ${field} es obligatorio` };
        }
      }
  
      return { valid: true };
    }

    validateUpdateProfile(data) {
      const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password', 'role'];
      
      for (const field of requiredFields) {
        if (!data[field]) {
          return { valid: false, message: `El campo ${field} es obligatorio` };
        }
      }
  
      return { valid: true };
    }
  
    validateEmailFormat(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  
  export default new UserValidator();
  