import { motion } from "framer-motion";
import { Compass, Mail, MapPin, Phone, Github, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.a
              href="#home"
              className="flex items-center gap-2 text-xl font-display font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-gradient">WanderAI</span>
            </motion.a>
            <p className="text-muted-foreground text-sm mb-6">
              Your AI-powered travel companion for discovering amazing destinations worldwide.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Github].map((Icon, index) => (
                <Button key={index} variant="glass" size="icon" className="rounded-full">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Explore", "Food", "AI Assistant", "About"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                San Francisco, CA
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                hello@wanderai.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +1 (555) 123-4567
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get travel tips and destination updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 h-10 text-sm"
              />
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 WanderAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
