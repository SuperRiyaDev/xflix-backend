const mongoose = require("mongoose")

const videoSchema = mongoose.Schema({
    videoLink: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    contentRating: {
        type: String,
        required: true,
        trim: true,
    }, 
    releaseDate: {
        type: String,
        required: true,
        trim: true,
    },
    previewImage: {
        type: String,
        required: true,
        trim: true,
        default : "https://i.ibb.co/nbYsmJB/xflix.jpg"
    },
    votes: {
        upVotes:{
            type: Number,
            default: 0,
            required:true
        },
        downVotes:{
            type: Number,
            default: 0,
            required:true
        }
    },
    viewCount: {
        type: Number,
        required: true,
        default:0,
    }
},
{
    timestamps: false,
  }
)

// const isValidId =async(id)=>{
//     let bool = await mongoose.Types.ObjectId.isValid(id);
//     return bool;    
// } 

const Video = mongoose.model("Video", videoSchema, "video");
module.exports = {
    Video, 
    // isValidId,
};
module.exports.videoSchema = videoSchema;