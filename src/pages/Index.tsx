import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TouristSpots } from "@/components/TouristSpots";
import { FoodSection } from "@/components/FoodSection";
import { AIChat } from "@/components/AIChat";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TouristSpot {
  name: string;
  description: string;
  bestTime: string;
  rating?: number;
}

interface FoodPlace {
  name: string;
  description: string;
  specialty: string;
  type: string;
}

const Index = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchedLocation(query);

    try {
      const { data, error } = await supabase.functions.invoke('travel-ai', {
        body: { type: 'search', query }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setTouristSpots(data.spots || []);
      setFoodPlaces(data.food || []);

      if (data.spots?.length === 0 && data.food?.length === 0) {
        toast({
          title: "No results found",
          description: "Try searching for a different location.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch recommendations",
        variant: "destructive",
      });
      setTouristSpots([]);
      setFoodPlaces([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('travel-ai', {
        body: { type: 'chat', message }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data.response || "I apologize, I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Chat error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("429") || error.message.includes("rate limit")) {
          return "I'm receiving too many requests right now. Please wait a moment and try again.";
        }
        if (error.message.includes("402") || error.message.includes("credits")) {
          return "AI usage limit reached. Please contact the site administrator.";
        }
      }
      
      return "I encountered an error while processing your request. Please try again.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onSearch={handleSearch} isLoading={isLoading} />
      <TouristSpots
        spots={touristSpots}
        isLoading={isLoading}
        searchedLocation={searchedLocation}
      />
      <FoodSection
        places={foodPlaces}
        isLoading={isLoading}
        searchedLocation={searchedLocation}
      />
      <AIChat onSendMessage={handleChatMessage} />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
