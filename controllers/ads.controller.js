const Ad = require('./../models/ads.model');
const User = require('./../models/users.model');
const sanitize = require('mongo-sanitize');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/'});
const getImageFileType = require('./../utils/getImageFileType');
const path = require('path');
const removeFile = require('./../utils/removeFile');

exports.getAll = async (req, res) => {
    try {
        const ads = await Ad.find().populate('author');
        if(ads.length > 0) return res.json(ads);
        else return res.json({ message: 'No ads'});
    }
    catch(error) {
        return res.status(500).json({ message: 'Internal Server Error'});
    }
}

exports.getSearchPhrase = async (req, res) => {
    try {
        const searchPhrase = sanitize(req.params.searchPhrase);
        const ads = await Ad.find({ title: {$regex: searchPhrase, $options: 'i'}}).populate('author');
        if(ads.length > 0) return res.json(ads);
        else return res.json({ message: 'Not Found' });
    }
    catch(error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = sanitize(req.params.id);
        const ad = await Ad.findById(id).populate('author');
        if(ad) return res.json(ad);
        else return res.status(404).json({ message: 'Not found'});
    }
    catch(error){
        return res.status(500).json({ message: error });
    }
}

exports.addNew = async(req, res) => {
    let filePath = null;
    try {
        sanitize(req.body);
        const {title, content, publicationDate, price, location, author} = req.body;
        const image = req.file;
        if(image) filePath = path.join(process.cwd(), 'public', 'uploads', image.filename);
        if(title && content && publicationDate && image && price && location && author){
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const fileType = await getImageFileType(image);
            if(imageMimeTypes.includes(fileType)){
                const newAd = new Ad({ title, content, publicationDate, image: image.filename, price, location, author});
                await newAd.save();
                const newAdWithAuthor = await Ad.findById(newAd._id).populate('author');
                return res.json({ message: newAdWithAuthor });
            } else {
                if(filePath)await removeFile(filePath);
                return res.status(400).json({ message: 'Invalid file'});
            }
        } else {
            if(filePath)await removeFile(filePath);
            return res.status(400).json({ message: 'All params required' });
        }
    }
    catch(error){
        if (error.name === 'ValidationError') {
            if(filePath) await removeFile(filePath);
            return res.status(400).json({
                message: 'Invalid params',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editOne = async(req, res) => {
    try {
        sanitize(req.body);
        const {title, content, publicationDate, price, location, author} = req.body;
        const image = req.file;
        const adToEdit = await Ad.findById(req.params.id);
        const filePath = image ? path.join(process.cwd(), 'public', 'uploads', image.filename) : null;
        if(adToEdit){
            if(title && content && publicationDate && price && location && author){
                let imageFilename = null;
                if(image) {
                    const oldFilePath = path.join(process.cwd(), 'public', 'uploads', adToEdit.image);
                    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    const fileType = await getImageFileType(image);
                    if(imageMimeTypes.includes(fileType)){
                        imageFilename = image.filename;
                        await removeFile(oldFilePath);
                    } else {
                        await removeFile(filePath);
                        return res.status(400).json({ message: 'Invalid file'});
                    } 
                } else imageFilename = adToEdit.image;
                await adToEdit.updateOne({ $set: { title, content, publicationDate, image: imageFilename, price, location, author}});              
                const updatedAd = await Ad.findById(adToEdit._id).populate('author');  
                console.log('updatedAd', updatedAd)        ;
                return res.json({ message: updatedAd });
            } else {
                await removeFile(filePath);
                return res.status(400).json({ message: 'All params required' });
            }
        } else {
            await removeFile(filePath);
            return res.status(404).json({ message: 'Not found' });
        }
    }
    catch(error){
        if (error.name === 'ValidationError') {
            await removeFile(filePath);
            return res.status(400).json({
                message: 'Invalid params',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        await removeFile(filePath);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeOne = async(req, res) => {
    try {
        const id = sanitize(req.params.id); 
        const adToRemove = await Ad.findById(id);
        if(adToRemove){
            await adToRemove.deleteOne();
            return res.json({ message: 'OK' });
        } else return res.status(404).json({ message: 'Not found'}); 
    }
    catch(error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}