import passport from 'passport';
import local from 'passport-local';
import UsersDao from '../daos/dbManager/users.dao.js';
import { hashPassword, comparePassword } from '../utils.js';
// import sendMail from '../utils/sendMail.js'; // <-- Desactivado temporalmente

const LocalStrategy = local.Strategy;

const initializePassport = () => {

  // Register
  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, role } = req.body;

        if (!first_name || !last_name || !email || !password || !username) {
          return done('All fields are required', false);
        }

        try {
          const existingUser = await UsersDao.findByUsername(username);
          if (existingUser) {
            /*
            await sendMail.sendMailSimple(
              existingUser.email,
              'Se intentó crear un usuario',
              `Hola ${existingUser.first_name}, alguien intentó registrar tu usuario en el sistema.`
            );
            */
            return done(null, false);
          }

          const newUser = await UsersDao.create({
            first_name,
            last_name,
            username,
            email,
            password: hashPassword(password),
            role: role || 'user',
          });

          /*
          await sendMail.sendMailSimple(
            newUser.email,
            'Bienvenido al sistema',
            `Hola ${newUser.first_name}, tu cuenta ha sido creada exitosamente.`
          );
          */

          return done(null, newUser);
        } catch (error) {
          return done(`Error: ${error.message}`, false);
        }
      }
    )
  );

  // Login con username
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
      },
      async (username, password, done) => {
        try {
          const user = await UsersDao.findByUsername(username);

          if (!user) {
            console.log('User not found');
            return done(null, false);
          }

          if (!comparePassword(user, password)) {
            console.log('Invalid password');
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(`Error: ${error.message}`, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); // PostgreSQL id
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UsersDao.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

export default initializePassport;
