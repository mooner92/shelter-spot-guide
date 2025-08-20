import { MapPin, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";

/**
 * Header component for the Heat Shelter Finder
 * Provides navigation, search functionality, and user access
 */
const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">Heat Shelter Finder</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Find Cool Relief Near You</span>
          </div>
        </Link>

        {/* Search Bar - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <Input
            type="search"
            placeholder="Search shelters by name or address..."
            className="w-full"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          <Button
            variant={location.pathname === "/" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/">Home</Link>
          </Button>
          <Button
            variant={location.pathname === "/shelters" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/shelters">Shelters</Link>
          </Button>
          <Button
            variant={location.pathname === "/about" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/about">About</Link>
          </Button>
          
          {/* User Menu */}
          <Button variant="ghost" size="sm" className="ml-2">
            <User className="w-4 h-4" />
          </Button>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <Input
          type="search"
          placeholder="Search shelters..."
          className="w-full"
        />
      </div>
    </header>
  );
};

export default Header;