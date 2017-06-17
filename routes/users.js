const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	jwt = require('jsonwebtoken');

const config = require('../config/database'),
		User = require('../models/user');



// Register

router.post('/register', (req, res, next ) => {
	
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	})

	User.addUser(newUser, (err, user) => {
		if (err){
			res.json({success: false, msg: "Failed to register"})
		}
		else{
			res.json({success: true, msg: "User registered"});
		}
	})

});



// Authentication

router.post('/authenticate', (req, res, next ) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername( username, (err, user) => {
		if ( err ) throw err;
		if ( !user ){
			return res.json({ success: false,msg: "User not found" })
		}
		User.comparePassword(password, user.password, ( err, isMatch ) => {
			if ( err ) throw err;
			if ( isMatch ){
				const token = jwt.sign( user , config.secret, {
					expiresIn: 604800
				});
					console.log( token )
				res.json({
					success: true,
					//passport-jwt doc implies that the auth header should look like this...
					//	Authorization: JWT JSON_WEB_TOKEN_STRING.....
					token: "JWT " + token, // space is required after JWT
					user: {
						id: user._id,
						name: user.username,
						email: user.email
					}
				})
			}
			else{
				res.json({ success: false, msg: "(x) Wrong Password " })
			}
		})
	} ) 
});



// Profile

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next ) => {
	res.json({ user: req.user })
})


module.exports = router ;