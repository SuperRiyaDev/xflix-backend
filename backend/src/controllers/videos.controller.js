const httpStatus = require("http-status")
const catchAsync = require("../utils/catchAsync")
const ApiError = require("../utils/ApiErrors")
const {videoService} = require("../services")
 
 
const getVideos =catchAsync(async(req, res)=>{  
        const {title, genres, contentRating, sortBy} = req.query;

        if(title||genres||contentRating||sortBy){
            console.log("query present")
            videos = await videoService.getVideosByConditions(title, genres, contentRating, sortBy)
        }else{
            videos = await videoService.getAllVideos()
        }  
        // console.log("video", video)
        res.status(200).send({videos});
    // } catch (error) {
        // console.log("error", error)
        // throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "some error occured")
    // } 
})

const getById = catchAsync(async(req, res)=>{
    const {videoId} = req.params;
    console.log("from getbyId", videoId)
    let video = await videoService.getVideosById(videoId)
    res.send(video);
    // res.send() 
})

const postVideos = catchAsync(async(req, res)=>{
    let createdVid = await videoService.postVideoByBody(req.body)
    res.status(201).send(createdVid)
})

const patchByVotes = catchAsync(async(req,res)=>{
    const {videoId} = req.params;
    console.log("vidId", videoId)
    let patchedVid = await videoService.patchVideoVotes(videoId, req.body)
    res.status(204).send()
    // res.send(patchedVid)
})

const patchByViews = catchAsync(async(req, res)=>{
    const {videoId} = req.params;
    let patchedVid = await videoService.patchVideosByViews(videoId)
    res.status(204).send()
    // res.send(patchedVid)
})


module.exports = {
    getVideos, 
    getById,
    postVideos,
    patchByVotes,
    patchByViews
}