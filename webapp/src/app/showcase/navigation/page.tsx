'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FiSettings, FiUser, FiCreditCard, FiLogOut, FiChevronDown, FiHome } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navigation/navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/navigation/tabs";
import { Breadcrumbs, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/navigation/breadcrumbs";

export default function NavigationShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Navigation Components</h1>
        <p className="text-muted-foreground">
          Components for building navigation and menus in your application.
        </p>
      </div>

      {/* Dropdown Menu Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Dropdown Menu</h2>
          <p className="text-muted-foreground mb-6">
            Dropdown menus display a list of actions or options that users can choose from.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Options <FiChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <FiUser size={16} />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiCreditCard size={16} />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiSettings size={16} />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <FiLogOut size={16} />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Navbar</h2>
          <p className="text-muted-foreground mb-6">
            Navigation bars provide consistent navigation across your application.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default Navbar</h3>
            <div className="border rounded-lg overflow-hidden">
              <Navbar>
                <NavbarBrand>
                  <FiHome size={24} />
                  <span className="ml-2 text-xl font-bold">Brand</span>
                </NavbarBrand>
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
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Tabs</h2>
          <p className="text-muted-foreground mb-6">
            Tabs organize content into different views that users can switch between.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default Tabs</h3>
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
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Breadcrumbs</h2>
          <p className="text-muted-foreground mb-6">
            Breadcrumbs help users understand their current location in the application.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default Breadcrumbs</h3>
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
    </div>
  );
} 