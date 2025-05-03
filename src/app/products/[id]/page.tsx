"use client"

import { jost } from "@/app/fonts"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { IProductDetails } from "@/types/product"
import AddToCartButton from "@/components/cart-button"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

const Page = ({ params }: Props) => {

  const [image, setImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<IProductDetails | null>(null)


  useEffect(() => {
    const fetchProduct = async () => {

      setIsLoading(true)
      const { id } = await params

      const query = `*[_type == "product" && _id == "${id}"][0]{
        "id":_id,
        title,
        description,
        price,
        stock,
        color,
        "images": images[].asset->url
        }`

      const product: IProductDetails = await client.fetch(query)

      setProduct(product)
      if (product) setImage(product.images[0])
      setIsLoading(false)
    }

    fetchProduct()

  }, [params])


  if (isLoading) return <p>Loading...</p>
  if (!product) return notFound()


  return (<>
    <span className="mx-8 py-2">Home / {product.title}</span>

    <div className="mx-16 my-4 grid h-screen grid-cols-11 gap-5">
      <div className="flex flex-col gap-2">
        {product?.images.map(image => (
          <button className="cursor-pointer" onClick={() => setImage(image)}>
            <Image
              key={image}
              src={image}
              alt={product.title}
              width={79}
              height={79}
              className="inset-0 w-full border"
            />
          </button>
        ))}

      </div>

      <div className="col-span-5">
        <Image
          src={image}
          alt={product.title}
          width={579}
          height={817}
          className="inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="col-span-5 flex flex-col gap-1">

        <h1 className={`text-3xl font-medium text-[#1e2a38]  ${jost.variable}`}>
          {product.title}
        </h1>

        <span className="text-xl font-bold text-[#1e2a38]">${product.price}.00</span>
        <div className="w-full h-1 my-2 bg-[#ccc]"></div>
        <p className="text-[#1e2a38]">{product.description}</p>
        <p className="my-6 font-bold text-[#1e2a38]">{product.stock} in stock</p>


        <div>
          <div className="mb-6">
            {/* <ToggleGroup type="multiple" variant="outline">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">

              </ToggleGroupItem>
            </ToggleGroup> */}
          </div>
          <AddToCartButton product={product} />

        </div>
      </div>
    </div>
  </>)
}

export default Page
