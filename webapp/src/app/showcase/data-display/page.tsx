'use client';

import React from 'react';
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/data-display/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import { cn } from "@/lib/utils";

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
];

export default function DataDisplayShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Data Display Components</h1>
        <p className="text-muted-foreground">
          Components for displaying various types of data and content.
        </p>
      </div>

      {/* Avatar Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Avatar</h2>
          <p className="text-muted-foreground mb-6">
            Avatars are used to represent users or entities. They can display images,
            initials, or fallback icons.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">With Image</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">With Initials</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Cards</h2>
          <p className="text-muted-foreground mb-6">
            Cards are used to group and display content in a way that is easily readable.
          </p>
        </div>

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
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tables Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Tables</h2>
          <p className="text-muted-foreground mb-6">
            Tables are used to organize and display data in a structured format.
          </p>
        </div>

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
    </div>
  );
} 