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

const updatePost = async (req, res) => {
    try {
        const allowedUpdates = ["name","description","age"]; 
        const updateBody = {};

        // 1. Filtrar o corpo da requisição para aceitar apenas campos permitidos
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updateBody[key] = req.body[key];
            }
        });

        // 2. Validação se o corpo filtrado está vazio
        if (Object.keys(updateBody).length === 0) {
            return res.status(400).json({
                message: "No valid data provided for update"
            });
        }

        // Se o ID for inválido, findByIdAndUpdate pode lançar um CastError
        const post = await Post.findByIdAndUpdate(req.params.id, updateBody, { new: true });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post Updated Successfully", post
        });

    } catch (error) {
        // 3. Melhorar o tratamento de erro para ID inválido
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid Post ID format or data type error",
                error: error.message
            });
        }

        // Erro de servidor (conexão, etc.)
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const deletePost = async (req,res) => {

    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message: "post not found"
        });
    }

    const deleted = await Post.findByIdAndDelete(req.params.id);


    return res.status(200).json({
        message: "Post successfully deleted"
    });
}


export{
    createPost,
    getAllPost,
    updatePost,
    deletePost
};