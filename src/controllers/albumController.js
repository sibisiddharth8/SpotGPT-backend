import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const image = req.file;
        const imageUpload = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        const album = new albumModel(albumData);
        await album.save();

        res.json({success: true, message:'album added successfully'})

    } catch(error){
        res.json({success: false})
    }
}

const listAlbum = async (req, res) => {
    try{
        const allAlbums = await albumModel.find({});
        res.json({success: true, albums: allAlbums})
    } catch(error){
        res.json({success: false})
    }
}

const removeAlbum = async (req, res) => {
    try{
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:'album removed successfully'})
    } catch(error){
        res.json({success: false})
    }
}

export {addAlbum, listAlbum, removeAlbum}