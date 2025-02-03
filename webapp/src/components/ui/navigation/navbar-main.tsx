'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { typographyScale } from "@/components/ui/utils";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "./navbar";

export function MainNavbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Navbar fixed>
        <NavbarContent className="flex w-full justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button - always first */}
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className={cn(
                  "inline-flex items-center justify-center rounded-md p-2.5",
                  "text-foreground hover:bg-accent hover:text-foreground/80",
                  "min-h-[44px] min-w-[44px]", // Mobile touch target
                  "active:opacity-80" // Mobile tap state
                )}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo - always visible */}
            <NavbarBrand>
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">FuelCare</span>
              </Link>
            </NavbarBrand>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated && (
                <>
                  <NavbarItem>
                    <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                      Dashboard
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/vehicles" className="transition-colors hover:text-foreground/80">
                      Vehicles
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/categories" className="transition-colors hover:text-foreground/80">
                      Categories
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/fuel-types" className="transition-colors hover:text-foreground/80">
                      Fuel Types
                    </Link>
                  </NavbarItem>
                </>
              )}
            </div>
          </div>

          {/* Right side menu */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <NavbarItem>
                <Link
                  href="/login"
                  className="transition-colors hover:text-foreground/80"
                >
                  Sign In
                </Link>
              </NavbarItem>
            )}
          </div>
        </NavbarContent>
      </Navbar>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[56px] z-40 border-b bg-background/80 backdrop-blur-lg md:hidden">
          <div className="container px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      typographyScale.base.mobile,
                      "transition-colors hover:text-foreground/80",
                      "min-h-[44px] flex items-center" // Mobile touch target
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/vehicles"
                    className={cn(
                      typographyScale.base.mobile,
                      "transition-colors hover:text-foreground/80",
                      "min-h-[44px] flex items-center" // Mobile touch target
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vehicles
                  </Link>
                  <Link
                    href="/categories"
                    className={cn(
                      typographyScale.base.mobile,
                      "transition-colors hover:text-foreground/80",
                      "min-h-[44px] flex items-center" // Mobile touch target
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/fuel-types"
                    className={cn(
                      typographyScale.base.mobile,
                      "transition-colors hover:text-foreground/80",
                      "min-h-[44px] flex items-center" // Mobile touch target
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Fuel Types
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
} 