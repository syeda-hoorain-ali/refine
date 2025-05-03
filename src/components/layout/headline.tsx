"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AnchorIcon } from "../icons"
import { Button } from "../ui/button"

const Headline = () => {
  const announcements = [
    "Free shipping for all orders above $500. Available for limited time.",
    "Use coupon code <strong>20%OFF</strong> for more offers."
  ]

  const [index, setIndex] = useState(0)

  const next = () => setIndex((index + 1) % announcements.length)
  const prev = () => setIndex((index - 1 + announcements.length) % announcements.length)

  // Autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="bg-primary" id="headline">
      <div className="max-w-[50rem] mx-auto flex justify-between items-center px-4">
        <Button size="icon" onClick={prev}>
          <AnchorIcon className="text-black rotate-90" />
        </Button>

        <div className="text-sm text-center w-full px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              dangerouslySetInnerHTML={{ __html: announcements[index] }}
            />
          </AnimatePresence>
        </div>

        <Button size="icon" onClick={next}>
          <AnchorIcon className="text-black -rotate-90" />
        </Button>
      </div>
    </div>
  )
}

export default Headline
// return (<>
//   <div className="bg-primary">
//     <div className="max-w-[50rem] mx-auto flex justify-between items-center">
//       <Button><AnchorIcon className="text-black rotate-90" /></Button>
//       <p className="text-sm" dangerouslySetInnerHTML={{ __html: announcments[1] }} />
//       <Button><AnchorIcon className="text-black -rotate-90" /></Button>
//     </div>
//   </div>
// </>)