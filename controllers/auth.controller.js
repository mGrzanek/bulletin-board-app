const User = require('./../models/users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('./../utils/getImageFileType');
const path = require('path');
const removeFile = require('./../utils/removeFile');
const Session = require('./../models/session.model');

exports.register = async (req, res) => {
    try {
        const {login, password, phone} = req.body;
        const avatar = req.file;
        const filePath = avatar ? path.join(process.cwd(), 'public', 'uploads', avatar.filename) : null;
        if(login && typeof login === 'string' && password && typeof password === 'string' 
            && avatar && typeof avatar === 'object' && phone && typeof phone === 'string'){
            const fileType = await getImageFileType(avatar);
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if(imageMimeTypes.includes(fileType)){
                const userWithLogin = await User.findOne({ login });
                if(userWithLogin){
                    await removeFile(filePath);
                    return res.status(409).json({ message: 'User with this login already exist'});
                } else {
                    const newUser = await User.create({ 
                        login, password: await bcrypt.hash(password, 10), avatar: avatar.filename, phone
                    });
                    return res.status(201).json({ message: `User created ${newUser.login}`});
                }
            } else {
                await removeFile(filePath);
                return res.status(400).json({ message: 'Invalid file' });
            }
        } else {
            await removeFile(filePath);
            return res.status(400).json({ message: 'Invalid params' });
        }
    }
    catch(error){
        await removeFile(filePath);
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if(login && typeof login === 'string' && password && typeof password === 'string'){
            const userWithLogin = await User.findOne({ login });
            if(userWithLogin) {
                if(bcrypt.compareSync(password, userWithLogin.password)) {
                    const user = {
                        id: userWithLogin.id,
                        login: userWithLogin.login,
                    }
                    req.session.user = user;
                    return res.json({ message: 'Login successful!'});
                }
                else return res.status(400).json({ message: 'Login or password are incorrect'});
            } else return res.status(400).json({ message: 'Login or password are incorrect'});
        } else return res.status(400).json({ message: 'Invalid params' });
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}

exports.getUser = async (req, res) => {
    return res.json({ message: 'Logged' });
}

exports.logout = async (req, res) => {
    if (process.env.NODE_ENV !== "production") {
        await Session.deleteMany({});
        return res.json({ message: "You are logged out" });
    }
    else {
        req.session.destroy();
        return res.json({ message: "You are logged out" });
    }
}