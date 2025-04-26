import { Link } from "wouter";
import { motion } from "framer-motion";

interface Category {
  title: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    title: "Women",
    image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1974&auto=format&fit=crop",
    link: "/products?category=women"
  },
  {
    title: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    link: "/products?category=men"
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=1974&auto=format&fit=crop",
    link: "/products?category=accessories"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl text-center mb-12"
        >
          Shop by Category
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.link} className="group relative overflow-hidden block">
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={`${category.title} Collection`} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-white text-2xl font-serif mb-2">{category.title}</h3>
                      <span className="inline-block bg-white/80 text-gray-800 px-4 py-2 text-sm uppercase tracking-wider group-hover:bg-primary group-hover:text-white transition duration-300">
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
