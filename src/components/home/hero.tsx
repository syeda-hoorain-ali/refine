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


const HeroSection = () => {
  return (
    <header>

      <Carousel
        plugins={[
          // Autoplay({
          //   delay: 2000,
          // }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-screen w-screen">

          <CarouselItem className="relative">
            <Image src="/bg-hero-1.png" alt="Image 1" fill />

            <div className="absolute top-0 left-0 flex items-center justify-center bg-orange-400/20 w-full h-full pointer-events-none">
              <div className="flex flex-col items-center text-center max-w-2xl gap-4 text-white">
                <h3 className="text-6xl font-black uppercase pointer-events-none">Elevate your performance.</h3>
                <p className="max-w-96 pointer-events-none">Discover performane-driven activewear designed to empower ever step.</p>
                <Button className="w-44 h-12 bg-orange-400 rounded-none">Shop activewears</Button>
              </div>
            </div>
          </CarouselItem>


          <CarouselItem className="relative">
            <Image src="/bg-hero-1.png" alt="Image 1" fill />

            <div className="absolute top-0 left-0 flex items-center justify-center bg-orange-400/20 w-full h-full pointer-events-none">
              <div className="flex flex-col items-center text-center max-w-2xl gap-4 text-white">
                <h3 className="text-6xl font-black uppercase pointer-events-none">Elevate your performance.</h3>
                <p className="max-w-96 pointer-events-none">Discover performane-driven activewear designed to empower ever step.</p>
                <Button className="w-44 h-12 bg-pink-400 rounded-none">Shop activewears</Button>
              </div>
            </div>
          </CarouselItem>


          <CarouselItem className="relative">
            <Image src="/bg-hero-1.png" alt="Image 1" fill />

            <div className="absolute top-0 left-0 flex items-center justify-center bg-orange-400/20 w-full h-full pointer-events-none">
              <div className="flex flex-col items-center text-center max-w-2xl gap-4 text-white">
                <h3 className="text-6xl font-black uppercase pointer-events-none">Elevate your performance.</h3>
                <p className="max-w-96 pointer-events-none">Discover performane-driven activewear designed to empower ever step.</p>
                <Button className="w-44 h-12 bg-blue-400 rounded-none">Shop activewears</Button>
              </div>
            </div>
          </CarouselItem>

        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


    </header>
  )
}

export default HeroSection
