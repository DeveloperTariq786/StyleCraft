import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import CollectionHighlight from "@/components/home/CollectionHighlight";
import PromoBanner from "@/components/home/PromoBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import InstagramFeed from "@/components/home/InstagramFeed";
import Newsletter from "@/components/home/Newsletter";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Elegante - Luxury Fashion & Ethnic Wear";
  }, []);

  return (
    <>
      <HeroCarousel />
      <FeaturedCategories />
      <NewArrivals />
      <CollectionHighlight />
      <PromoBanner />
      <FeaturedProducts />
      <InstagramFeed />
      <Newsletter />
    </>
  );
};

export default Home;
