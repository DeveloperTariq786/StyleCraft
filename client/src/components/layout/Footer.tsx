import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl mb-6">ELEGANTE</h3>
            <p className="text-gray-400 mb-6">
              Elegante celebrates the rich heritage of Indian craftsmanship with contemporary design sensibilities, creating pieces that are timeless in their elegance.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://pinterest.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="text-gray-400 hover:text-primary transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/products?category=men" className="text-gray-400 hover:text-primary transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-gray-400 hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?sale=true" className="text-gray-400 hover:text-primary transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Information</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#artisans" className="text-gray-400 hover:text-primary transition-colors">
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="text-gray-400 hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-400 hover:text-primary transition-colors">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-gray-400 hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-primary transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Visit Our Store Section */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-gray-400">
              <h4 className="uppercase text-sm tracking-wider mb-4">Visit Our Flagship Store</h4>
              <p className="mb-2">Boulevard Road, Lal Chowk</p>
              <p className="mb-2">Srinagar, Kashmir - 190001</p>
              <p className="mb-2">Open Daily: 10:00 AM - 8:00 PM</p>
              <p className="mb-2">Phone: +91 1234 567 890</p>
              <Link href="/stores" className="text-primary hover:underline mt-2 inline-block">
                View Store Location
              </Link>
            </div>
            <div className="text-gray-400">
              <h4 className="uppercase text-sm tracking-wider mb-4">We Ship Worldwide</h4>
              <p className="mb-3">
                Experience the elegance of Kashmiri craftsmanship no matter where you are in the world. 
                We offer international shipping on all orders.
              </p>
              <Link href="/shipping-returns" className="text-primary hover:underline">
                Shipping Information
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Elegante. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4">
                <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.539 11.015h-3.604v-2.376c0-0.896 0.592-1.105 1.009-1.105 0.417 0 2.569 0 2.569 0v-3.948l-3.541-0.013c-3.928 0-4.825 2.944-4.825 4.833v2.609h-2.276v4.068h2.276c0 5.225 0 11.511 0 11.511h4.788c0 0 0-6.351 0-11.511h3.232l0.372-4.068z" />
                </svg>
                <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.571 10.571c0-4.714-3.857-8.571-8.571-8.571s-8.571 3.857-8.571 8.571 3.857 8.571 8.571 8.571 8.571-3.857 8.571-8.571zM8.571 15.429v-9.143c0-0.232 0.25-0.375 0.446-0.268l7.268 4.571c0.214 0.125 0.214 0.411 0 0.536l-7.268 4.571c-0.214 0.107-0.446-0.036-0.446-0.268z" />
                </svg>
                <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.714 7.286c-0.232-0.946-0.982-1.696-1.929-1.929-1.714-0.446-8.571-0.446-8.571-0.446s-6.857 0-8.571 0.464c-0.946 0.232-1.696 0.964-1.929 1.929-0.446 1.696-0.446 5.286-0.446 5.286s0 3.571 0.446 5.286c0.232 0.946 0.982 1.696 1.929 1.929 1.714 0.446 8.571 0.446 8.571 0.446s6.857 0 8.571-0.464c0.946-0.232 1.696-0.964 1.929-1.929 0.446-1.696 0.446-5.286 0.446-5.286s0-3.571-0.446-5.286zM9.643 15.857v-6.571l5.714 3.286-5.714 3.286z" />
                </svg>
                <svg className="h-6 w-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.571 2.286h-17.143c-0.625 0-1.143 0.518-1.143 1.143v17.143c0 0.625 0.518 1.143 1.143 1.143h17.143c0.625 0 1.143-0.518 1.143-1.143v-17.143c0-0.625-0.518-1.143-1.143-1.143zM6.857 18.286h-2.286v-8h2.286v8zM5.714 9.429c-0.732 0-1.321-0.589-1.321-1.321s0.589-1.321 1.321-1.321 1.321 0.589 1.321 1.321-0.589 1.321-1.321 1.321zM18.286 18.286h-2.286v-4c0-0.857-0.018-1.964-1.196-1.964-1.196 0-1.375 0.929-1.375 1.893v4.071h-2.286v-8h2.286v1.036h0.036c0.304-0.589 1.054-1.196 2.179-1.196 2.339 0 2.768 1.536 2.768 3.536v4.625z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
