import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo.png";
interface NavbarProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const translations = {
    fr: { home: "Accueil", gallery: "Galerie", routes: "Parcours", map: "Plan", scan: "Scanner QR" },
    en: { home: "Home", gallery: "Gallery", routes: "Routes", map: "Map", scan: "Scan QR" },
    wo: { home: "Kër", gallery: "Nataal", routes: "Yoon", map: "Karte", scan: "Scan QR" },
  };

  const t = translations[currentLang as keyof typeof translations];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-warm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
         {/* Logo */}
       <Link to="/" className="flex items-center gap-2 group">
        <div className="w-14 h-14 rounded-lg flex items-center justify-center shadow-warm overflow-hidden">
          <img
            src={logo}
            alt="MCN Explorer"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
          MCN ACCESS
        </span>
      </Link>



          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              {t.home}
            </Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">
              {t.gallery}
            </Link>
            <Link to="/routes" className="text-foreground hover:text-primary transition-colors">
              {t.routes}
            </Link>
            <Link to="/map" className="text-foreground hover:text-primary transition-colors">
              {t.map}
            </Link>
            
            {/* Language Selector */}
            <Select value={currentLang} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[100px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="wo">Wolof</SelectItem>
              </SelectContent>
            </Select>

            <Link to="/qr-scanner">
              <Button variant="default" size="sm" className="gap-2">
                <QrCode className="w-4 h-4" />
                {t.scan}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link 
              to="/" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.home}
            </Link>
            <Link 
              to="/gallery" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.gallery}
            </Link>
            <Link 
              to="/routes" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.routes}
            </Link>
            <Link 
              to="/map" 
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.map}
            </Link>
            
            <Select value={currentLang} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="wo">Wolof</SelectItem>
              </SelectContent>
            </Select>

            <Link to="/qr-scanner" className="w-full">
              <Button variant="default" size="sm" className="w-full gap-2">
                <QrCode className="w-4 h-4" />
                {t.scan}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
