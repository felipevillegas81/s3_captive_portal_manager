import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

// Obtener todos los usuarios
router.get('/', userController.getAll);

// Obtener un usuario por ID
router.get('/:id', userController.getById);

// Crear un nuevo usuario
router.post('/', userController.create);

// Actualizar un usuario Administardor
router.post('/update', requireAuth, userController.update);

// // Actualizar un usuario por ID
// router.post('/:id/update', userController.update);

// Eliminar un usuario por ID
router.delete('/:id', userController.delete);

export default router;
