import mongoose from "mongoose";
const { Schema } = mongoose;

const menuItemSchema = new Schema(
    {
        image: {
            type: String,
            trim: true
        },

        heading: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: ["sushi", "drinks"]
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    });

    const MenuItem = mongoose.model("MenuItem", menuItemSchema);
    export default MenuItem;