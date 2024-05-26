const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = require("./reviews.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            default: "https:media.istockphoto.com/id/157373207/photo/balanced-stones-on-a-pebble-beach-during-sunset.jpg?s=2048x2048&w=is&k=20&c=OX3HgrIrYiVoiaqBkxpCh8nPcv7MgoKFbHwnSrwMIeQ=",
            set: (v) => v === "" ? "https://media.istockphoto.com/id/157373207/photo/balanced-stones-on-a-pebble-beach-during-sunset.jpg?s=2048x2048&w=is&k=20&c=OX3HgrIrYiVoiaqBkxpCh8nPcv7MgoKFbHwnSrwMIeQ=" : v,
        },
        filename: {
            type: String,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type:{
            type:String,
            enum:['Point'],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ reviews: { $in: listing.reviews } });
    }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
