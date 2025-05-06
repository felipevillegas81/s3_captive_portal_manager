// src/services/user.services.js
import usersDao from '../daos/dbManager/users.dao.js';
import { hashPassword } from '../utils.js';

class UserServices {
  async getUserById(id) {
    return await usersDao.findById(id);
  }

  async getAllUsers() {
    return await usersDao.getAll();
  }

  async createUser(userData) {
    const user = {
      ...userData,
      password: hashPassword(userData.password),
    };
    return await usersDao.create(user);
    
  }

  async updateUserProfile(id, updates) {
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    } else {
      delete updates.password; // No actualizar si está vacío
    }
    return await usersDao.updateById(id, updates);
  }

  async deleteUser(id) {
    return await usersDao.deleteById(id);
  }

  async findByUsername(username) {
    return await usersDao.findByUsername(username);
  }

  async findByEmail(email) {
    return await usersDao.findByEmail(email);
  }
}

export default new UserServices();
