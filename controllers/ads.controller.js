const Ad = require('./../models/ads.model');
const User = require('./../models/users.model');
const sanitize = require('mongo-sanitize');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/'});
const getImageFileType = require('./../utils/getImageFileType');

exports.getAll = async (req, res) => {
    try {
        const ads = await Ad.find().populate('author');
        if(ads.length > 0) res.json(ads);
        else res.json({ message: 'Empty DB'});
    }
    catch(error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

exports.getSearchPhrase = async (req, res) => {
    try {
        const searchPhrase = sanitize(req.params.searchPhrase);
        const ads = await Ad.find({ title: {$regex: searchPhrase, $options: 'i'}}).populate('author');
        if(ads.length > 0) res.json(ads);
        else res.json({ message: 'Not Found' });
    }
    catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = sanitize(req.params.id);
        const ad = await Ad.findById(id).populate('author');
        if(ad) res.json(ad);
        else res.status(404).json({ message: 'Not found'});
    }
    catch(error){
        res.status(500).json({ message: error });
    }
}

exports.addNew = async(req, res) => {
    try {
        sanitize(req.body);
        const {title, content, publicationDate, price, location, author} = req.body;
        const image = req.file;
        const fileType = req.file ? await getImageFileType(req.file): 'unknown';
        if(title && content && publicationDate && image && price && location && author){
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if(imageMimeTypes.includes(fileType)){
                const newAd = new Ad({ title, content, publicationDate, image: image.filename, price, location, author});
                await newAd.save();
                res.json({ message: 'OK' });
            } else res.status(400).json({ message: 'Invalid file'});
        } else res.status(400).json({ message: 'All params required' });
    }
    catch(error){
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Invalid params',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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
    catch(error){
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Invalid params',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
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
    catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}