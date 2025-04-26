import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/shop/ProductCard";

const ProductDetail = () => {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  const { data: relatedProducts, isLoading: relatedLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/related', productId],
    enabled: !!product,
  });
  
  // Update page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Elegante`;
    }
  }, [product]);
  
  // Mock product images for demonstration
  const productImages = product ? [
    product.imageUrl,
    "https://images.unsplash.com/photo-1577932148450-d56a5916e4be?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603217040863-602c900e3f91?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1644753959448-e2943edaadb9?q=80&w=1974&auto=format&fit=crop",
  ] : [];
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.hasVariants && (!selectedSize || !selectedColor)) {
      toast({
        title: "Please select options",
        description: "Please select size and color before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 animate-pulse">
            <div className="bg-gray-300 w-full h-[500px] mb-4"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 w-20 h-20"></div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you are looking for does not exist or has been removed.</p>
        <Button as="a" href="/products">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="relative mb-4">
            <img 
              src={productImages[activeImage]} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
            {product.isNew && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white px-2 py-1 text-sm">NEW</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {productImages.map((image, index) => (
              <button 
                key={index}
                className={`w-20 h-20 ${activeImage === index ? 'ring-2 ring-primary' : 'opacity-70'}`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
          <p className="text-xl font-medium text-primary mb-4">₹{product.price.toLocaleString()}</p>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Options */}
          {product.hasVariants && (
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="size-select" className="block text-sm font-medium mb-1">Size</label>
                <Select
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                >
                  <SelectTrigger id="size-select" className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="color-select" className="block text-sm font-medium mb-1">Color</label>
                <Select
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                >
                  <SelectTrigger id="color-select" className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <i className="fas fa-minus text-xs"></i>
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setQuantity(val);
                  }
                }}
                className="w-16 h-8 text-center mx-2"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={increaseQuantity}
              >
                <i className="fas fa-plus text-xs"></i>
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <Button 
              className="w-full bg-gray-800 hover:bg-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <i className="fas fa-truck w-6"></i>
              <span className="ml-2 text-sm">Free shipping on orders over ₹5000</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-undo w-6"></i>
              <span className="ml-2 text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shield-alt w-6"></i>
              <span className="ml-2 text-sm">Secure payment</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Information Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none gap-8">
            <TabsTrigger value="details" className="text-base">Product Details</TabsTrigger>
            <TabsTrigger value="shipping" className="text-base">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="care" className="text-base">Care Instructions</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <h3 className="text-lg font-medium mb-4">Product Details</h3>
            <div className="space-y-4">
              <p>
                {product.longDescription || `Experience the perfect blend of traditional craftsmanship and contemporary design with our ${product.name}. Each piece is meticulously crafted by skilled artisans to ensure exceptional quality and attention to detail.`}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Premium quality material</li>
                <li>Handcrafted by skilled artisans</li>
                <li>Unique design details</li>
                <li>Versatile styling options</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-6">
            <h3 className="text-lg font-medium mb-4">Shipping & Returns</h3>
            <div className="space-y-4">
              <p>
                We offer free standard shipping on all orders over ₹5000. For orders under ₹5000, a flat rate shipping fee of ₹250 applies.
              </p>
              <p>
                All products can be returned within 30 days of delivery for a full refund or exchange, provided they are in their original condition with tags attached.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="care" className="py-6">
            <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
            <div className="space-y-4">
              <p>
                To ensure the longevity of your garment, please follow these care instructions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dry clean only</li>
                <li>Store in a cool, dry place</li>
                <li>Avoid direct sunlight for extended periods</li>
                <li>Handle embroidery and embellishments with care</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
        
        {relatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 w-full h-80 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : relatedProducts && relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
