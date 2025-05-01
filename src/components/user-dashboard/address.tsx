"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Address = () => {
  return (
    <div className="space-y-10 max-w-xl mx-auto bg-white rounded-lg px-6 py-3">

      {/* Billing Address */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Billing Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2" htmlFor="billingFullName">Full Name</Label>
            <Input id="billingFullName" placeholder="John Doe" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="billingPhone">Phone</Label>
            <Input id="billingPhone" placeholder="+1234567890" />
          </div>
          <div className="col-span-2">
            <Label className="mb-2" htmlFor="billingAddress">Street Address</Label>
            <Input id="billingAddress" placeholder="123 Billing St" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="billingCity">City</Label>
            <Input id="billingCity" placeholder="City" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="billingZip">ZIP Code</Label>
            <Input id="billingZip" placeholder="12345" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Shipping Address */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2" htmlFor="shippingFullName">Full Name</Label>
            <Input id="shippingFullName" placeholder="Jane Doe" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="shippingPhone">Phone</Label>
            <Input id="shippingPhone" placeholder="+1234567890" />
          </div>
          <div className="col-span-2">
            <Label className="mb-2" htmlFor="shippingAddress">Street Address</Label>
            <Input id="shippingAddress" placeholder="456 Shipping Rd" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="shippingCity">City</Label>
            <Input id="shippingCity" placeholder="City" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="shippingZip">ZIP Code</Label>
            <Input id="shippingZip" placeholder="67890" />
          </div>
        </div>
      </section>

      <Separator />

      <div className="text-right">
        <Button>Save Addresses</Button>
      </div>
    </div>
  )
}


export default Address