export interface CheckoutSession {
  stripeCheckoutSessionId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: ClientAddress;
  productComplement: string;
  productsInCheckout: ProductsInCheckout[];
  status: string;
}

interface ClientAddress {
  id: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
  CheckoutSession: CheckoutSession[];
}

interface ProductsInCheckout {
  id: string;
  name: string;
  imageUrl: string;
  CheckoutSession?: CheckoutSession;
  checkoutSessionId?: string;
}