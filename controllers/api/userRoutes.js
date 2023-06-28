const router = require('express').Router();
const { User } = require('/models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body); // req.body is a short hand to require everything in the table its referring to aka 'User"

    req.session.save(() => {
      req.session.user_id = userData.id;// when a new user is created it will generate the id and save it to user_id 
      req.session.logged_in = true;
      //req.session.user_email = userData.email;  this is another variable in the session that will require an email
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => { // in insomnia you don't need to add an id because it will automatically generate because it is getting the data from the users
  try {
    const userData = await User.findOne({ where: { email: req.body.email } }); // this is checking to see if the email exists

    if (!userData) { // user found, now check for the user id in the database
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });// if it doesn't work the return the error message
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);// this comes from check password in the user.js file "checkPassword" and making sure it matches to the db

    if (!validPassword) {// if it doesn't exist, return error
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => { // if a matching password is found in the DB then sign the user into the application
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) { // the session name must match the original session or the code won't work
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;