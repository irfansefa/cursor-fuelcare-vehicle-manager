'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi"

import { Button } from "@/components/ui/button/button"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navigation/navbar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/navigation/tabs"
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/navigation/breadcrumbs"

export default function NavigationShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Navigation Components</h1>

      {/* Navbar Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Navbar</h2>
        <div className="space-y-8 relative">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Navbar</h3>
            <div className="relative border rounded-lg overflow-hidden">
              <Navbar
                brand={
                  <NavbarBrand>
                    <FiHome className="h-6 w-6" />
                    <span className="text-xl font-bold">Brand</span>
                  </NavbarBrand>
                }
              >
                <NavbarContent>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      Home
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      About
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      Contact
                    </Link>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Primary Navbar</h3>
            <div className="relative border rounded-lg overflow-hidden">
              <Navbar
                variant="primary"
                brand={
                  <NavbarBrand>
                    <FiHome className="h-6 w-6" />
                    <span className="text-xl font-bold">Brand</span>
                  </NavbarBrand>
                }
              >
                <NavbarContent>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      Home
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      About
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="#" className="text-sm font-medium">
                      Contact
                    </Link>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Tabs</h3>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings...</TabsContent>
              <TabsContent value="password">Password settings...</TabsContent>
              <TabsContent value="settings">Other settings...</TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pills Variant</h3>
            <Tabs defaultValue="account">
              <TabsList variant="pills">
                <TabsTrigger value="account" variant="pills">Account</TabsTrigger>
                <TabsTrigger value="password" variant="pills">Password</TabsTrigger>
                <TabsTrigger value="settings" variant="pills">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings...</TabsContent>
              <TabsContent value="password">Password settings...</TabsContent>
              <TabsContent value="settings">Other settings...</TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Underline Variant</h3>
            <Tabs defaultValue="account">
              <TabsList variant="underline">
                <TabsTrigger value="account" variant="underline">Account</TabsTrigger>
                <TabsTrigger value="password" variant="underline">Password</TabsTrigger>
                <TabsTrigger value="settings" variant="underline">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings...</TabsContent>
              <TabsContent value="password">Password settings...</TabsContent>
              <TabsContent value="settings">Other settings...</TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Breadcrumbs</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Breadcrumbs</h3>
            <Breadcrumbs>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Category</BreadcrumbPage>
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Navbar Example
<Navbar
  brand={
    <NavbarBrand>
      <FiHome className="h-6 w-6" />
      <span className="text-xl font-bold">Brand</span>
    </NavbarBrand>
  }
>
  <NavbarContent>
    <NavbarItem>
      <Link href="#">Home</Link>
    </NavbarItem>
  </NavbarContent>
</Navbar>

// Tabs Example
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings...</TabsContent>
  <TabsContent value="password">Password settings...</TabsContent>
</Tabs>

// Breadcrumbs Example
<Breadcrumbs>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbPage>Current</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumbs>`}
        </pre>
      </div>
    </div>
  )
} 