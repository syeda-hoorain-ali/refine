import HeroSection from "@/components/home/hero"
import { jost } from "./fonts"
import { Marquee } from "@/components/magicui/marquee"
import Image from "next/image";
import ProductsSection from "@/components/home/products";

const page = () => {

  const features = [
    "Eco-friendly Fabrics",
    "Sustainable Manufacturing",
    "Made for Movement",
    "Scientifically Tested."
  ];


  return (<>
    <HeroSection />

    <div className="my-12 flex flex-col items-center text-center">
      <span className="text-lg text-[#1e2a38]">Over 50,000 products sold worldwide.</span>
      <h2 className={`text-6xl font-black text-[#1e2a38]  ${jost.variable}`}>
        Your Journey. <br /> Your Gear.
      </h2>
      <Marquee className=" max-w-lg mx-auto   [--duration:20s] ">
        {features.map(feature => (
          <p className="flex gap-3 items-center" key={feature}>
            <span>{feature}</span>
            <Image className="inline-block size-1.5" src="/scrolling-text-divider.png" alt='🟠' width={4.5} height={4} />
          </p>
        ))}
      </Marquee>
    </div>

    <ProductsSection />


  </>)
}

export default page
