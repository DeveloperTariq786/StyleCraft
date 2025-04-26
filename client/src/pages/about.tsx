import { useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Newsletter from "@/components/home/Newsletter";

const About = () => {
  useEffect(() => {
    document.title = "About Us - Elegante";
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1595292596892-1b9466facb2e?q=80&w=2070&auto=format&fit=crop" 
            alt="About Elegante" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-3xl mx-auto"
          >
            Elegante celebrates the rich heritage of Indian craftsmanship with contemporary design sensibilities.
          </motion.p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">The Elegante Journey</h2>
            <p className="text-gray-600">Founded in 2010, our journey began with a simple yet profound vision.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-700 mb-4">
                At Elegante, we believe that clothing is more than just fabric – it's an expression of heritage, artistry, and individual style. Our journey began with a passion for preserving traditional craftsmanship while embracing contemporary design.
              </p>
              <p className="text-gray-700 mb-4">
                Each Elegante piece tells a story of skilled artisans who have honed their craft over generations, working meticulously to create garments that stand the test of time in both quality and style.
              </p>
              <p className="text-gray-700">
                We source the finest materials from across India and work closely with artisan communities to create collections that honor traditional techniques while appealing to the modern aesthetic.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop" 
                alt="Our Journey" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do, from design to customer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-gem text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Artisanal Excellence</h3>
              <p className="text-gray-600">
                We honor the skill and dedication of artisans by maintaining the highest standards of craftsmanship in every piece we create.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-leaf text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Sustainable Practices</h3>
              <p className="text-gray-600">
                We're committed to minimizing our environmental impact through responsible sourcing, ethical production, and thoughtful design.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-heart text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-medium mb-3">Community Connection</h3>
              <p className="text-gray-600">
                We believe in fostering meaningful relationships with the artisan communities we work with and the customers we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Artisans */}
      <section id="artisans" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">The Artisans</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The skilled hands and creative minds behind every Elegante creation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <img 
                src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?q=80&w=2070&auto=format&fit=crop" 
                alt="Master Embroiderer" 
                className="w-full md:w-1/2 h-auto rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-medium mb-3">Master Embroiderers</h3>
                <p className="text-gray-600 mb-4">
                  Our embroidery artisans bring designs to life with intricate threadwork, each stitch placed with precision and care. Many have learned their craft over decades, passing down techniques through generations.
                </p>
                <p className="text-gray-600">
                  Working with both traditional and innovative methods, they create stunning patterns that make each Elegante piece uniquely special.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6"
            >
              <img 
                src="https://images.unsplash.com/photo-1594700889001-3c93415e51aa?q=80&w=1974&auto=format&fit=crop" 
                alt="Textile Experts" 
                className="w-full md:w-1/2 h-auto rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-medium mb-3">Textile Experts</h3>
                <p className="text-gray-600 mb-4">
                  Our textile specialists select and develop fabrics that meet our exacting standards for quality, comfort, and sustainability. They work with natural fibers and traditional weaving communities to create materials that are both luxurious and durable.
                </p>
                <p className="text-gray-600">
                  Their expertise ensures that each Elegante garment not only looks beautiful but feels wonderful to wear.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Our Commitment to Sustainability</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Creating beautiful clothing with respect for people and planet.
            </p>
          </motion.div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-4">Our Approach</h3>
                <p className="text-gray-600 mb-4">
                  Sustainability isn't just a buzzword at Elegante – it's woven into the fabric of everything we do. We believe that luxury fashion can and should be created with respect for both people and the planet.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Natural, biodegradable materials sourced responsibly</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Zero-waste pattern cutting to minimize fabric waste</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Fair wages and safe working conditions for all artisans</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Plastic-free packaging made from recycled materials</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sustainable Practices" 
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals who bring the Elegante vision to life every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1974&auto=format&fit=crop" 
                  alt="Creative Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Priya Sharma</h3>
              <p className="text-gray-500">Creative Director</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?q=80&w=1972&auto=format&fit=crop" 
                  alt="Chief Designer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Rohan Kapoor</h3>
              <p className="text-gray-500">Chief Designer</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                  alt="Artisan Coordinator" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Vikram Singh</h3>
              <p className="text-gray-500">Artisan Coordinator</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Key milestones in the Elegante story.
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl font-medium text-primary">2010</span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">The Beginning</h3>
                <p className="text-gray-600">
                  Elegante was founded with a small collection of handcrafted pieces, showcasing traditional embroidery techniques in contemporary silhouettes.
                </p>
              </div>
            </motion.div>

            <Separator />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl font-medium text-primary">2015</span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">Expanding Horizons</h3>
                <p className="text-gray-600">
                  Opened our flagship store in Delhi and launched our first international collection, bringing Indian craftsmanship to a global audience.
                </p>
              </div>
            </motion.div>

            <Separator />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl font-medium text-primary">2018</span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">Artisan Initiative</h3>
                <p className="text-gray-600">
                  Launched the Elegante Artisan Initiative, a program dedicated to preserving traditional crafts by providing training, resources, and fair employment opportunities.
                </p>
              </div>
            </motion.div>

            <Separator />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl font-medium text-primary">2022</span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">Sustainability Commitment</h3>
                <p className="text-gray-600">
                  Implemented our comprehensive sustainability framework, transitioning to 100% natural or recycled materials and plastic-free packaging.
                </p>
              </div>
            </motion.div>

            <Separator />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 mb-4 md:mb-0">
                <span className="text-xl font-medium text-primary">Today</span>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">Looking Forward</h3>
                <p className="text-gray-600">
                  Continuing to grow our global presence while staying true to our founding principles of artisanal excellence, sustainability, and community connection.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default About;
