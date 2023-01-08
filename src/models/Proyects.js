import mongoose from "mongoose"

const proyectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    dateDelivery: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: String,
        trim: true,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    coloaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},{ timestamps: true})

const Proyect = mongoose.model('Proyect', proyectSchema)
export default Proyect