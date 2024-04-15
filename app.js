const express = require('express')
const app = express();

require('dotenv').config()
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const commentsRoutes = require('./routes/comments')
const likesRoutes = require('./routes/likes')
const postsRoutes = require('./routes/posts')
const relationshipRoutes = require("./routes/relationships")
const cors = require('cors')
const auth = require('./middlewares/authentication')

// middlewares
app.use(express.json())
app.use(cors())     // Allow all origin



app.use("/api/users",auth, userRoutes)
app.use("/api/auth",auth, authRoutes)
app.use("/api/comments",auth,commentsRoutes)
app.use("/api/likes",auth,likesRoutes)
app.use("/api/posts",auth,postsRoutes)
app.use("/api/relationships",auth,relationshipRoutes)

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log("Server is running on port " + port + "...")
})