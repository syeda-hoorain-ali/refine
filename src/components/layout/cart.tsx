"use client";

import { jost } from "@/app/fonts"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { CartProduct } from "../cards";

const Cart = () => {

  const { cartDetails, totalPrice } = useShoppingCart()
  const cart = Object.values(cartDetails ?? {})

  console.log('cart')
  console.log(cart)

  return (<>
    <div className="h-lvh p-4 flex flex-col justify-between">

      <div>
        <div className="flex flex-col gap-2">
          <h2 className={`text-4xl font-medium uppercase text-[#1e2a38]  ${jost.variable}`}>
            Your cart
          </h2>
          <hr />
          <p>Free shipping for any orders above $100.00</p>
          <hr />
        </div>

        {cart.map(product => <CartProduct key={product.id} {...product} />)}
      </div>



      <div>
        <p className="mb-2 flex justify-between font-semibold">
          <span>Total price: </span>
          <span>{formatCurrencyString({ value: totalPrice || 0, currency: 'USD' })}</span>
        </p>
        <button className="w-full py-2 bg-white border border-black z-10 cursor-pointer">
          Checkout
        </button>
      </div>

    </div>

  </>)
}

export default Cart