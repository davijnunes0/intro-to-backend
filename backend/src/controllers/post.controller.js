import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req,res) => {
    try {
        const { name, description, age } = req.body;

        if(!name || !description || !age){
            return res.status(404).json({
                message: "All fields are required"
        });
    }

        const post = await Post.create({
                name,
                description,
                age
        });

        return res.status(201).json({
            message: "Post created succesfully", post
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",error
        });
        
    }
}

const getAllPost = async (req,res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({
            message: "The posts were successfully captured.",
            posts
        });
    }catch(error) {
        res.status(500).json({
            message: "Internal Server error",error
        });
    }
}

export{
    createPost,
    getAllPost
}