import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/session.controller.js';

const router = Router();

// Login (por username)
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/session/failLogin' }),
  sessionController.login
);

router.get('/failLogin', sessionController.failLogin);

// Registro
router.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/session/failRegister' }),
  sessionController.register
);

// Actualización de perfil - Creado Por AV
router.post('/updateProfile', sessionController.update);

router.get('/failRegister', sessionController.failRegister);

// Restaurar contraseña
router.post('/restore', sessionController.restore);

// Logout
router.get('/logout', sessionController.logout);

export default router;
