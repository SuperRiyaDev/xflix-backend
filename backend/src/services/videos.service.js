const { Video, isValidId } = require("../models/index");
const ApiError = require("../utils/ApiErrors");
const httpStatus = require("http-status");
const { video } = require("../validations/videos.validation");

const getAllVideos =async()=>{ 
    // console.log("hi from service")
    return await Video.find({});    
}  

const getVideosByConditions = async(title, genre, contentRating, sortBy)=>{
    let condition = {}

    if(title){
        condition = {...condition, title: { $regex: title, $options: 'i' },}
    }

    if(genre){
        const genreList =  ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"]
        if(genre === "All"){
            console.log("inside All condition", genre)
            // getAllVideos()
            return await Video.find({}); 

        }
        let genreArray = genre.split(",")
        console.log("genarr", genreArray)
        let check = genreArray.some(item=> !genreList.includes(item))
        if(check){
            console.log("check", check)
            throw new ApiError(httpStatus.BAD_REQUEST, "must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]")
        }else{
            condition = {...condition, genre: { $in: genreArray },}  
        }
    }

    if(contentRating){
            const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"]

            if (!contentRatingArray.includes(contentRating)) {
                throw new ApiError(httpStatus.BAD_REQUEST, " must be one of [Anyone, 7+, 12+, 16+, 18+, All]")   
            }else{
                let ratingArrayDesired = contentRatingArray.slice(0, contentRatingArray.indexOf(contentRating)+1)
                // console.log("ratingArray", ratingArrayDesired )
                condition = {...condition, contentRating: { $in: contentRating },}
            }
    } 

    let video = await Video.find(condition)

    if(sortBy){
        let sortArray = ["viewCount", "releaseDate"]
        if (!sortArray.includes(sortBy)) {
            throw new ApiError(httpStatus.BAD_REQUEST, " must be one of [viewCount, releaseDate]")   
        }
        if(sortBy === "releaseDate"){
            //  let video = await Video.find({})
            //  video.sort((a,b)=> new Date(b.releaseDate) - new Date(a.releaseDate))
            video.sort((a,b)=> new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        }
        if(sortBy === "viewCount"){
             video = await video.sort({ viewCount: -1 })
        }
    }
    return video
}

const getVideosById =async(id)=>{
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "videoId must be a valid mongo id")
    }
    let video = await Video.findOne({_id: id})

    if(!video){
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id")
    }
    return video
}

const postVideoByBody = async(body)=>{
    const video = await Video.create({...body})
    await video.save()
    return video;
}

const patchVideoVotes = async(id, body)=>{
    const {vote, change} = body;
    console.log(id)
    let video = await Video.findOne({_id:id})
    if(!video){
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id")
    }
    console.log(video);
    if(change == "increase"){
        if(vote === "upVote"){
             video.votes.upVotes = video.votes.upVotes + 1;
        }else{
            console.log("inside downVote Inc")
            video.votes.downVotes = video.votes.downVotes + 1;
        }
    }else{
        if(vote === "upVote"){
              if(video.votes.upVotes !== 0){
                video.votes.upVotes = video.votes.upVotes -1;
               }
        }else{
             if(video.votes.downVotes !== 0){
                video.votes.downVotes = video.votes.downVotes-1;
              }
        }
        console.log(video);
        
        //return;
    }
    await video.save()
    return video; 
}

const patchVideosByViews = async(id)=>{
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "videoId must be a valid mongo id")
    }
    let video = await Video.findOne({_id: id})
    if(!video){
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id")
    }
    video.viewCount++
    await video.save()
    return video;
}
 

module.exports = {
    getAllVideos, 
    getVideosByConditions,
    getVideosById,
    postVideoByBody,
    patchVideoVotes,
    patchVideosByViews
} 