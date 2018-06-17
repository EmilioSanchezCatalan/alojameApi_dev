var
  base64ToImg = require('base64-to-image');

class UploadImg {

  contructor() { }

  static savePublic(pathFolder, base65Img) {
    const PUBLIC_DIR = __dirname + '/../public/images/';
    console.log(PUBLIC_DIR + pathFolder + '/');
    let imageInfo = base64ToImg(base65Img, PUBLIC_DIR + pathFolder + '/');
    console.log(imageInfo);
    return {
      fileName: imageInfo.fileName,
      fileType: imageInfo.imageType,
      url: 'http://localhost:3000/images/'+ pathFolder + '/' + imageInfo.fileName
    };
  }
}

module.exports = UploadImg;
