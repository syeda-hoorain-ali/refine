"use client";

import { PropsWithChildren } from "react"
import { CartProvider as USCProvider } from "use-shopping-cart"

export const CartProvider = ({ children }: PropsWithChildren) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_STRIPE_KEY')
  }

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only" // to store cart data in localStorage
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY}
      successUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`}
      currency="USD"
      language="en-US"
      persistKey="refine-cart"
      shouldPersist // to store cart data in localStorage
      billingAddressCollection // to collect billing address from user
    >
      {children}
    </USCProvider>
  )
}
