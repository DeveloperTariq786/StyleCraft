import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Quick View",
      description: `${product.name} - ₹${product.price}`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div 
      className="group product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden mb-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          {product.isNew && (
            <div className="absolute top-0 right-0 m-2">
              <span className="bg-primary text-white text-xs px-2 py-1">NEW</span>
            </div>
          )}
          {product.isBestseller && (
            <div className="absolute top-0 right-0 m-2">
              <span className="bg-primary text-white text-xs px-2 py-1">BESTSELLER</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none"></div>
          <div 
            className={`absolute bottom-0 left-0 right-0 p-4 transform ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            } transition-transform duration-300 bg-white bg-opacity-90`}
          >
            <div className="flex justify-between">
              <button 
                className="text-gray-800 hover:text-primary transition-colors"
                onClick={handleQuickView}
              >
                <span className="text-xs uppercase tracking-wider">Quick View</span>
              </button>
              <button 
                className="text-gray-800 hover:text-primary transition-colors"
                onClick={handleAddToWishlist}
              >
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
      <h3 className="font-medium mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="font-medium">₹{product.price.toLocaleString()}</p>
    </div>
  );
};

export default ProductCard;
