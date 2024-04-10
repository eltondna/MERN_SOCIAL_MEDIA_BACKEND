const express = require('express')
const app = express();

require('dotenv').config()
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const commentsRoutes = require('./routes/comments')
const likesRoutes = require('./routes/likes')
const postsRoutes = require('./routes/posts')
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(cors())     // Allow all origin



app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/comments",commentsRoutes)
app.use("/api/likes",likesRoutes)
app.use("/api/posts",postsRoutes)


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port " + port + "...")
})