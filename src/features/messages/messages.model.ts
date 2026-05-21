import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Enter a valid email"
        ]
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },

    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
