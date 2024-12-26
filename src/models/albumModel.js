import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    desc: {type: 'string', required: true},
    bgColor: {type: 'string', required: true},
    image: {type: 'string', required:true}
});

const albumModel = mongoose.models.album || mongoose.model('album', albumSchema);

export default albumModel;