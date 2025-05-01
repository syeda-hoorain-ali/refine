
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const CardDetails = () => {
  return (
    <div className="space-y-8 max-w-md mx-auto bg-white rounded-lg px-6 py-3">

      <h2 className="text-lg font-semibold">Payment Method</h2>

      <div className="space-y-4">
        <div>
          <Label className="mb-2" htmlFor="cardName">Cardholder Name</Label>
          <Input id="cardName" placeholder="John Doe" />
        </div>

        <div>
          <Label className="mb-2" htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2" htmlFor="expiry">Expiration Date</Label>
            <Input id="expiry" placeholder="MM/YY" />
          </div>
          <div>
            <Label className="mb-2" htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="123" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-right">
        <Button>Save Card</Button>
      </div>
    </div>
  )
}

export default CardDetails
