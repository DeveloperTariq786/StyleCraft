import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PromoBanner = () => {
  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1619785292559-a15796a8c5ba?q=80&w=2069&auto=format&fit=crop" 
          alt="Global Shipping" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container mx-auto relative z-10 text-white text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl mb-4"
        >
          Delivering your finest finds outside India?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
        >
          Our global shipping ensures your favorite pieces reach you anywhere in the world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/international">
            <Button className="bg-white text-gray-800 hover:bg-primary hover:text-white transition duration-300">
              Browse International Store
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
