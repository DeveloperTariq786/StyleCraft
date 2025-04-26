import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CollectionHighlight = () => {
  return (
    <section className="py-16 px-4 bg-accent">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">The Summer Collection</h2>
            <p className="text-gray-700 mb-6">
              Introducing our summer collection - a celebration of light fabrics, vibrant embroidery, and effortless silhouettes. 
              Each piece is meticulously crafted to embody the spirit of warm days while maintaining our signature elegance.
            </p>
            <p className="text-gray-700 mb-8">
              Experience the perfect blend of traditional craftsmanship and contemporary design sensibilities.
            </p>
            <Link href="/collections/summer">
              <Button className="bg-gray-800 text-white hover:bg-primary transition duration-300">
                Explore Collection
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop" 
              alt="Summer Collection" 
              className="w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 shadow-lg w-32 h-32 flex flex-col items-center justify-center">
              <span className="font-serif text-xl text-primary">{new Date().getFullYear()}</span>
              <span className="uppercase text-xs tracking-widest text-gray-800">Summer</span>
              <span className="uppercase text-xs tracking-widest text-gray-800">Collection</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHighlight;
