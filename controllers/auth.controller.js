const User = require('./../models/users.model');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const bcrypt = require('bcryptjs');

exports.register = [ upload.single('avatar'), async (req, res) => {
    try {
        const {login, password, phone} = req.body;
        const avatar = req.file;
        if(login && typeof login === 'string' && password && typeof password === 'string' 
            && avatar && phone && typeof phone === 'string'){
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if(imageMimeTypes.includes(avatar.mimetype)){
                const userWithLogin = await User.findOne({ login });
                if(userWithLogin) res.status(409).json({ message: 'User with this login already exist'});
                else {
                    const newUser = await User.create({ 
                        login, password: await bcrypt.hash(password, 10), avatar: avatar.originalname, phone
                    });
                    res.status(201).json({ message: `User created ${newUser.login}`});
                }
            } else res.status(400).json({ message: 'Invalid file' });
        } else res.status(400).json({ message: 'Invalid params' });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}];

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if(login && typeof login === 'string' && password && typeof password === 'string'){
            const userWithLogin = await User.findOne({ login });
            if(userWithLogin) {
                if(bcrypt.compareSync(password, userWithLogin.password)) res.json({ message: 'Login successful!'});
                else res.status(400).json({ message: 'Login or password are incorrect'});
            } else res.status(400).json({ message: 'Login or password are incorrect'});
        } else res.status(400).json({ message: 'Invalid params' });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}