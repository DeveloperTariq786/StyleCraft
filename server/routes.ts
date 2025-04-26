import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API routes
  
  // Products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      console.log("Query params:", req.query); // Debug log
      
      const {
        category,
        collection,
        search,
        featured,
        new: isNew,
        bestseller,
        sale: onSale,
        minPrice,
        maxPrice,
        sort,
        limit,
        offset,
        type,
        color,
        size
      } = req.query;
      
      // Convert true/false strings to actual booleans
      // And handle undefined values properly
      const options: any = {};
      
      if (category) options.category = category as string;
      if (collection) options.collection = collection as string;
      if (search) options.search = search as string;
      
      // Boolean flags
      if (featured !== undefined) options.featured = featured === "true";
      if (isNew !== undefined) options.new = isNew === "true";
      if (bestseller !== undefined) options.bestseller = bestseller === "true";
      if (onSale !== undefined) options.onSale = onSale === "true";
      
      // Numeric values
      if (minPrice !== undefined) options.minPrice = parseInt(minPrice as string);
      if (maxPrice !== undefined) options.maxPrice = parseInt(maxPrice as string);
      
      // Sorting and pagination
      if (sort) options.sort = sort as string;
      if (limit) options.limit = parseInt(limit as string);
      if (offset) options.offset = parseInt(offset as string);
      
      console.log("Fetching products with options:", options); // Debug log
      
      const products = await storage.getProducts(options);
      console.log(`Found ${products.length} products`); // Debug log
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/related/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit as string) : 4;
      
      const relatedProducts = await storage.getRelatedProducts(id, limitNum);
      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  app.get("/api/products/search/:query", async (req: Request, res: Response) => {
    try {
      const query = req.params.query;
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ message: "Search query must be at least 2 characters" });
      }
      
      const products = await storage.getProducts({ search: query });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  // Collections
  app.get("/api/collections", async (_req: Request, res: Response) => {
    try {
      const collections = await storage.getCollections({ active: true });
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  app.get("/api/collections/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const collection = await storage.getCollectionBySlug(slug);
      
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }
      
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email is already subscribed
      const isSubscribed = await storage.isEmailSubscribed(validatedData.email);
      if (isSubscribed) {
        return res.status(400).json({ message: "Email is already subscribed" });
      }
      
      const subscription = await storage.addNewsletterSubscription(validatedData);
      res.status(201).json({ message: "Subscription successful", subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactFormSchema.parse(req.body);
      const contactForm = await storage.submitContactForm(validatedData);
      res.status(201).json({ message: "Form submitted successfully", contactForm });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  return httpServer;
}
