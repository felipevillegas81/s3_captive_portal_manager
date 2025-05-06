import express from 'express';
import config from './config/dotenv.config.js';
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import pool from './db/db.js';
import { __dirname } from './utils.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import path from 'path';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import routes from './routes/index.routes.js';

const app = express();

// Session con PostgreSQL
const PGSession = pgSession(session);
app.use(cookieParser());
app.use(
  session({
    store: new PGSession({
      pool: pool,
      tableName: 'session',
    }),
    secret: config.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 días
  })
);

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      eq: (a, b) => a === b,
    },
  });
  
app.engine('hbs', hbs.engine);
  

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use('/', routes);

// Ruta 404
// app.get('*', (req, res) => {
//     res.status(404).render('404', { title: 'Página no encontrada' });
// });

// Iniciar servidor
app.listen(config.APP_PORT, () => {
  console.log(`🚀 Server listening on port ${config.APP_PORT}`);
});
