var express = require('express');
var path=require('path');
var handlebars= require('express-handlebars');
const mongose= require('mongoose');
const dats = require('./project_dats/strs');

const app= express();

// mongoose connection

mongose.connect(dats.dburl, {useNewUrlParser : true , useUnifiedTopology: true})
.then(()=> console.log('mongodb connected')).catch(err=>{console.log(err)});


//static files folder
//app.use(express.static('statics'));

// setting view engine to hbs 
app.engine('hbs', handlebars({extname:'.hbs', defaultLayout:'layout'}));
app.set('view engine', 'hbs');

//views path 
app.set('views',path.join(__dirname,'views'));


//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//router
app.use('/', require('./routes/router')); 




const port= process.env.PORT|| 8080;
app.listen(port, ()=>{console.log(`server started at ${port}`);});