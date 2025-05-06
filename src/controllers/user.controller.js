// src/controllers/user.controller.js
import userService from '../services/user.services.js';
import UserDto from '../daos/dtos/users.dto.js';
import userValidator from '../validators/user.validators.js';
// import sendMail from '../utils/sendMail.js'; // Desactivado por ahora

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async create(req, res) {
    const validation = userValidator.validateCreateUser(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const { first_name, last_name, username, email, password, role } = req.body;

    try {
      const user = new UserDto({
        first_name,
        last_name,
        username,
        email,
        password,
        role: role || 'user',
      });

      // Envío de email desactivado por ahora
      // await sendMail.sendMailSimple(user.email, 'Bienvenido', `Hola ${user.username}, bienvenido.`);

      const newUser = await userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await userService.deleteUser(id);
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
