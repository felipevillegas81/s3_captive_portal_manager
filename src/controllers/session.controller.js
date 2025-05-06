import usersDao from '../daos/dbManager/users.dao.js';
import { comparePassword, hashPassword } from '../utils.js';
import userValidator from '../validators/user.validators.js';
import userService from '../services/user.services.js';

class SessionController {
  async login(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    req.session.user = {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    };

    res.status(200).redirect('/profile');
  }

  failLogin(req, res) {
    const message = 'Usuario o contraseña incorrectos'; // mensaje centralizado
    res.status(401).render('login', {
      layout: 'auth',
      title: 'Iniciar sesión',
      error: message
    });
  }

  async register(req, res) {
    return res.status(201).redirect('/login');
  }

  failRegister(req, res) {
    res.status(401).json({ message: 'Error en el registro' });
  }

  async update(req, res) {
    const userId = req.session.user.id;
    const { first_name, last_name, username, password, email, role } = req.body;
  
    const validation = userValidator.validateUpdateProfile({ first_name, last_name, username, password, email, role });
    if (!validation.valid) {
      return res.status(400).render('profile', {
        user: req.session.user,
        error: validation.message
      });
    }
  
    try {
      const updatedUser = await userService.updateUserProfile(userId, {
        first_name,
        last_name,
        username,
        email,
        password,
        role
      });
  
      // Actualizar sesión con nuevos datos
      req.session.user = {
        ...req.session.user,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      };
  
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).render('profile', {
        user: req.session.user,
        error: 'Error al actualizar el perfil'
      });
    }
  }

  async restore(req, res) {
    const { email, password } = req.body;

    try {
      const user = await usersDao.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (comparePassword(user, password)) {
        return res.json({ message: 'La contraseña es la misma, no se actualizó.' });
      }

      await usersDao.updatePassword(email, hashPassword(password));
      return res.json({ message: 'Contraseña actualizada correctamente' });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

export default new SessionController();
