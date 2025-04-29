const Session = require('./../models/session.model');

const authMiddleware = async (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
        try {
            const sessionRecord = await Session.findOne({});
            if(sessionRecord){
                const sessionData = JSON.parse(sessionRecord.session);
                req.session.user = {
                    id: sessionData.user.id,
                    login: sessionData.user.login,
                }
                next();
            } else res.status(401).json({ message: 'You are not authorized' });
        }
        catch(error){
            return res.status(401).json({ message: 'You are not authorized' });
        }
    } else {
        if(req.session.user) next();
        else res.status(401).json({ message: 'You are not authorized' });
    }
}

module.exports = authMiddleware;