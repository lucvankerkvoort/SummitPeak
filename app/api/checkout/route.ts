import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

interface CheckoutItem {
  id: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CheckoutItem[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const lineItems = items.map((item) => {
      const product = getProductById(item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);
      if (!product.inStock) throw new Error(`Product out of stock: ${product.name}`);

      // Use pre-created Stripe price ID when available (set via npm run seed-stripe)
      if (product.stripePriceId) {
        return { price: product.stripePriceId, quantity: item.quantity };
      }

      // Fallback: inline price_data (works without seeding)
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image ? [`${baseUrl}${product.image}`] : [],
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "DE", "FR", "NL", "BE", "AU", "NZ"],
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
