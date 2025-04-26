import { motion } from "framer-motion";

interface InstagramPost {
  id: string;
  image: string;
  link: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?q=80&w=1974&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1603217040863-602c900e3f91?q=80&w=1974&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1520367745676-56196632073f?q=80&w=1974&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?q=80&w=1973&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1566958769772-82c9e951b31e?q=80&w=1974&auto=format&fit=crop",
    link: "https://instagram.com"
  }
];

const InstagramFeed = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl text-center mb-4"
        >
          @EleganteStyle
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Follow us on Instagram for styling inspiration and behind-the-scenes glimpses.
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img 
                src={post.image} 
                alt="Instagram post" 
                className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <i className="fab fa-instagram text-white text-2xl"></i>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
