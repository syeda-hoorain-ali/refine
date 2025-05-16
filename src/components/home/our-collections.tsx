import Link from "next/link"
import { Button } from "../ui/button"
import { fraunces } from "@/app/fonts"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

const OurCollectionsSection = () => {


  const collections = [
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/collections/collection-3.jpg",
      title: "Crossbody bags",
      units: 7,
    },
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/collections/collection-1.jpg",
      title: "Leather goods",
      units: 0,
    },
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/collections/collection-4.jpg",
      title: "Shoulder bags",
      units: 7,
    },
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/collections/collection-2.jpg",
      title: "Sneakers",
      units: 0,
    },
  ]

  const overlayCards = [
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/files/home-overlay-cards-1.jpg",
      title: "Shoulder bags",
      description: 'Discover our elegant and versatile shoulder bags, crafted for everyday style.',
      href: '/collections',
      theme: 'light',
      backgroundColor: '#F7B96E',
    },
    {
      image: "https://refine-theme-modern.myshopify.com/cdn/shop/files/home-overlay-cards-2.jpg",
      title: "Crossbody bags",
      description: 'Explore our stylish and practical crossbody bags, perfect for hands-free convenience.',
      href: '/collections',
      theme: 'dark',
      backgroundColor: '#044908',
    },
  ]


  return (
    <section className="sm:mx-12 my-4 px-4 ">

      <div className="mb-9 flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="text w-full flex flex-col gap-2">
          <h2 className={`text-3xl sm:text-4xl font-normal ${fraunces.className}`}>Our collections</h2>
          <p>Premium leather bags & accessories for affordable price.</p>
        </div>

        <Link href="/collection">
          <Button size="lg">Go to collections</Button>
        </Link>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-4 mb-4 gap-4">
        {collections.map((product, i) => (
          <div className="product-card mb-4" key={i}>
            <div className="image overflow-hidden cursor-pointer mb-3">
              <Image
                alt={product.title}
                width={290}
                height={325}
                src={product.image}
                className="object-cover hover:scale-105 transition-all "
              />
            </div>

            <h4 className="text-lg sm:text-xl font-bold">
              <Link href="/collections" title={product.title}>
                {product.title} ({product.units})
              </Link>
            </h4>
          </div>
        ))}
      </div>

      <Separator />


      <div className="my-5 px-2 sm:px-4 flex flex-col sm:flex-row gap-5">

        {overlayCards.map((card, i) => (
          <div key={i} className="relative group sm:w-1/2 sm:hover:w-3/4 min-h-100 md:h-166.5 transition-all overflow-hidden">

            <div className="image">
              <Image
                fill
                alt={card.title}
                src={card.image}
                className="-z-10 object-cover"
              />

              <div className="content absolute bottom-0 w-full p-7.5 group-hover:bottom-20 group-hover:opacity-0 transition-all duration-500">
                <h3 className={`text-4xl md:text-4xl mb-3 font-normal text-white ${fraunces.className}`}>{card.title}</h3>
              </div>

            </div>

            <div
              style={{ background: card.backgroundColor, color: card.theme == 'light' ? 'black' : 'white' }}
              className="overlay h-full relative opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div className="w-full flex flex-col p-7.5 absolute -bottom-27 opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className={`text-4xl md:text-4xl mb-3 font-normal ${fraunces.className}`}>{card.title}</h3>
                <p className="mb-3">{card.description}</p>
                <Link href={card.href}>
                  <Button className={cn(
                    "mt-3",
                    card.theme == 'light' ? "bg-black text-white" : "bg-white text-black"
                  )}>Shop now</Button>
                </Link>
              </div>
            </div>
            
          </div>
        ))}

      </div>
    </section>
  )
}

export default OurCollectionsSection
