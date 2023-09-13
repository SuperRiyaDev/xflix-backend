const Joi = require("joi")

const genreList =  ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"]
const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"]
const dateRegex = /^(0?[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;
const linkRegex = /^https:\/\/i\.ytimg\.com\/vi_webp\/[a-zA-Z0-9_-]+\/sddefault\.webp$/;
const embedLinkRegex = /^youtube\.com\/embed\/[a-zA-Z0-9_-]+$/;

const video = {
    body: Joi.object().keys({
        videoLink: Joi.string().pattern(embedLinkRegex).required(),
        title: Joi.string().required(),
        genre: Joi.string().required().valid(...genreList),
        contentRating: Joi.string().required().valid(...contentRatingArray),
        releaseDate: Joi.string().pattern(dateRegex).required(),
        previewImage: Joi.string().pattern(linkRegex).required(),
    })
}

module.exports ={
    video,
}