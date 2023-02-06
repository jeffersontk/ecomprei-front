import { stripe } from "./stripe";

interface LineItem {
  name: string;
  description: string;
  images: string[];
  amount: number;
  currency: string;
  quantity: number;
}

interface Discount {
  coupon: string;
}

interface CartItem extends LineItem {
  id: string;
}

interface CreateCheckoutSessionParams {
  mode: 'payment';
  success_url: string;
  cancel_url: string;
  line_items: LineItem[];
  discounts: Discount[];
}

export const createCheckoutSession = async (params: CreateCheckoutSessionParams) => {
  try {
    return await stripe.checkout.sessions.create(params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createCoupon = async (discount: number) => {
  try {
    return await stripe.coupons.create({
      percent_off: discount,
      name: `OFF${discount}`
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}