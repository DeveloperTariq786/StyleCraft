import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Products = () => {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1]);
  
  // Filters
  const [category, setCategory] = useState<string | null>(urlParams.get('category'));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: [],
    color: [],
    size: [],
  });
  
  // Get all query params
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    // Only add category filter if one is selected
    if (category) {
      params.append('category', category);
    }
    
    // Always add price range
    params.append('minPrice', priceRange[0].toString());
    params.append('maxPrice', priceRange[1].toString());
    params.append('sort', sortBy);
    
    // Add any selected filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      values.forEach(value => {
        params.append(key, value);
      });
    });
    
    return params.toString();
  };
  
  const queryString = buildQueryString();
  console.log("API request query string:", queryString);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products', queryString],
    queryFn: async () => {
      const response = await fetch(`/api/products?${queryString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Update page title based on category
  useEffect(() => {
    let title = "Products";
    if (category === "women") title = "Women's Collection";
    else if (category === "men") title = "Men's Collection";
    else if (category === "accessories") title = "Accessories";
    
    document.title = `${title} - Elegante`;
  }, [category]);

  const toggleFilter = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setCategory(null);
    setPriceRange([0, 50000]);
    setSelectedFilters({
      type: [],
      color: [],
      size: [],
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-primary"
              >
                Clear All
              </Button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className={`text-left justify-start px-0 ${category === null ? 'text-primary' : ''}`}
                    onClick={() => setCategory(null)}
                  >
                    All Products
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className={`text-left justify-start px-0 ${category === 'women' ? 'text-primary' : ''}`}
                    onClick={() => setCategory('women')}
                  >
                    Women
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className={`text-left justify-start px-0 ${category === 'men' ? 'text-primary' : ''}`}
                    onClick={() => setCategory('men')}
                  >
                    Men
                  </Button>
                </div>
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    className={`text-left justify-start px-0 ${category === 'accessories' ? 'text-primary' : ''}`}
                    onClick={() => setCategory('accessories')}
                  >
                    Accessories
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Product Type Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Product Type</h3>
              <div className="space-y-2">
                {['Dresses', 'Tops', 'Bottoms', 'Ethnic Wear', 'Accessories'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type}`}
                      checked={selectedFilters.type.includes(type.toLowerCase())}
                      onCheckedChange={() => toggleFilter('type', type.toLowerCase())}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="space-y-2">
                {['Black', 'White', 'Red', 'Blue', 'Green', 'Pink'].map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color}`}
                      checked={selectedFilters.color.includes(color.toLowerCase())}
                      onCheckedChange={() => toggleFilter('color', color.toLowerCase())}
                    />
                    <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="space-y-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${size}`}
                      checked={selectedFilters.size.includes(size.toLowerCase())}
                      onCheckedChange={() => toggleFilter('size', size.toLowerCase())}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-serif">
              {category === 'women' 
                ? "Women's Collection" 
                : category === 'men' 
                  ? "Men's Collection"
                  : category === 'accessories'
                    ? 'Accessories'
                    : 'All Products'}
            </h1>
            
            <div className="flex items-center">
              <label htmlFor="sort-by" className="text-sm mr-2">Sort by:</label>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger id="sort-by" className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 w-full h-80 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Failed to load products. Please try again later.</p>
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="mx-1">Previous</Button>
                <Button variant="outline" className="mx-1 bg-primary text-white">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="mx-1">Next</Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p>No products found matching your criteria.</p>
              <Button onClick={clearAllFilters} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
