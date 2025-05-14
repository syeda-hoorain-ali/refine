"use client"

import { jost } from "@/app/fonts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from "@/components/user-dashboard/address"
import CardDetails from "@/components/user-dashboard/card-details"
import Orders from "@/components/user-dashboard/orders"
import Profile from "@/components/user-dashboard/profile"


//* Tabs:
//  - profile
//  - address
//  - card details
//  - orders


const page = () => {
  return (<>

    <h2 className={`text-5xl mt-12 mb-6 font-black text-[#1e2a38] uppercase text-center ${jost.variable}`}>
      Dashboard
    </h2>

    <div className="bg-muted rounded-lg p-2 mb-8 w-full max-w-6xl mx-auto">


      <Tabs defaultValue="profile" className="bg-pink-40">

        <TabsList className="w-xl bg-blue-30">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="card-details">Card details</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <hr/> 

        <TabsContent value="profile"><Profile /></TabsContent>
        <TabsContent value="address"><Address /></TabsContent>
        <TabsContent value="card-details"><CardDetails /></TabsContent>
        <TabsContent value="orders"><Orders /></TabsContent>

      </Tabs>
    </div>

  </>)
}

export default page
