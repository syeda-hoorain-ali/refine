import Link from "next/link"
import { Button } from "../ui/button"
import { fraunces } from "@/app/fonts"

const OurCollectionsSection = () => {
  return (
    <section className="mx-12 my-4 px-4 ">

      <div className="mb-9 flex justify-between items-center">
        <div className="text w-full flex flex-col gap-2">
          <h2 className={`text-4xl font-normal ${fraunces.className}`}>Our collections</h2>
          <p>Premium leather bags & accessories for affordable price.</p>
        </div>

        <Link href="/collection">
          <Button size="lg">Go to collections</Button>
        </Link>
      </div>


      <div className="grid grid-cols-4">

        <div className="card mb-4">
          <div className="image mb-3">

          </div>


        </div>

      </div>

    </section>
  )
}

export default OurCollectionsSection