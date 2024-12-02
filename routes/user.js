const {Router} = require('express');
const { userModel } = require('../Database/db');
const {z} = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {upload}  = require('../controllers/diskStorage');
const userRouter = Router();


userRouter.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

userRouter.post('/signup', async (req, res) => {
    const URLandPassword = req.body;
    const userFormat = z.object({
        URL: z.number().min(6).max(6),
        password: z.string()
    }) 

    const validFormat = userFormat.safeParse(URLandPassword);
    if(validFormat.success){
        const hashPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            URL: URL,
            password: hashPassword
        });
        res.status(200).json({
            message: "You are signed Up!"
        })
    }else {
        res.status(401).json({
            message: "Please give correct URL and password"
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    const {URL, password} = req.body;
    // const docodedPasswprd = bcrypt.compare(password);
    const findUser = await userModel.findOne({
        URL: URL
    });

    const decodedPassword = await bcrypt.compare(password, findUser.password);
    if( findUser && decodedPassword){
        const token = jwt.sign({
            id: URL
        },process.env.JWT_PASSWORD);
        res.status(200).json({
            token: token
        });
        
    }else{
        res.status(403).json({
            message: "Invalid user credentials"
        })
    }

});

userRouter.post('/profile', upload.single('avatar'), function (req, res, cb){
  
    // console.log(req.body);
    const file = req.file;
    // console.log(file.path);

  
  });

module.exports = {
    userRouter: userRouter
}


