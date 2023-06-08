import multer from "multer"

const storage = multer.diskStorage({
    filename: function(req, file, cb)
    {
        let nome = file.originalname
        cb(null,nome)
    },
    destination: function(req, file, cb)
    {
        let path = "./"
        cb(null,path)
    }
})

export const upload = multer({storage})