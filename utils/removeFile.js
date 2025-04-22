const fs = require('fs');

const removeFile = async (filePath) => {
    try {
        if(filePath) await fs.promises.unlink(filePath);
    }
    catch(error){
        console.error('Error:', error.message);
    }
}

module.exports = removeFile;