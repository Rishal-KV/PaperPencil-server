"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentCheckOut = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const paymentCheckOut = async (course) => {
    try {
        const secretKey = process.env.stripe_secret;
        // console.log(secretKey);
        const stripInstance = new stripe_1.default(secretKey);
        let line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: course.name,
                        images: [course.image],
                        description: course.description,
                    },
                    unit_amount: course.price * 100,
                },
                quantity: 1,
            },
        ];
        const session = await stripInstance.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `http://localhost:5173/enrolledsuccess/${course._id}`,
            cancel_url: `http://localhost:5173/coursedetails/${course._id}`,
        });
        return { sessionId: session.id };
    }
    catch (error) {
        throw error;
    }
};
exports.paymentCheckOut = paymentCheckOut;
