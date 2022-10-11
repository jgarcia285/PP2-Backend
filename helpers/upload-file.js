const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtension = ['png', 'jpg', 'jpeg'], pathUpload = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        //Obtiene la extension del archivo
        const nameSplited = archivo.name.split('.');
        const extension = nameSplited[nameSplited.length - 1];

        //Compara con las extensiones permitidas
        if (!validExtension.includes(extension)) {
            return reject(`La extension ${extension} no es permitida. Las extensiones permitidas son ${validExtension}`);
        }

        const finalName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', pathUpload, finalName)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(finalName);
        })
    })

}

module.exports = {
    uploadFile
}