import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transform transition-transform group-hover:scale-110">
              <Hand className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sign-ify
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={isActive("/") ? "default" : "ghost"} 
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button 
              variant={isActive("/about") ? "default" : "ghost"} 
              asChild
            >
              <Link to="/about">About</Link>
            </Button>
            <Button 
              variant={isActive("/help") ? "default" : "ghost"} 
              asChild
            >
              <Link to="/help">Help</Link>
            </Button>
            <Button 
              variant={isActive("/settings") ? "default" : "ghost"} 
              asChild
            >
              <Link to="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
