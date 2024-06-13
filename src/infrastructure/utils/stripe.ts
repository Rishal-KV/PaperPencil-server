import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import Course from "../../domain/course";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
export const paymentCheckOut = async (course: Course) => {
  try {
    const secretKey = process.env.stripe_secret as string;
    // console.log(secretKey);

    const stripInstance = new Stripe(secretKey);
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
  } catch (error) {
    throw error;
  }
};
