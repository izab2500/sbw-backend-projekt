import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        customerName: {
            type: String,
            trim: true,
            required: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: true
        },
        items: [
            {
                menuItemId: {
                    type: String,
                    required: true
                },
                heading: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "paid", "completed", "cancelled"],
            default: "pending",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema);
export default Order;