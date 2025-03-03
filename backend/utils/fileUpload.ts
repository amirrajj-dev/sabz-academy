import cloudinary from './cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs'

const __dirname = path.resolve()
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req: any, file: any, cb: any) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|avi|mov|mpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
}).single('file');


export const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto', 
      public_id: `course_files/${Date.now()}_${file.filename}`,
    });
    fs.unlink(file.path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
    })
    return result.secure_url;
  } catch (error) {
    console.error('Error in Cloudinary upload:', error);
    throw new Error('Error uploading file to Cloudinary');
  }
};