import { jost } from "@/app/fonts"
import { ProductCard } from "@/components/cards"
import { client } from "@/sanity/lib/client"
import { IProduct } from "@/types/product"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



const ProductsSection = async () => {

  // use state later :)

  const query = `*[_type == "product"]{
    "id": _id,
    title,
    price,
    "images": images[0..1].asset->url
  }`

  const products: IProduct[] = await client.fetch(query)

  return (<>
    <section className="w-full bg-[#E6E8EB] py-12">

      <div className="px-16 flex justify-between">
        <div>
          <h4 className={`text-2xl font-medium text-[#1e2a38] uppercase ${jost.variable}`}>Fresh picks</h4>
          <p>Explore our curated collections designed for style, comfort, and performance.</p>
        </div>

        <span className="underline underline-offset-2 hover:no-underline cursor-pointer">View all</span>
      </div>


      <div className="pl-16 my-8 mb-40">

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full flex gap-8"
        >
          <CarouselContent className="gap-8">
            {products.map(product => (
              <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4">
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>

    </section>
  </>)
}

export default ProductsSection
