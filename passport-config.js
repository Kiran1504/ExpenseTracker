const LocalStrategy = require("passport-local").Strategy

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUsers = async(email , password, done) =>{
        const user = getUserByEmail(email)
        if(user == null){
            return done(null ,false, {message: "User not found!!!"})
        }
        try {
            if (password == user.password){
                return done(null, user)
            } else{
                return done(null, false, {message: "Incorrect Password!!!"})
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
     }

     passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
     passport.serializeUser((user,done) => done(null, user.id))
     passport.deserializeUser((user,done) => {
        return done(null, getUserById(id))
     })
}

module.exports = initialize