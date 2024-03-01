// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./src/routes/postRoutes');
const sequelize = require('./src/config/sequelize');
const initialPosts = require('./initialData');
const Post = require('./src/models/Post');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRoutes);

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database synchronized.');

        // Create some initial posts
        await Post.bulkCreate(initialPosts);

        console.log('Initial posts created.');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to synchronize database:', error);
    });
