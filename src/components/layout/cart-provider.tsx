"use client";

import { PropsWithChildren, useEffect } from "react"
import { CartProvider as USCProvider } from "use-shopping-cart"
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "@/awsconfig";
import awsconfig2 from "@/awsconfig2";

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


const AWSProvider = ({ children }: PropsWithChildren) => {

  useEffect(() => {
    Amplify.configure(awsconfig2)
  }, [])

  return (<Authenticator.Provider>
    {children}
  </Authenticator.Provider>)
}

export default AWSProvider
