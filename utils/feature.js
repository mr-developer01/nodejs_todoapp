import jwt from "jsonwebtoken";


// generating cookies session :--
export const sendCookie = (user, res, message, statusCode=200) => {
    
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }).json({
        success: true,
        message
    });
}