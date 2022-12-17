import  jwt  from "jsonwebtoken"

export const generateJWT = id => jwt.sign({id}, process.env.JWT, {
    expiresIn: "30d"
})