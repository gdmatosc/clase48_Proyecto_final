const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const UsersModel=require('../model/models/user.model')
const logd = require('../logging.js')
const modname='[passportAuth.js]'
const logr=logd.child({modulo:`${modname}`})

passport.use('login',new LocalStrategy(
    (username,password,done)=>{
        const loger=logd.child({modulo:`${modname}[passpord.use-login]`})
        loger.verbose('',{recurso:"[na](inicio-antes de usersmodel.findone)"})
        UsersModel.findOne({ username })
        .then(user => {
              if (!user || !user.validPassword(password)) {
                loger.verbose(user,{recurso:"[user](Invalid username/password)(dentro de usersmodel-en if)"})
                return done(null,false,{ error: 'Invalid username/password' })
                
            } else {
                loger.verbose(user.validPassword(password),{recurso:"[user.validPassword(password)](dentro de usersmodel-en else)"})
                loger.verbose(user,{recurso:"[user](dentro de usersmodel-en else)"})
                return done(null, user)
            }
            })
        .catch(e => {
            console.log("[b0.server.js][catch](login-error)",e)
            done(e)});
    }
))

passport.use('signup',new LocalStrategy(
    {passReqToCallback: true},
    (req,username,password,done)=>{
        logr.verbose('signup...')
        
        UsersModel.findOne({username},(err,user)=>{
            if(err) return done(err)
            if(user){
                logr.verbose('User already exists',{recurso:"[isgnup]"})
                done(null,false,{ message: "Invalid username/password" })
                console.log('[b0.server.js](after return in if of usersmode.findone of passport.use)')
            }

            const newUser={username,password,name:req.body.name,email:req.body.email,
                address:req.body.address,age:req.body.age,telephone:req.body.telephone}
            const detalles=[{username:username,nombre:req.body.name,email:req.body.email,direccion:req.body.address,edad:req.body.age,telefono:req.body.telephone}]
            UsersModel.create(newUser,(err,userWithID)=>{
                console.log('[b0.server.js](inicio)(usersmodel.create)')
                if(err) return done(err)
                
                logr.verbose(userWithID,{recurso:"[isgnup][userWithID]"})
                fnCom.nodemailer('registroNew',procAdminEmail,detalles)
                return done(null,userWithID)
            })
            
        })
        
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((userId,done)=>{
    UsersModel.findById(userId, (err, user) => {return done(err, user)});

})

const authLogin = passport.authenticate('login',{failureRedirect: '/faillogin'})
const authSignup = passport.authenticate('signup',{failureRedirect: '/failsignup'})
const inicioAuth=passport.initialize()
const sesionAuth=passport.session()

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()) next()
    else res.redirect('/login')
}

function noCheckAuthentication(req,res,next){
    next()
}
module.exports={authLogin, authSignup,checkAuthentication,noCheckAuthentication,inicioAuth,sesionAuth }

