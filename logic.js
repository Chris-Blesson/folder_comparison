const { promises: fs } = require('fs');
const path = require('path');
exports.compare = async (folder1, folder2) => {
    console.log(path.join(__dirname, folder1));
    const folderArray1 = await fs.readdir(path.join(__dirname, folder1))
    const folderArray2 = await fs.readdir(path.join(__dirname, folder2))
    const difference1 = findDifference(folderArray1, folderArray2);
    const difference2 = findDifference(folderArray2, folderArray1);
    console.log([...difference1, ...difference2]);

}

const findDifference = (folder1, folder2) => {
    let tempDifference = [];
    for (let files in folder1) {
        if (!folder2.includes(folder1[files])) {
            tempDifference.push(folder1[files]);
        }
    }
    return tempDifference;
}