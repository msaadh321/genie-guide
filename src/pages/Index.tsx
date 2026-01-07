import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TouristSpots } from "@/components/TouristSpots";
import { FoodSection } from "@/components/FoodSection";
import { AIChat } from "@/components/AIChat";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

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

// Mock AI response function - Replace with actual Gemini API integration
const mockAIResponse = async (query: string): Promise<{
  spots: TouristSpot[];
  food: FoodPlace[];
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate mock data based on query
  const location = query.toLowerCase();

  const spots: TouristSpot[] = [
    {
      name: `${query} Central Park`,
      description: `A beautiful urban oasis in the heart of ${query}, perfect for morning walks, picnics, and enjoying nature. Features stunning gardens and scenic trails.`,
      bestTime: "Morning, Spring",
      rating: 4.8,
    },
    {
      name: `${query} Historic District`,
      description: `Explore centuries of history through well-preserved architecture, museums, and cultural landmarks. A must-visit for history enthusiasts.`,
      bestTime: "Afternoon, Autumn",
      rating: 4.7,
    },
    {
      name: `${query} Mountain Viewpoint`,
      description: `Breathtaking panoramic views of the entire region. Popular for sunset watching and photography. Features hiking trails for all skill levels.`,
      bestTime: "Sunset, Summer",
      rating: 4.9,
    },
  ];

  const food: FoodPlace[] = [
    {
      name: `${query} Traditional Kitchen`,
      description: `Authentic local cuisine passed down through generations. Known for warm hospitality and traditional cooking methods.`,
      specialty: "Regional Specialties",
      type: "Traditional",
    },
    {
      name: `The ${query} Spice Garden`,
      description: `Award-winning restaurant featuring local ingredients and modern interpretations of classic dishes.`,
      specialty: "Fusion Cuisine",
      type: "Fine Dining",
    },
    {
      name: `Street Food Market ${query}`,
      description: `Vibrant food market offering dozens of local street food vendors. Perfect for adventurous eaters.`,
      specialty: "Street Food Variety",
      type: "Casual",
    },
    {
      name: `${query} Cafe & Bakery`,
      description: `Cozy cafe known for freshly baked goods and local coffee specialties. Great for breakfast or afternoon tea.`,
      specialty: "Fresh Pastries",
      type: "Cafe",
    },
  ];

  return { spots, food };
};

const mockChatResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowercaseMsg = message.toLowerCase();

  if (lowercaseMsg.includes("swat")) {
    return `Swat Valley in Pakistan is absolutely stunning! Here are my top recommendations:

🏔️ **Must-Visit Places:**
• Malam Jabba - Famous ski resort with breathtaking views
• Fizagat Park - Beautiful riverside park perfect for picnics
• Mingora - The main city with bazaars and local culture
• Swat Museum - Houses Buddhist artifacts and Gandhara art

🌸 **Best Time to Visit:** April to October for pleasant weather. Spring (April-May) for cherry blossoms!

💡 **Pro Tips:**
• Try the local trout fish - it's famous in Swat
• Hire a local guide for trekking
• Visit early morning for the best mountain views`;
  }

  if (lowercaseMsg.includes("lahore") && lowercaseMsg.includes("food")) {
    return `Lahore is the food capital of Pakistan! Here's your culinary guide:

🍗 **Must-Try Dishes:**
• Lahori Fried Fish - Crispy, spicy, and unforgettable
• Paya - Traditional breakfast of slow-cooked trotters
• Nihari - Rich, slow-cooked beef stew
• Falooda - Sweet rose-flavored dessert drink

📍 **Best Food Streets:**
• Gawalmandi Food Street - The legendary late-night spot
• Anarkali Bazaar - Historic and authentic
• MM Alam Road - Modern cafes and restaurants

⏰ **Pro Tip:** Lahore comes alive at night - the best food experiences are after 10 PM!`;
  }

  if (lowercaseMsg.includes("istanbul")) {
    return `Istanbul is where East meets West! Here are hidden gems most tourists miss:

🌟 **Off-the-Beaten-Path:**
• Balat District - Colorful streets and vintage shops
• Pierre Loti Hill - Sunset views with Turkish tea
• Fener Greek Neighborhood - Historic Orthodox heritage
• Kadıköy Market - Asian side's best food scene

🕌 **Beyond the Famous Mosques:**
• Chora Church - Stunning Byzantine mosaics
• Süleymaniye Mosque - Less crowded, equally beautiful
• Rüstem Pasha Mosque - Hidden gem with incredible tiles

🚢 **Local Experience:** Take the local ferry to Princes' Islands for a car-free day trip!`;
  }

  return `Great question about "${message}"! Here's what I know:

🌍 **Travel Tips:**
• Research local customs and etiquette before visiting
• Try to learn a few basic phrases in the local language
• Book accommodations in advance during peak seasons
• Always have local currency for small purchases

📱 **Useful Apps:**
• Google Maps for navigation
• Google Translate for communication
• Local ride-sharing apps

💡 **Pro Tip:** Connect with locals through community apps or tours for authentic experiences. They often know the best hidden spots!

Would you like more specific information about any destination?`;
};

const Index = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchedLocation(query);

    try {
      const { spots, food } = await mockAIResponse(query);
      setTouristSpots(spots);
      setFoodPlaces(food);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    return await mockChatResponse(message);
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
