var
  base64ToImg = require('base64-to-image');

class UploadImg {

  contructor() { }

  /**
   * Save a img on the public section
   * @param  {string} pathFolder name of the folder where are you going to save
   * @param  {string} base64Img  img on base64
   * @return {Object}            return a Object with the fileName, fileType and url.
   */
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
