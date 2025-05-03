"use client"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"
import { fraunces } from "@/app/fonts"
import { useRef } from "react"


const HeroSection = () => {

  const autoplay = useRef(
    Autoplay(
      { delay: 5000, stopOnInteraction: true }
    )
  )


  return (
    <header id="hero" className="mb-96">

      <Carousel
        plugins={[autoplay.current]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-screen w-screen">

          <CarouselItem className="relative">
            <Image src="/home-slide-1.jpg" alt="Image 1" fill />

            <div className="absolute top-0 left-0 m-3 p-14 flex items-center w-full h-full pointer-events-none">

              <div className="w-[550px] flex flex-col gap-5 text-white">
                <h3 className={`text-5xl font-normal pointer-events-none ${fraunces.className}`}>
                  Discover timeless elegance in modern leather handbags
                </h3>
                <p className="text-lg pointer-events-none mb-7 mr-20">
                  Choose from a wide range of well crafted premium quality handbag online
                </p>
                <Button className="w-44 h-12 bg-primary rounded-none text-black">Explore all bags</Button>
              </div>
            </div>
          </CarouselItem>


          <CarouselItem className="relative">
            <Image src="/home-slide-2.jpg" alt="Image 2" fill />

            <div className="absolute top-0 left-0 m-3 p-14 flex items-center w-full h-full pointer-events-none">

              <div className="w-[550px] flex flex-col gap-5 text-white">
                <h3 className={`text-5xl font-normal pointer-events-none ${fraunces.className}`}>
                Upgrade your wardrobe with modern leather essentials
                </h3>
                <p className="text-lg pointer-events-none mb-7 mr-20">
                Choose from a wide range of well crafted premium quality handbag online
                </p>
                <Button className="w-44 h-12 bg-primary rounded-none text-black">Explore all bags</Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious variant="link" className="absolute bg-transparent top-1/2 left-4 p-0 [&_svg]:size-8" />
        <CarouselNext />
      </Carousel>


    </header>
  )
}

export default HeroSection
