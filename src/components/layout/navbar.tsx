"use client";

import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { ArrowRightIcon, MenuBarIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "../icons"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Cart from "./cart"
import { useShoppingCart } from "use-shopping-cart"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import AuthButtons from "./auth-buttons";


const Navbar = () => {
  const { cartCount } = useShoppingCart()

  const [scrolledPastHero, setScrolledPastHero] = useState(true)
  const [isHomePage, setIsHomePage] = useState(false)
  const [navbarTop, setNavbarTop] = useState(36)
  const {loading, user} = useUser()

  useEffect(() => {

    const hero = document.getElementById("hero")
    setIsHomePage(!!hero)


    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 400
      setScrolledPastHero(window.scrollY > heroHeight)

      const headline = document.getElementById("headline")
      if (!headline) return
      const rect = headline.getBoundingClientRect()

      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))

      setNavbarTop(visibleHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (<>
    <nav
      className={cn(
        "w-full z-50 transition-colors duration-300 border-b bg-pink-900",
        // isHomePage ? "fixed" : "static",
        "bg-white shadow-sm text-black",
        // scrolledPastHero ? "bg-blue-300 shadow-sm text-black" :
        //   "bgtransparent backdrop-blur-sm border-white text-white"
      )}
      // style={{ top: `${navbarTop}px` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href='/'>
          <Image src="/logo.png" alt="REFINE" width={100} height={20} />
        </Link>


        {/* Navlinks */}
        <ul className="hidden md:flex items-center gap-4">
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Home</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Shop</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">About us</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Pages</Link>
          </li>
        </ul>


        <div className="flex items-center gap-1">

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-1 border border-current rounded-full w-48 h-8">
            <SearchIcon className="size-6 stroke-2 ml-1" />
            <Input placeholder="Start typing..." className="border-none placeholder:text-gray-400 p-0 focus-visible:ring-0" />
            <Button className="size-6 text-black rounded-full"> <ArrowRightIcon /> </Button>
          </div>

          {/* User */}
         <AuthButtons />

          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="text-current" variant="ghost">
                <ShoppingBagIcon className="stroke-2" />
                {/* items in cart */}
                <span className="hidden sm:inline hover:underline underline-offset-2">({cartCount})</span>
                <span className="sm:hidden hover:underline underline-offset-2">Bag({cartCount})</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-7xl">
              <Cart />
            </SheetContent>
          </Sheet>


          {/* Mobile Menu bar */}
          <Sheet>
            <SheetTrigger className="md:hidden"><MenuBarIcon /></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav>
  </>)
}

export default Navbar
