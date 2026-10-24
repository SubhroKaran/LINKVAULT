// import express from 'express';
// import dotenv from "dotenv";
// import mongoose from 'mongoose';
// import cors from 'cors';
// // import dotenv from 'dotenv';
// import urlRoutes from './routes/url.js';

// dotenv.config();

// const app = express();

// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     methods: ["GET","POST"],
// }));
// app.use(express.json());

// app.use("/", urlRoutes);
// // app.get("/", (req, res)=> {
// //     res.send("Hello World")
// // })
// // app.listen(3000,()=>{
// //     console.log("Sever is running on port 3000");
// // })
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("Connected to MongoDB");
//     app.listen(process.env.PORT,()=>{
//         console.log(`Server is running on port ${process.env.PORT}`)
//     })
// })
// .catch((err)=>{
//     console.error("Error connecting to MongoDB",err);
// })



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "node:crypto";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

// URL database structure
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Url = mongoose.model("Url", urlSchema);

// Test route
app.get("/", (req, res) => {
    res.send("LinkVault backend is running!");
});

// Create a short URL
app.post("/api/urls/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Please provide a URL"
            });
        }

        let parsedUrl;

        try {
            parsedUrl = new URL(originalUrl);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                throw new Error("Invalid protocol");
            }
        } catch {
            return res.status(400).json({
                message: "Please enter a valid HTTP or HTTPS URL"
            });
        }

        const shortCode = crypto.randomBytes(4).toString("hex");

        const savedUrl = await Url.create({
            originalUrl: parsedUrl.href,
            shortCode
        });

        const baseUrl = (
            process.env.BASE_URL || "http://localhost:3000"
        ).replace(/\/+$/, "");

        res.status(201).json({
            shortUrl: `${baseUrl}/${savedUrl.shortCode}`
        });
    } catch (err) {
        console.error("Shortening error:", err.message);

        res.status(500).json({
            message: "Could not shorten URL"
        });
    }
});

// Redirect to the original URL
app.get("/:code", async (req, res) => {
    try {
        const savedUrl = await Url.findOne({
            shortCode: req.params.code
        });

        if (!savedUrl) {
            return res.status(404).send("Short URL not found");
        }

        savedUrl.clicks++;
        await savedUrl.save();

        res.redirect(savedUrl.originalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });
