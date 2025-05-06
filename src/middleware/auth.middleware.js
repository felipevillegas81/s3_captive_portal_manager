export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
  };
  
  export const isSession = (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/dashboard');
    }
    next();
  };
  
  export const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).render('403', { title: 'Acceso denegado' });
    }
    next();
  };
  
  export const isUser = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'user') {
      return res.status(403).render('403', { title: 'Acceso denegado' });
    }
    next();
  };
  