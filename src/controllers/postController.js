const Post = require('../models/Post');

async function getAllPosts(req, res) {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function createPost(req, res) {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.json({ deleted: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllPosts,
    createPost,
    deletePost
};
