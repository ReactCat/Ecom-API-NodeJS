const router = require("express").Router();
const User = require("../modals/User");
const CryptoJS = require("crypto-js")


// Register User
router.post("/register", async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, process.env.PASS_SKEY).toString(),
    }); 

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log(newUser.username)

    }
    catch(err){
        res.status(500).json(err);
    }

    });


// Login
router.post("/login", async (req, res) =>{

    try {

        const user = await User.findOne(
            {
                username: req.body.username
            } 
        );

    //   array user = (_id, username, email, password, isAdmin, createdAt, updatedAt )
    
    

   



        if (!user) {
            return res.status(401).json("Credentials don't match")
        }   

        // console.log(user._id)
        // console.log(user.username)
        // console.log(user.password)
        // console.log(user.email)
        // console.log(user.createdAt)

        // console.log(user)


        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SKEY

        );

        // console.log(hashedPassword)


        const pswd = hashedPassword.toString(CryptoJS.enc.Utf8);

        // console.log(pswd)

        if (pswd !== req.body.password) {

          return res.status(401).json("Password doesn't match");
        };

     // Destructure User Array to display all elements except the password
        const {password, ...userset } = user._doc;   
      
  
         res.status(200).json(userset);
        console.log(userset);
        

        
    } catch (error) {
        res.status(500).json(error);
        
    }

});

    
   

    
        
      
    
    




module.exports = router
