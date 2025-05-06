class UserDto {
    constructor(user) {
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      this.role = user.role;
    }
  }
  
  export default UserDto;
  