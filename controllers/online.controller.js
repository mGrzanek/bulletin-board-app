exports.getOnline = (req, res) => {
    try {
        return res.status(200).json({ message: 'online' });
    }
    catch(error) {
        return res.status(500).json({ message: 'Internal Server Error'});
    }

}