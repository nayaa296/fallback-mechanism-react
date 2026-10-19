var express = require('express');
const Model_penulis = require('../model/Model_penulis');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_penulis.getId(id);
    if (Data.length > 0) {
      res.render('users/index', {
        title: 'User Home',
        email: Data[0].email
      });
    } else {
      res.status(401).json({error: 'user tidak ada'});
    }
  } catch (error) {
    res.status(501).json('Butuh akses login');
  }
});

module.exports = router;
