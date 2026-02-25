import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import User from "../models/user.model.js";

const router = express.Router();

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find all users except the logged-in user
        // We can add search functionality later if needed via req.query.search
        const searchKeyword = req.query.search
            ? {
                name: { $regex: req.query.search, $options: "i" },
            }
            : {};

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
            ...searchKeyword
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.get("/", protectRoute, getUsersForSidebar);

export default router;
