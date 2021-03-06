var express = require('express');
var router= express.Router();
var bcrypt = require('bcryptjs');

const User= require('../models/user');

// landing page with login dialigue and register button
router.get('/', (req,res)=>{res.render('landing');});

router.get('/alt',(req, res)=>{res.render('index',{layout:'altlayout'});});

//new user directed here from landing
router.get('/register', (rq,rs)=>{rs.render('regstrat');});


//pre existing user logged in
router.post('/ulogin', (rq,rs)=>{console.log(rq.body);});


// new user registration 
router.post('/ureg', (rq,rs)=> {
    var errs=[];
    var {user, mail, password}= rq.body;

    //validation checks
    if(!user|| !mail || !password)
    {
        errs.push("please fill all feilds")
    }
    if(password.length< 6)
    {
        errs.push("passwords should be longer than 6 characters")
    }
   if(errs.length>0)
   {
       rs.render('regstrat', {errs, user, mail,password})
   } 
   
   //user existence check
   else{
       User.findOne({u_mail: mail})
       .then( (does_exist)=>{
           if(does_exist)
           {
               errs.push("user mail already exists")
               rs.render('regstrat', {errs,user,mail,password})
           }
           else
           {
            var hashp =bcrypt.hashSync(password, 10);
            var sav_user = new User({
                u_name: user,
                u_mail: mail,
                u_pass: hashp
 
            });
            
            sav_user.save();  
 
             rs.send('pass');
            

           }
        }).catch(err=>console.log(err))
       
      
}});


module.exports= router;