import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function checkOut() {
  try {
    const user = await getServerSession(authOptions);

    if (!user?.user || !user.user.id || !user.user.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        courseId_userId: {
          userId: user.user.id,
          courseId,
        },
      },
    });

    if (purchase) {
      return {
        success: false,
        message: "Already purchased",
      };
    }

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCostumer = await prisma.stripeCustomer.findUnique({
      where: {
        userId: user.user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCostumer) {
      const customer = await stripe.customers.create({
        email: user.user.email,
      });

      stripeCostumer = await prisma.stripeCustomer.create({
        data: {
          userId: user.user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCostumer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.WEBSITE_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.WEBSITE_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.user.id,
      },
    });

    return {
      success: true,
      message: "Session created successfully",
      data: session,
    };
  } catch (error) {
    console.log(`[CHECKOUT]`, error);
  }
}
