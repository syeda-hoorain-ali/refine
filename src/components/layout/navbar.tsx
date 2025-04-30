"use client";

import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { AnchorDownIcon, ArrowRightIcon, MenuBarIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "../icons"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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


const Navbar = () => {

  const { cartCount } = useShoppingCart()

  const countries = [
    "Australia (USD $)",
    "Austria (USD $)",
    "Belgium (USD $)",
    "Canada (USD $)",
    "Czechia (USD $)",
    "Denmark (USD $)",
    "Finland (USD $)",
    "France (USD $)",
    "Germany (USD $)",
    "Hong Kong SAR (USD $)",
    "India (USD $)",
    "Ireland (USD $)",
    "Italy (USD $)",
    "Japan (USD $)",
    "Malaysia (USD $)",
    "Netherlands (USD $)",
    "New Zealand (USD $)",
    "Norway (USD $)",
    "Poland (USD $)",
    "Portugal (USD $)",
    "Singapore (USD $)",
    "South Korea (USD $)",
    "Spain (USD $)",
    "Sweden (USD $)",
    "Switzerland (USD $)",
    "United Arab Emirates (USD $)",
    "United Kingdom (USD $)",
    "United States (USD $)",
  ];



  return (<>
    <nav className="w-screen flex items-center justify-between p-9 h-16 gap-9">
      <div className="flex items-center gap-4">

        {/* Logo */}
        <Link href='/'>
          <Image src="/logo.png" alt="REFINE" width={100} height={20} />
        </Link>


        {/* Navlinks */}
        <ul className="hidden md:flex items-center gap-2">
          <li>
            <Link href='/' className="hover:underline underline-offset-4">New arrivals</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Bestsellings</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Shop all</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Collections</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">About us</Link>
          </li>
          <li>
            <Link href='/' className="hover:underline underline-offset-4">Contact</Link>
          </li>
        </ul>
      </div>


      <div className="flex items-center gap-1">

        {/* Search */}
        <div className="flex items-center gap-2 px-2 border border-black rounded-full w-60">
          <SearchIcon className="size-6 stroke-2" />
          <Input placeholder="Start typing..." className="border-none" />
          <Button className="size-7 bg-black rounded-full"> <ArrowRightIcon /> </Button>
        </div>

        {/* User */}
        <Button size="icon">
          <UserIcon className="text-black stroke-2" />
        </Button>

        {/* Cart */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-black">
              <ShoppingBagIcon className="stroke-2" />
              {/* items in cart */}
              <span className="hover:underline underline-offset-2">({cartCount})</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-7xl">
            <Cart />
          </SheetContent>
        </Sheet>


        {/* Currency */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold cursor-pointer">USD $ <AnchorDownIcon /></DropdownMenuTrigger>
          <DropdownMenuContent>
            {countries.map(country => (
              <DropdownMenuItem key={country}>{country}</DropdownMenuItem>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>


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
    </nav>
  </>)
}

export default Navbar