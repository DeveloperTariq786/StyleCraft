import { 
  User, InsertUser, 
  Product, InsertProduct,
  Collection, InsertCollection,
  NewsletterSubscription, InsertNewsletterSubscription,
  ContactForm, InsertContactForm
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(options?: {
    category?: string;
    collection?: string;
    search?: string;
    featured?: boolean;
    new?: boolean;
    bestseller?: boolean;
    onSale?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
    offset?: number;
  }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getRelatedProducts(id: number, limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Collection methods
  getCollections(options?: { seasonal?: boolean; active?: boolean }): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  updateCollection(id: number, collection: Partial<InsertCollection>): Promise<Collection | undefined>;
  deleteCollection(id: number): Promise<boolean>;
  
  // Newsletter methods
  addNewsletterSubscription(email: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  isEmailSubscribed(email: string): Promise<boolean>;
  
  // Contact form methods
  submitContactForm(form: InsertContactForm): Promise<ContactForm>;
  getContactForms(): Promise<ContactForm[]>;
  markContactFormAsRead(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private collections: Map<number, Collection>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private contactForms: Map<number, ContactForm>;
  
  private userId: number;
  private productId: number;
  private collectionId: number;
  private subscriptionId: number;
  private contactFormId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.collections = new Map();
    this.newsletterSubscriptions = new Map();
    this.contactForms = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.collectionId = 1;
    this.subscriptionId = 1;
    this.contactFormId = 1;
    
    // Initialize with some sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: false, 
      createdAt,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(options: {
    category?: string;
    collection?: string;
    search?: string;
    featured?: boolean;
    new?: boolean;
    bestseller?: boolean;
    onSale?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    // Apply filters
    if (options.category) {
      products = products.filter(p => p.category === options.category);
    }
    
    if (options.collection) {
      products = products.filter(p => p.collection === options.collection);
    }
    
    if (options.search) {
      const search = options.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (options.featured !== undefined) {
      products = products.filter(p => p.isFeatured === options.featured);
    }
    
    if (options.new !== undefined) {
      products = products.filter(p => p.isNew === options.new);
    }
    
    if (options.bestseller !== undefined) {
      products = products.filter(p => p.isBestseller === options.bestseller);
    }
    
    if (options.onSale !== undefined) {
      products = products.filter(p => p.isOnSale === options.onSale);
    }
    
    if (options.minPrice !== undefined) {
      products = products.filter(p => p.price >= options.minPrice!);
    }
    
    if (options.maxPrice !== undefined) {
      products = products.filter(p => p.price <= options.maxPrice!);
    }
    
    // Apply sorting
    if (options.sort) {
      switch (options.sort) {
        case 'newest':
          products.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
          break;
        case 'price-low-high':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
          break;
      }
    } else {
      // Default sort by newest
      products.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    }
    
    // Apply pagination
    if (options.offset !== undefined) {
      products = products.slice(options.offset);
    }
    
    if (options.limit !== undefined) {
      products = products.slice(0, options.limit);
    }
    
    return products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getRelatedProducts(id: number, limit: number = 4): Promise<Product[]> {
    const product = this.products.get(id);
    if (!product) {
      return [];
    }
    
    // Find products in the same category, excluding the current product
    let relatedProducts = Array.from(this.products.values())
      .filter(p => p.id !== id && 
        (p.category === product.category || p.collection === product.collection)
      );
    
    // Sort by bestsellers first
    relatedProducts.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    
    // Limit results
    return relatedProducts.slice(0, limit);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const now = new Date();
    const product: Product = {
      id,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      imageUrl: insertProduct.imageUrl,
      category: insertProduct.category,
      createdAt: now,
      updatedAt: now,
      longDescription: insertProduct.longDescription || null,
      subCategory: insertProduct.subCategory || null,
      collection: insertProduct.collection || null,
      gallery: insertProduct.gallery || null,
      isNew: insertProduct.isNew || null,
      isFeatured: insertProduct.isFeatured || null,
      isBestseller: insertProduct.isBestseller || null,
      isOnSale: insertProduct.isOnSale || null,
      discountPercentage: insertProduct.discountPercentage || null,
      hasVariants: insertProduct.hasVariants || null,
      availableSizes: insertProduct.availableSizes || null,
      availableColors: insertProduct.availableColors || null,
      stock: insertProduct.stock || 0
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, update: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) {
      return undefined;
    }
    
    const updatedProduct = {
      ...product,
      ...update,
      updatedAt: new Date()
    };
    
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Collection methods
  async getCollections(options: { seasonal?: boolean; active?: boolean } = {}): Promise<Collection[]> {
    let collections = Array.from(this.collections.values());
    
    if (options.seasonal !== undefined) {
      collections = collections.filter(c => c.isSeasonal === options.seasonal);
    }
    
    if (options.active !== undefined) {
      collections = collections.filter(c => c.isActive === options.active);
    }
    
    return collections;
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return Array.from(this.collections.values()).find(
      (collection) => collection.slug === slug
    );
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.collectionId++;
    const now = new Date();
    const collection: Collection = {
      id,
      name: insertCollection.name,
      slug: insertCollection.slug,
      description: insertCollection.description,
      imageUrl: insertCollection.imageUrl,
      createdAt: now,
      updatedAt: now,
      bannerUrl: insertCollection.bannerUrl || null,
      isSeasonal: insertCollection.isSeasonal || null,
      isActive: insertCollection.isActive || null
    };
    this.collections.set(id, collection);
    return collection;
  }

  async updateCollection(id: number, update: Partial<InsertCollection>): Promise<Collection | undefined> {
    const collection = this.collections.get(id);
    if (!collection) {
      return undefined;
    }
    
    const updatedCollection = {
      ...collection,
      ...update,
      updatedAt: new Date()
    };
    
    this.collections.set(id, updatedCollection);
    return updatedCollection;
  }

  async deleteCollection(id: number): Promise<boolean> {
    return this.collections.delete(id);
  }

  // Newsletter methods
  async addNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const exists = await this.isEmailSubscribed(data.email);
    if (exists) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.subscriptionId++;
    const subscription: NewsletterSubscription = {
      ...data,
      id,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscriptions.values()).some(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );
  }

  // Contact form methods
  async submitContactForm(form: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const now = new Date();
    const contactForm: ContactForm = {
      id,
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      createdAt: now,
      isRead: false,
      phone: form.phone || null
    };
    this.contactForms.set(id, contactForm);
    return contactForm;
  }

  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values());
  }

  async markContactFormAsRead(id: number): Promise<boolean> {
    const form = this.contactForms.get(id);
    if (!form) {
      return false;
    }
    
    this.contactForms.set(id, { ...form, isRead: true });
    return true;
  }

  // Initialize sample data
  private initializeData() {
    // Sample products
    const products: InsertProduct[] = [
      {
        name: "Embroidered Silk Dress",
        description: "Handcrafted Artisanal Design",
        longDescription: "Experience the perfect blend of traditional craftsmanship and contemporary design with our Embroidered Silk Dress. Each piece is meticulously crafted by skilled artisans to ensure exceptional quality and attention to detail.",
        price: 12500,
        imageUrl: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1577932148450-d56a5916e4be?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1603217040863-602c900e3f91?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "dresses",
        collection: "summer",
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["Red", "Blue", "Green"],
        stock: 15
      },
      {
        name: "Aari Embroidered Kaftan Set",
        description: "Pure Cotton Comfort",
        longDescription: "Our Aari Embroidered Kaftan Set combines traditional embroidery techniques with modern silhouettes for a comfortable yet elegant look. Perfect for both casual outings and special occasions.",
        price: 3299,
        imageUrl: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2126&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2126&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "ethnic",
        collection: "summer",
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["White", "Beige", "Pastel Blue"],
        stock: 20
      },
      {
        name: "Structured Elegant Blazer",
        description: "Premium Tailoring",
        longDescription: "Our Structured Elegant Blazer is tailored to perfection using premium fabrics. The clean lines and impeccable fit make it a versatile addition to any wardrobe, suitable for both formal occasions and casual styling.",
        price: 8750,
        imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2011&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2011&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "outerwear",
        collection: "festive",
        isNew: true,
        isFeatured: false,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L"],
        availableColors: ["Black", "Navy", "Burgundy"],
        stock: 12
      },
      {
        name: "Classic Embroidered Sherwani",
        description: "Handcrafted Elegance",
        longDescription: "The Classic Embroidered Sherwani represents the pinnacle of traditional craftsmanship. Featuring intricate embroidery and a perfect fit, this piece is ideal for grooms and special occasions.",
        price: 15999,
        imageUrl: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "men",
        subCategory: "ethnic",
        collection: "festive",
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["38", "40", "42", "44"],
        availableColors: ["Black", "Maroon", "Royal Blue"],
        stock: 8
      },
      {
        name: "Luxurious Embroidered Lehenga",
        description: "Artisanal Craftsmanship",
        longDescription: "Our Luxurious Embroidered Lehenga is a masterpiece of traditional craftsmanship. The intricate embroidery is complemented by a perfect silhouette, creating a stunning ensemble for celebrations and special occasions.",
        price: 24999,
        imageUrl: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "ethnic",
        collection: "bridal",
        isNew: false,
        isFeatured: true,
        isBestseller: true,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L"],
        availableColors: ["Red", "Pink", "Turquoise"],
        stock: 5
      },
      {
        name: "Fine Silk Embroidered Saree",
        description: "Handwoven Luxury",
        longDescription: "Our Fine Silk Embroidered Saree is a testament to India's rich textile heritage. Each saree is handwoven using the finest silk and embellished with intricate embroidery, creating a timeless piece that exudes elegance.",
        price: 18750,
        imageUrl: "https://images.unsplash.com/photo-1577932148450-d56a5916e4be?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1577932148450-d56a5916e4be?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "ethnic",
        collection: "festive",
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["Free Size"],
        availableColors: ["Red", "Green", "Blue", "Purple"],
        stock: 10
      },
      {
        name: "Tailored Designer Kurta",
        description: "Modern Ethnic Wear",
        longDescription: "Our Tailored Designer Kurta combines traditional aesthetics with contemporary silhouettes. Perfect for festivals, celebrations, or casual outings, this versatile piece offers both comfort and style.",
        price: 5999,
        imageUrl: "https://images.unsplash.com/photo-1644753959448-e2943edaadb9?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1644753959448-e2943edaadb9?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "men",
        subCategory: "ethnic",
        collection: "summer",
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        isOnSale: true,
        discountPercentage: 15,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["White", "Blue", "Beige"],
        stock: 25
      },
      {
        name: "Luxury Embroidered Jacket",
        description: "Premium Craftsmanship",
        longDescription: "Our Luxury Embroidered Jacket is a versatile piece that can elevate any outfit. The intricate embroidery and premium fabric make it perfect for layering during special occasions or adding a touch of elegance to casual attire.",
        price: 12800,
        imageUrl: "https://images.unsplash.com/photo-1596285508597-1199ad2ed5a3?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1596285508597-1199ad2ed5a3?q=80&w=2070&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "outerwear",
        collection: "festive",
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["Black", "Gold", "Navy"],
        stock: 15
      },
      {
        name: "Premium Linen Shirt",
        description: "Breathable Summer Wear",
        longDescription: "Our Premium Linen Shirt is crafted from the finest linen to ensure maximum comfort in warm weather. The relaxed fit and breathable fabric make it a staple for summer wardrobes, perfect for casual outings or beach vacations.",
        price: 3999,
        imageUrl: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378440847-4a64fb448d62?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "men",
        subCategory: "shirts",
        collection: "summer",
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL", "XXL"],
        availableColors: ["White", "Blue", "Beige", "Olive"],
        stock: 30
      },
      {
        name: "Cotton Chino Trousers",
        description: "Versatile Everyday Wear",
        longDescription: "Our Cotton Chino Trousers combine comfort with style. Made from high-quality cotton, these trousers feature a classic cut that's perfect for both formal and casual settings. The versatile design ensures they pair well with a variety of tops.",
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378440847-4a64fb448d62?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "men",
        subCategory: "trousers",
        collection: "summer",
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        isOnSale: true,
        discountPercentage: 10,
        hasVariants: true,
        availableSizes: ["30", "32", "34", "36", "38"],
        availableColors: ["Khaki", "Navy", "Black", "Olive"],
        stock: 25
      },
      {
        name: "Designer Floral Maxi Dress",
        description: "Elegant Summer Style",
        longDescription: "Our Designer Floral Maxi Dress is the perfect blend of comfort and elegance. The flowing silhouette and vibrant floral patterns make it ideal for summer events, garden parties, or beach vacations. The premium fabric ensures all-day comfort.",
        price: 4999,
        imageUrl: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "dresses",
        collection: "summer",
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["XS", "S", "M", "L", "XL"],
        availableColors: ["Blue Floral", "Pink Floral", "Yellow Floral"],
        stock: 15
      },
      {
        name: "Classic Wool Blend Coat",
        description: "Timeless Winter Essential",
        longDescription: "Our Classic Wool Blend Coat is a timeless addition to any winter wardrobe. The premium wool blend provides exceptional warmth while maintaining a sophisticated appearance. The clean lines and tailored fit make it versatile enough for both casual and formal occasions.",
        price: 12999,
        imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580331451062-99ff652288d7?q=80&w=2036&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "outerwear",
        collection: "heritage",
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["S", "M", "L", "XL"],
        availableColors: ["Camel", "Black", "Grey"],
        stock: 10
      },
      {
        name: "Handcrafted Leather Wallet",
        description: "Artisanal Leather Accessory",
        longDescription: "Our Handcrafted Leather Wallet is made by skilled artisans using premium leather. The timeless design features multiple card slots, a bill compartment, and a coin pocket, all while maintaining a slim profile. This wallet combines functionality with sophisticated style.",
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?q=80&w=1974&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "accessories",
        subCategory: "wallets",
        collection: "heritage",
        isNew: false,
        isFeatured: false,
        isBestseller: true,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["One Size"],
        availableColors: ["Brown", "Black", "Tan"],
        stock: 20
      },
      {
        name: "Silk Blend Evening Gown",
        description: "Luxury Formal Wear",
        longDescription: "Our Silk Blend Evening Gown exemplifies luxury and elegance. The flowing silhouette and premium silk blend fabric create a stunning look for formal events and special occasions. The subtle embellishments add just the right amount of sparkle without overwhelming the design.",
        price: 15999,
        imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1951&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1951&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1546084748-d63576a582e7?q=80&w=1974&auto=format&fit=crop"
        ],
        category: "women",
        subCategory: "formal",
        collection: "festive",
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        isOnSale: false,
        hasVariants: true,
        availableSizes: ["XS", "S", "M", "L", "XL"],
        availableColors: ["Emerald", "Navy", "Burgundy", "Black"],
        stock: 8
      }
    ];

    // Add products to storage
    products.forEach(product => {
      this.createProduct(product);
    });

    // Sample collections
    const collections: InsertCollection[] = [
      {
        name: "Summer Collection",
        slug: "summer",
        description: "Light fabrics and vibrant colors for warm days",
        imageUrl: "https://images.unsplash.com/photo-1592669241067-2f95a559ec1f?q=80&w=1974&auto=format&fit=crop",
        bannerUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
        isSeasonal: true,
        isActive: true
      },
      {
        name: "Festive Collection",
        slug: "festive",
        description: "Celebrate special occasions with timeless elegance",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
        bannerUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
        isSeasonal: true,
        isActive: true
      },
      {
        name: "Bridal Collection",
        slug: "bridal",
        description: "Exquisite craftsmanship for your special day",
        imageUrl: "https://images.unsplash.com/photo-1591792111939-8e641bf814ce?q=80&w=1957&auto=format&fit=crop",
        bannerUrl: "https://images.unsplash.com/photo-1591792111939-8e641bf814ce?q=80&w=1957&auto=format&fit=crop",
        isSeasonal: false,
        isActive: true
      },
      {
        name: "Heritage Collection",
        slug: "heritage",
        description: "Traditional designs reimagined for the modern world",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        bannerUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        isSeasonal: false,
        isActive: true
      }
    ];

    // Add collections to storage
    collections.forEach(collection => {
      this.createCollection(collection);
    });

    // Sample admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@elegante.com",
      firstName: "Admin",
      lastName: "User"
    });
  }
}

export const storage = new MemStorage();
