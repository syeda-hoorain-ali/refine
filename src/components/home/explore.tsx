import Image from "next/image";
import Link from "next/link";
import { fraunces } from "@/app/fonts";

const ExploreSection = () => {

  const cards = [
    {
      image: 'https://refine-theme-modern.myshopify.com/cdn/shop/files/home-image-cards-1.jpg',
      title: 'Explore our exclusive collections and unique products',
      link: { text: 'Go to collections', href: '/collections' }
    },
    {
      image: 'https://refine-theme-modern.myshopify.com/cdn/shop/files/home-image-cards-2.jpg',
      title: 'Uncover the story behind our skilled craftsmanship',
      link: { text: 'Read our story', href: '/blog' }
    },
    {
      image: 'https://refine-theme-modern.myshopify.com/cdn/shop/files/home-image-cards-3.jpg',
      title: 'Discover premium leather handbags in store',
      link: { text: 'Walk into our store', href: '/contact' }
    }
  ]


  return (
    <section className="bg-peach">

      <div className="mx-12 p-4 h-72 flex items-center border-b bg-peach border-black">
        <h4 className={`text-5xl font-normal ${fraunces.className}`}>
          “Explore the art of elegance with our modern handbags. Timeless designs crafted for those who appreciate true sophistication.”
        </h4>
      </div>

      <div className="mx-12 px-4 py-16 grid grid-cols-6">

        {cards.map((card, i) => (
          <div className="col-span-2" key={i}>
            <div className="image">
              <Image
                alt={card.title}
                width={393}
                height={488}
                src={card.image}
                className="object-cover"
              />
            </div>

            <div className="content mt-4">
              <h5 className="font-bold text-2xl mb-4">{card.title}</h5>
              <Link
                href={card.link.href}
                className="underline hover:no-underline underline-offset-2">
                {card.link.text}
              </Link>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default ExploreSection
