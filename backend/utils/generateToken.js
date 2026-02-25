import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    const isProd = process.env.NODE_ENV !== "development";
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // "none" is required for cross-origin (Vercel frontend ↔ Render backend)
        // "strict" is fine for same-origin local dev
        sameSite: isProd ? "none" : "strict",
        secure: isProd, // must be true when sameSite is "none"
    });
};
