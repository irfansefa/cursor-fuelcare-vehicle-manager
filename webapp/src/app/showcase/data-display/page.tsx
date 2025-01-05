'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiTrash2, FiMoreVertical } from "react-icons/fi"

import { Button } from "@/components/ui/button/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table"
import { cn } from "@/lib/utils"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
]

export default function DataDisplayShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Data Display</h1>

      {/* Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Overview of your account status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-medium">$2,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Type</span>
                  <span className="font-medium">Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">View Details</Button>
              <Button>Manage Account</Button>
            </CardFooter>
          </Card>

          {/* Interactive Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Transaction #{item}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FiMoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your monthly performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold">89%</p>
                  <p className="text-xs text-muted-foreground">
                    Success Rate
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">12k</p>
                  <p className="text-xs text-muted-foreground">
                    Total Views
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">$4.2k</p>
                  <p className="text-xs text-muted-foreground">
                    Revenue
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">+18%</p>
                  <p className="text-xs text-muted-foreground">
                    Growth
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tables Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tables</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          {
                            "bg-green-100 text-green-800": invoice.paymentStatus === "Paid",
                            "bg-yellow-100 text-yellow-800": invoice.paymentStatus === "Pending",
                            "bg-red-100 text-red-800": invoice.paymentStatus === "Unpaid",
                          }
                        )}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Card Example
<Card>
  <CardHeader>
    <CardTitle>Account Summary</CardTitle>
    <CardDescription>Overview of your account status</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Balance</span>
        <span>$2,500.00</span>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button>Manage Account</Button>
  </CardFooter>
</Card>

// Table Example
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        </pre>
      </div>
    </div>
  )
} 