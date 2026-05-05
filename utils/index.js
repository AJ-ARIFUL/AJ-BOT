const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    // ডিলে করার জন্য
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // রেন্ডম নাম্বার
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // ফাইল ডাউনলোড
    downloadFile: async (url, pathSave) => {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        const writer = fs.createWriteStream(pathSave);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    },
    
    // ফোল্ডারের সব ফাইল লিস্ট
    getAllFiles: (dirPath, arrayOfFiles = []) => {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                module.exports.getAllFiles(fullPath, arrayOfFiles);
            } else {
                arrayOfFiles.push(fullPath);
            }
        });
        return arrayOfFiles;
    },
    
    // সময় ফরম্যাট: 1h 20m 30s
    convertTime: (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    },
    
    // EXP থেকে লেভেল বের করা
    expToLevel: (exp) => Math.floor((Math.sqrt(1 + 8 * exp / 5) - 1) / 2),
    
    // লেভেল থেকে EXP বের করা
    levelToExp: (level) => 5 * level * (level + 1) / 2,
    
    // বড় নাম্বার শর্ট: 1000 => 1K
    shortenNumber: (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    }
};
