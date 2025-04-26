import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { Separator } from "@/components/ui/separator";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact Us - Elegante";
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616486701797-0f33f61038ec?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact Elegante" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
          >
            We'd love to hear from you. Reach out with any questions, feedback, or inquiries.
          </motion.p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Support</h3>
                  <p className="text-gray-600 mb-1">
                    <i className="fas fa-envelope mr-2 text-primary"></i> support@elegante.com
                  </p>
                  <p className="text-gray-600">
                    <i className="fas fa-phone-alt mr-2 text-primary"></i> +91 123 456 7890
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sales Inquiries</h3>
                  <p className="text-gray-600 mb-1">
                    <i className="fas fa-envelope mr-2 text-primary"></i> sales@elegante.com
                  </p>
                  <p className="text-gray-600">
                    <i className="fas fa-phone-alt mr-2 text-primary"></i> +91 123 456 7891
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Head Office</h3>
                  <p className="text-gray-600">
                    <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                    123 Fashion Street, <br />
                    Design District, <br />
                    New Delhi - 110001, <br />
                    India
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Monday to Friday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Sunday:</span> Closed
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="Facebook">
                      <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="https://instagram.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="Instagram">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="https://twitter.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="Twitter">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="https://pinterest.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="Pinterest">
                      <i className="fab fa-pinterest-p text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gray-800 hover:bg-primary transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Visit Our Stores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the Elegante collection in person at one of our flagship stores.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium mb-3">New Delhi</h3>
              <p className="text-gray-600 mb-4">
                123 Fashion Street, <br />
                Design District, <br />
                New Delhi - 110001
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Phone:</span> +91 123 456 7890
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Hours:</span> 10:00 AM - 8:00 PM (Daily)
              </p>
              <Button variant="outline" className="w-full">Get Directions</Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium mb-3">Mumbai</h3>
              <p className="text-gray-600 mb-4">
                456 Luxury Lane, <br />
                Bandra West, <br />
                Mumbai - 400050
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Phone:</span> +91 123 456 7891
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Hours:</span> 10:00 AM - 8:00 PM (Daily)
              </p>
              <Button variant="outline" className="w-full">Get Directions</Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium mb-3">Bangalore</h3>
              <p className="text-gray-600 mb-4">
                789 Style Street, <br />
                Indiranagar, <br />
                Bangalore - 560038
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Phone:</span> +91 123 456 7892
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Hours:</span> 10:00 AM - 8:00 PM (Daily)
              </p>
              <Button variant="outline" className="w-full">Get Directions</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium mb-2">What are your shipping timeframes?</h3>
              <p className="text-gray-600">
                Within India, standard shipping takes 3-5 business days. International shipping typically takes 7-14 business days, depending on the destination country. Express shipping options are available at checkout for faster delivery.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
              <p className="text-gray-600">
                We offer a 30-day return policy for all unused items with original tags attached. Custom-made items are not eligible for return unless there is a manufacturing defect. Please see our Returns page for detailed information on the process.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium mb-2">How should I care for my Elegante pieces?</h3>
              <p className="text-gray-600">
                Most of our pieces require gentle handling due to their intricate craftsmanship. We recommend dry cleaning for most items, particularly those with embellishments or delicate fabrics. Please refer to the care label on each garment for specific instructions.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium mb-2">Do you offer custom orders or alterations?</h3>
              <p className="text-gray-600">
                Yes, we offer both custom orders and alterations. For custom orders, please contact us directly to discuss your requirements. For alterations, we provide complementary basic alterations for purchases made in our physical stores. Online purchases can be altered at our stores for a nominal fee.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
