"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const Orders = () => {
  const orders = [
    {
      id: "#ORD1234",
      date: "2025-04-28",
      status: "Shipped",
      total: "$129.99",
    },
    {
      id: "#ORD1235",
      date: "2025-04-25",
      status: "Processing",
      total: "$89.50",
    },
    {
      id: "#ORD1236",
      date: "2025-04-20",
      status: "Delivered",
      total: "$249.00",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg px-6 py-3">
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{order.status}</Badge>
              </TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Orders
