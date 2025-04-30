"use client"

import { jost } from "@/app/fonts"
import { IProduct } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useShoppingCart } from "use-shopping-cart"
import { formatCurrencyString, type CartEntry } from "use-shopping-cart/core"


export const ProductCard = ({ id, images, price, title }: IProduct) => {
  return (<>
    <div className="w-80">
      <div className="relative group w-[326px] h-[460px]">
        <Link href={`/products/${id}`} className="block w-full h-full relative">
          {/* Default image */}
          <Image
            src={images[0]}
            alt={title}
            width={326}
            height={460}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Hover image */}
          <Image
            src={images[1]}
            alt={title}
            width={326}
            height={460}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <button className="absolute left-4 right-4 bottom-4 w-72 py-2 bg-white border border-black z-10">
            Quickview
          </button>
        </Link>
      </div>


      <div className="flex flex-col my-1">
        <Link
          href={`/products/${id}`}
          title={title}
          className={`text-lg font-medium uppercase ${jost.variable}`}
        >
          {title}
        </Link>

        <span className="text-lg">${price}.00</span>
      </div>
    </div>
  </>)
}


export const CartProduct = ({ id, image, name, price, quantity }: CartEntry) => {

  const { removeItem, setItemQuantity } = useShoppingCart()


  const incrementQuantity = () => setItemQuantity(id, quantity + 1)
  const decrementQuantity = () => setItemQuantity(id, quantity - 1)

  return (<>
    <div className="flex items-start gap-4 border-b py-4">
      <img
        src={image}
        alt={name}
        className="w-20 h-24 object-cover rounded"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-medium text-gray-900 leading-tight max-w-xs">
            {name}
          </h2>
          <p className="text-sm font-semibold text-gray-900">
            {formatCurrencyString({ value: price, currency: 'USD' })}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="w-6 h-6 border rounded text-sm leading-none cursor-pointer" onClick={decrementQuantity}>−</button>
          <span className="text-sm">{quantity}</span>
          <button className="w-6 h-6 border rounded text-sm leading-none cursor-pointer" onClick={incrementQuantity}>+</button>
        </div>

        <button
          className="mt-2 text-xs text-gray-500 underline cursor-pointer"
          onClick={() => removeItem(id)}
        >
          remove
        </button>
      </div>
    </div>

  </>)
}
