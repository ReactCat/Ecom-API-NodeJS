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
    }
    catch(err){
        res.status(500).json(err);
    }

    });


// Login

    
    router.post('/login', async (req, res) => {


    try{
        // Use findOne method to search MondoDB and return one document
        const user = await User.findOne(
            {
                username: req.body.username 
            }
        );

        // If no match send an error
        !user && res.status(401).json("Credentials don't match");
        
        // Decrypt password
        const hashPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SKEY
            
        );
        
        // If password not correct return an error
        const password = hashPassword.toString(CryptoJS.enc.Utf8);
        password !==req.body.password &&
        res.status(401).json("Credentials don't match");
        
        
        res.status(200).json(user);
        console.log("login OK")
    
    } 

    catch(err){
        res.status(500).json(err);
        console.log("No user match")
    }

});

    




module.exports = router
