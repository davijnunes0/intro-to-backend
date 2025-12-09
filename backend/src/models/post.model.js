import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        require: true,
        trim: true 
    },

    age: {
        type: Number,
        rqeuired: true,
        min: 1,
        max: 150
    },

});

export const Post = mongoose.model("Post",postSchema);