const LocalStrategy = require('passport-local');
const passport = require('passport');
const { User } = require('../models')

passport.serializeUser((user, done) => {
    done(null, user.UserName);
})

passport.deserializeUser(async(username, done) => {
    try{
        const user = await User.findOne({where: {UserName: username}});
        if(user)
            done(null, user);
    }
    catch(err){
        done(err, null)
    }
});

passport.use(new LocalStrategy(
    async(username, password, done) => {
        try{
            const user = await User.findOne({where: {UserName: username}});
            if(user){
                console.log("Yes, Valid");
                if(user.Password === password){
                    console.log("Password Valid");
                    done(null, user);
                }
                else{
                    console.log("Not Valid password");
                    done(null, false);
                }
                    
            } 
            else{
                console.log("No, Invalid");
                done(null, false);
            }
        }
        catch(err){
            done(err, false);
        }
        
            
    }
))
