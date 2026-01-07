import { motion } from "framer-motion";
import { Utensils, MapPin, Star, Flame } from "lucide-react";

interface FoodPlace {
  name: string;
  description: string;
  specialty: string;
  type: string;
}

interface FoodSectionProps {
  places: FoodPlace[];
  isLoading: boolean;
  searchedLocation: string;
}

const LoadingCard = () => (
  <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-pulse">
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-muted rounded-xl" />
      <div className="flex-1">
        <div className="h-5 bg-muted rounded-lg w-3/4 mb-3" />
        <div className="h-4 bg-muted rounded-lg w-full mb-2" />
        <div className="h-4 bg-muted rounded-lg w-2/3" />
      </div>
    </div>
  </div>
);

export const FoodSection = ({ places, isLoading, searchedLocation }: FoodSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  if (!searchedLocation && places.length === 0) {
    return null;
  }

  return (
    <section id="food" className="py-20 bg-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent-foreground text-sm font-medium mb-4">
            <Utensils className="w-4 h-4" />
            Local Cuisine
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {searchedLocation ? (
              <>
                Famous Food in{" "}
                <span className="text-gradient">{searchedLocation}</span>
              </>
            ) : (
              "Taste the Local Flavors"
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most delicious local dishes and restaurants recommended by AI
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {/* Food Places Grid */}
        {!isLoading && places.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {places.map((place, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group bg-card rounded-2xl p-5 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 flex gap-4"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors truncate">
                      {place.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full flex-shrink-0">
                      {place.type}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {place.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">Must Try:</span>
                    <span className="text-muted-foreground truncate">{place.specialty}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && places.length === 0 && searchedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">No food places found</h3>
            <p className="text-muted-foreground">Try searching for a different location</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
