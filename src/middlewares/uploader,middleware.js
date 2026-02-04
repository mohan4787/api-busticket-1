const multer = require("multer");

const myStorage = multer.diskStorage({
    destination: (req, file, cd) => {},
    filename: (req, file, cd) => {},
})

const uploader = () => {
    const uploaderConfig = {
        fileSize: 3000000,
        fileFilter: function (req, file, cd) {},
    }
    return multer({
        storage: myStorage,
        fileFilter: uploaderConfig.fileFilter,
        limits: { fileSize: uploaderConfig.fileSize },
    })
}