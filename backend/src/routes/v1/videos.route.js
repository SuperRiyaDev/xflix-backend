const express = require("express")
const {videosController} = require("../../controllers/index")
const {videosValidation} = require("../../validations/index")
const validate = require("../../middlewares/validate")
const router = express.Router() 

const validateVideo = validate(videosValidation.video)

router.get("/", videosController.getVideos)  
router.get("/:videoId", videosController.getById)
router.post("/", videosController.postVideos)
router.patch("/:videoId/votes", videosController.patchByVotes)
router.patch("/:videoId/views", videosController.patchByViews)

module.exports = router;