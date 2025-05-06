import { Router } from 'express';
import { requireAuth, isSession, isAdmin, isUser } from '../middleware/auth.middleware.js';

const router = Router();

// Login
router.get('/', isSession, (req, res) => {
  res.render('login', { layout: 'auth', title: 'Iniciar sesión' });
});

router.get('/login', isSession, (req, res) => {
  res.render('login', { layout: 'auth', title: 'Iniciar sesión' });
});

// Register
router.get('/register', isSession, (req, res) => {
  res.render('register', { layout: 'auth', title: 'Registrarse' });
});

// Restore
router.get('/restore', isSession, (req, res) => {
  res.render('restore');
});

// Dashboard (solo si está logueado)
router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Perfil (solo si está logueado)
router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { user: req.session.user });
});

// Rutas adicionales según roles si quieres
// router.get('/admin/panel', requireAuth, isAdmin, ...)
// router.get('/user/history', requireAuth, isUser, ...)

export default router;
