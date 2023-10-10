const fs = require('fs');
const path = require('path');



function readLocalJson(fileName) {
    // 读取本地JSON文件的路径
    const filePath = path.join(process.cwd(), 'public', fileName); // 替换为您的JSON文件路径
    try {
        // 读取JSON文件
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(jsonData);

        return parsedData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

export default readLocalJson;