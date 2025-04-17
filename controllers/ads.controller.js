const Ad = require('./../models/ads.model');
const sanitize = require('mongo-sanitize');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

exports.getAll = async (req, res) => {
    try {
        const ads = await Ad.find();
        if(ads.length > 0){
            res.json(ads);
        } else res.json({ message: 'Empty DB'});
    }
    catch(err) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = sanitize(req.params.id);
        const ad = await Ad.findById(id);
        if(ad) res.json(ad);
        else res.status(404).json({ message: 'Not found'});
    }
    catch(err){
        res.status(500).json({ message: err });
    }
    
}

exports.addNew = [ upload.single('image'), async(req, res) => {
    try {
        sanitize(req.body);
        const {title, content, publicationDate, price, location, author} = req.body;
        const image = req.file;
        if(title && content && publicationDate && image && price && location && author){
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if(imageMimeTypes.includes(image.mimetype)){
                const newAd = new Ad({ title, content, publicationDate, image: image.originalname, price, location, author});
                await newAd.save();
                res.json({ message: 'OK' });
            } else res.status(400).json({ message: 'Invalid file'});
        } else res.status(400).json({ message: 'All params required' });
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}];

exports.editOne = [ upload.single('image'), async(req, res) => {
    try {
        sanitize(req.body);
        const {title, content, publicationDate, price, location, author} = req.body;
        const image = req.file;
        const adToEdit = await Ad.findById(req.params.id);
        if(adToEdit){
            if(title && content && publicationDate && image && price && location && author){
                const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if(imageMimeTypes.includes(image.mimetype)){
                    await adToEdit.updateOne({ $set: { title, content, publicationDate, image: image.originalname, price, location, author}});
                    res.json({ message: 'OK' });
                } else res.status(400).json({ message: 'Invalid file'});
            } else res.status(400).json({ message: 'All params required' });
        } else res.status(404).json({ message: 'Not found' });
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}];

exports.removeOne = async(req, res) => {
    try {
        const id = sanitize(req.params.id); 
        const adToRemove = await Ad.findById(id);
        if(adToRemove){
            await adToRemove.deleteOne();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found'}); 
    }
    catch(err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}