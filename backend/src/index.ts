import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
        username: username,
        password: password
    });
    res.json({message: "User created"})
    } catch(e) {
        res.status(400).json({message: "User already exists"});
    }
});

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password,

    });
    
    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id,
            },
            JWT_SECRET
        );
        res.json({ token });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});

app.post("/api/v1/content",userMiddleware, async(req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({message: "Content added"});
})


app.get("/api/v1/content",userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")
    res.json(content)
})

app.delete("/api/v1/content",userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.json({message: "Content deleted"})
})

app.post("/api/v1/brain/share",userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share) {
        const existingLink  = await LinkModel.findOne({
            //@ts-ignore()
            userId: req.userId
        });

        if(existingLink)
        {   res.json({
            hash: existingLink.hash
            })
            return;
        }
        
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed Link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash: hash
    });

    if(!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        //@ts-ignore
        userId: link.userId
    })

    const user = await UserModel.findOne({
        //@ts-ignore
        _id: link.userId
    })

    if(!user) {
        res.status(411).json({
            message: "User not found"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

app.listen(3000);