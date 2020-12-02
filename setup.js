const { EEXIST } = require('constants');
const fs = require('fs');

for (let i = 1; i <= 25; i++) {
    const path = i.toString();
    fs.mkdir(path, (err) => {
        if (err) {
            return console.error(`Folder ${path} already exists`);
        }
        fs.copyFile('templates/input.txt', path + '/input.txt', () => console.log(`File ${path}/input.txt created`));
        fs.copyFile('templates/boilerplate.js', path + '/1.js', () => console.log(`File ${path}/1.js created`));
        fs.copyFile('templates/boilerplate.js', path + '/2.js', () => console.log(`File ${path}/2.js created`));
        fs.copyFile('templates/.gitignore.txt', path + '/.gitignore', () => console.log(`File ${path}/.gitignore created`));
    });
}