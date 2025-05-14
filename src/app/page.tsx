import HeroSection from "@/components/home/hero"
import { fraunces } from "./fonts"
import { Marquee } from "@/components/magicui/marquee"
import Image from "next/image";
import ProductsSection from "@/components/home/products";
import ExploreSection from "@/components/home/explore";
import OurCollectionsSection from "@/components/home/our-collections";

const page = () => {

  const features = [
    "Eco-friendly Fabrics",
    "Sustainable Manufacturing",
    "Made for Movement",
    "Scientifically Tested."
  ];


  return (<>
    <HeroSection />
    <ExploreSection />
    <OurCollectionsSection />

    {/* <ProductsSection /> */}


  </>)
}

export default page
