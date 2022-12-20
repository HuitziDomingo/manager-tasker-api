import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirm: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
        next()
    let salt = await bcrypt.genSalt(10)
    this.password =  bcrypt.hash(this.password, salt)
})

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password) //coprobando pass aun que este encriptado
}

const User = mongoose.model('User', userSchema)

export default User

