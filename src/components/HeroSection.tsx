import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, MapPin, Utensils, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const HeroSection = ({ onSearch, isLoading }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const popularSearches = [
    { icon: MapPin, label: "Paris, France" },
    { icon: Camera, label: "Bali, Indonesia" },
    { icon: Utensils, label: "Tokyo, Japan" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            Discover Your Next{" "}
            <span className="text-gradient">Adventure</span>
            <br />
            with AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Let our AI-powered travel assistant help you find the best tourist spots, 
            hidden gems, and authentic local cuisine anywhere in the world.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-card rounded-2xl shadow-elevated border border-border/50">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Where do you want to explore?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 h-12 bg-transparent border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                variant="hero"
                size="lg"
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="min-w-[180px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Exploring...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Find Best Spots
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularSearches.map((item, index) => (
              <Button
                key={index}
                variant="glass"
                size="sm"
                onClick={() => {
                  setSearchQuery(item.label);
                  onSearch(item.label);
                }}
                className="gap-2"
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
