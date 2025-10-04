import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { Cloud, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-background/80 animate-slide-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 cursor-pointer transition-all">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CloudCalc</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" data-testid="link-nav-home">
            <Button 
              variant={location === "/" ? "secondary" : "ghost"}
              className="font-medium transition-all"
            >
              Home
            </Button>
          </Link>
          <Link href="/calculator" data-testid="link-nav-calculator">
            <Button 
              variant={location === "/calculator" ? "secondary" : "ghost"}
              className="font-medium transition-all"
            >
              Calculator
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu and Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Mobile Navigation Sheet */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant={location === "/" ? "secondary" : "ghost"}
                    className="w-full justify-start transition-all"
                    data-testid="link-mobile-home"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/calculator" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant={location === "/calculator" ? "secondary" : "ghost"}
                    className="w-full justify-start transition-all"
                    data-testid="link-mobile-calculator"
                  >
                    Calculator
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
