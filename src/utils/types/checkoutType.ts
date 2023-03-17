interface ClientAddress {
  id: string
  city: string
  country: string
  line1: string
  line2: string
  postal_code: string
  state: string
  checkoutSessionId?: string
}
interface ProductsInCheckout {
  id: string
  name: string
  imageUrl: string
  checkoutSessionId?: string
}
export interface CheckoutSession {
  stripeCheckoutSessionId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: ClientAddress
  productComplement: string
  productsInCheckout: ProductsInCheckout[]
  status: string
}
