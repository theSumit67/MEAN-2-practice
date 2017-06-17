const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'), // request api from differen domain
    passport = require('passport'),
    mongoose = require('mongoose');




/*	DBs

./mongod --dbpath /media/asx/DDD/Z/EX/Angular/MS/db
sumit/pass

cd /media/asx/DDD/Z/EX/Angular/MS/angular-front
ng serve

	====================== */

const config = require('./config/database');

// connect to DB
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () =>{
	console.log(`connected to DB ${config.database}`)
})

// on error
mongoose.connection.on('error', (error) =>{
	console.log(`error when connected to DB ${error}`)
})



/*	Routes
	====================== */

const users = require('./routes/users');


const app = express();


/*	Middlewares
	====================== */

app.use(cors()); // app.use() requires middleware functions
app.use(bodyParser.json());

app.use( passport.initialize() );
app.use( passport.session() ); // uses persistent login session
require('./config/passport')(passport)


app.use(express.static( path.join(__dirname, 'public') ));


//  Routes
app.use('/users', users);


const port = 3000;

app.get('/', (req, res) => {
    res.send('here it is');
})
app.get('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
})


// start server

app.listen(port, () => {
    console.log(`started on port - ${port}`);
})
