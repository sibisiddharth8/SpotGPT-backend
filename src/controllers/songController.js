import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';
import mongoose from 'mongoose';


const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({ error: "Both audio and image files are required." });
        }

        // Upload audio file to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video", // audio files are handled as video in Cloudinary
        });

        // Upload image file to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image", // image files
        });

        // Calculate audio duration
        const duration = `${Math.floor(parseFloat(audioUpload.duration) / 60)}:${String(Math.floor(parseFloat(audioUpload.duration) % 60)).padStart(2, '0')}`;

        // Prepare song data
        const songData = {
            name,
            desc,
            album,
            file: audioUpload.secure_url,  // Cloudinary URL for the audio
            image: imageUpload.secure_url, // Cloudinary URL for the image
            duration: duration,
        };

        // Save the song data to the database
        const song = new songModel(songData);
        await song.save();

        // Send success response
        res.status(200).json({ success: true, message: "Song added successfully!" });
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ error: error.message });
    }
};



const listSong = async ( req, res ) =>{
    try {
        const allSongs = await songModel.find({});
        res.json({success: true, songs: allSongs});
    } catch (error) {
       res.status(500).json({ success:false, error: error.message });
    }
}

const removeSong = async ( req, res ) =>{
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song deleted successfully!" });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}

export {addSong, listSong, removeSong}