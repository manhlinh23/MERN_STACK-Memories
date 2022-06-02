import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
import express from 'express';
const router = express.Router();
export const getPosts = async(req,res) => {
    try {
        let response = await PostMessage.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async(req,res) => {
    const post = req.body

    const newPost = PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req,res) => 
{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(200).json(updatedPost);

}
export const deletePost = async (req,res) => 
{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({message: 'Post deleted successfully!'});

}

export const likePost = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(id)
    const updatePost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new:true})

    res.status(200).json(updatePost)

}



export default router;
