import { motion } from "framer-motion";
import { MapPin, Clock, Star, Sparkles } from "lucide-react";

interface TouristSpot {
  name: string;
  description: string;
  bestTime: string;
  rating?: number;
}

interface TouristSpotsProps {
  spots: TouristSpot[];
  isLoading: boolean;
  searchedLocation: string;
}

const LoadingCard = () => (
  <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-pulse">
    <div className="h-40 bg-muted rounded-xl mb-4" />
    <div className="h-6 bg-muted rounded-lg w-3/4 mb-3" />
    <div className="h-4 bg-muted rounded-lg w-full mb-2" />
    <div className="h-4 bg-muted rounded-lg w-2/3" />
  </div>
);

export const TouristSpots = ({ spots, isLoading, searchedLocation }: TouristSpotsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!searchedLocation && spots.length === 0) {
    return null;
  }

  return (
    <section id="explore" className="py-20 relative">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Tourist Attractions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {searchedLocation ? (
              <>
                Best Places to Visit in{" "}
                <span className="text-gradient">{searchedLocation}</span>
              </>
            ) : (
              "Discover Amazing Places"
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-curated tourist attractions based on popularity, reviews, and local insights
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {/* Spots Grid */}
        {!isLoading && spots.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {spots.map((spot, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
              >
                {/* Card Image Placeholder */}
                <div className="h-48 bg-gradient-hero relative overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary" />
                      AI Recommended
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
                      {spot.name}
                    </h3>
                    {spot.rating && (
                      <div className="flex items-center gap-1 text-accent">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{spot.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {spot.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Best Time:</span>
                    <span>{spot.bestTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && spots.length === 0 && searchedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">No spots found</h3>
            <p className="text-muted-foreground">Try searching for a different location</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
