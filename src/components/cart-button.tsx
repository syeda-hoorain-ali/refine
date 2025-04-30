"use client";

import { IProductDetails } from "@/types";
import { useShoppingCart } from "use-shopping-cart";

const AddToCartButton = ({ product }: { product: IProductDetails }) => {

  const { addItem } = useShoppingCart();

  const cartProduct = {
    id: product?.id,
    name: product?.title,
    image: product?.images[0],
    price: product?.price * 100,
    currency: 'USD'
  }
  return (
    <button
      className="w-full mx-4 py-2 bg-orange-400 border border-black z-10 cursor-pointer"
      onClick={() => addItem(cartProduct)}
    >
      Add to cart
    </button>
  )
}

export default AddToCartButton