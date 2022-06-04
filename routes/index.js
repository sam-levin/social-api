const router = require('express').Router();
const userRoutes = require('./api/user-routes');
const thoughtRoutes = require('./api/thought-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
//router.use('/thoughts', thoughtRoutes)
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes)

module.exports = router;