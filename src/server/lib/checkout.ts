import { prisma } from "../../../prisma/client";
import { CheckoutSession } from "../../utils/types/checkoutType";
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
  coupon?: string;
}

interface CartItem extends LineItem {
  id: string;
}

interface CreateCheckoutSessionParams {
  mode: 'payment';
  success_url: string;
  cancel_url: string;
  line_items: LineItem[];
  discounts?: Discount[];
  metadata?: any
}

export const createCheckoutSession = async (params: CreateCheckoutSessionParams) => {
  try {
    return await stripe.checkout.sessions.create({
      ...params, 
      shipping_address_collection: {allowed_countries: ['BR']},
      phone_number_collection: {
        enabled: true,
      },
      /* payment_method_types: ['card', 'pix', 'boleto'] */
     })
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

export const postCheckout = async ({
  line_item, 
  productId, 
  discount, 
  metadata}: any) => {
  try {
    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelURL = `${process.env.NEXT_URL}/checkout/${productId}`;
    
    const checkoutSession = discount > 0
      ? await createCheckoutSession({
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        line_items: [ line_item ],
        discounts: [{ coupon: (await createCoupon(+discount)).id }],
        metadata
      })
      : await createCheckoutSession({
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        line_items: [ line_item ],
        metadata
      });
    

      return {checkoutUrl: checkoutSession.url}
   } catch (error) {
    console.error(error);
    return error
   }
}

export const postCheckoutByCart = async ({
  totalDiscountInPercentage, 
  listItemByCart, 
  metadata}: any) => {
  try {
    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelURL = `${process.env.NEXT_URL}/cart`;

    const checkoutSession = totalDiscountInPercentage > 0
    ? await createCheckoutSession({
      mode: 'payment',
      success_url: successURL,
      cancel_url: cancelURL,
      line_items: listItemByCart,
      discounts: [{ coupon: (await createCoupon(+totalDiscountInPercentage)).id }],
      metadata
    })
    : await createCheckoutSession({
      mode: 'payment',
      success_url: successURL,
      cancel_url: cancelURL,
      line_items: listItemByCart,
      metadata
    });

    return {checkoutUrl: checkoutSession.url}
  } catch (error) {
    console.error(error);
    return error
  }
}

export const getCheckout = async () => {
  const checkoutList = await prisma.checkoutSession.findMany({
    include: {
      clientAddress: true,
      productsInCheckout: true,
    }
  })

  return checkoutList
}

export const postSaveCheckout = async (
  {
    clientEmail,
    clientName,
    clientPhone,
    clientAddress,
    productComplement,
    status,
    stripeCheckoutSessionId,
    productsInCheckout,
  }: CheckoutSession
) => {
  const checkoutSession = await prisma.checkoutSession.findFirst({
    where: {
      stripeCheckoutSessionId
    }
  })

  if (checkoutSession) {
    throw new Error("Já existe uma sessão de checkout com o ID fornecido.")
  }

  const saveCheckout = prisma.checkoutSession.create({
    data: {
      clientEmail,
      clientName,
      clientPhone,
      clientAddress: {
       create: {
        ...clientAddress
       }
      },
      productComplement,
      status,
      stripeCheckoutSessionId,
      productsInCheckout: {
        createMany: {
          data: productsInCheckout
        }
      },
    }
  })

  return saveCheckout
}