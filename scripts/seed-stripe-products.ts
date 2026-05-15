/**
 * Creates all Summit Prints products in Stripe and prints the price IDs.
 * Run once: npm run seed-stripe
 * Then paste the printed stripePriceId values into lib/products.ts.
 *
 * Safe to re-run: skips products that already exist (matched by metadata.catalog_id).
 */

import Stripe from "stripe";
import { products } from "../lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function seedStripeProducts() {
  console.log("Seeding Stripe products...\n");

  const results: { id: string; name: string; stripePriceId: string }[] = [];

  for (const product of products) {
    // Check if already created
    const existing = await stripe.products.search({
      query: `metadata["catalog_id"]:"${product.id}"`,
    });

    if (existing.data.length > 0) {
      const stripeProduct = existing.data[0];
      const priceId =
        typeof stripeProduct.default_price === "string"
          ? stripeProduct.default_price
          : stripeProduct.default_price?.id ?? "";
      console.log(`✓ ${product.name} already exists — price: ${priceId}`);
      results.push({ id: product.id, name: product.name, stripePriceId: priceId });
      continue;
    }

    // Create new product with default price
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      default_price_data: {
        currency: "usd",
        unit_amount: product.price,
      },
      metadata: { catalog_id: product.id },
    });

    const priceId =
      typeof stripeProduct.default_price === "string"
        ? stripeProduct.default_price
        : stripeProduct.default_price?.id ?? "";

    console.log(`✓ Created ${product.name} — price: ${priceId}`);
    results.push({ id: product.id, name: product.name, stripePriceId: priceId });
  }

  console.log("\n--- Paste these stripePriceId values into lib/products.ts ---\n");
  for (const r of results) {
    console.log(`id: "${r.id}"  →  stripePriceId: "${r.stripePriceId}"  (${r.name})`);
  }
}

seedStripeProducts().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
