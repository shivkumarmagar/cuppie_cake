import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrendingCarousel from './components/TrendingCarousel';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';

const InteractiveHomepage = () => {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Cuppie Cake - Premium 3D Custom Cake Designer | Order Online</title>
        <meta 
          name="description" 
          content="Create your dream cake with our interactive 3D designer. Premium bento cakes, birthday cakes, wedding cakes with custom designs. Order online with same-day delivery." 
        />
        <meta 
          name="keywords" 
          content="custom cakes, 3D cake designer, bento cakes, birthday cakes, wedding cakes, online cake ordering, premium bakery" 
        />
        <meta property="og:title" content="Cuppie Cake - Premium 3D Custom Cake Designer" />
        <meta 
          property="og:description" 
          content="Experience the magic of custom cake design with our interactive 3D builder. From bento cakes to wedding masterpieces." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/3d-interactive-homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with 3D Interactive Cake */}
          <HeroSection />
          
          {/* Trending Designs Carousel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <TrendingCarousel />
          </motion.div>
          
          {/* Category Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <CategoryGrid />
          </motion.div>
          
          {/* Featured Products */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <FeaturedProducts />
          </motion.div>
          
          {/* Customer Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <TestimonialsSection />
          </motion.div>
          
          {/* Newsletter Subscription */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <NewsletterSection />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="bg-foreground text-background py-12"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <motion.div 
                className="md:col-span-1"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: 0.1 } }
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <motion.div 
                    className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-primary-foreground font-bold">C</span>
                  </motion.div>
                  <span className="text-xl font-heading font-semibold">
                    Cuppie Cake
                  </span>
                </div>
                <p className="text-background/80 text-sm mb-4">
                  Creating sweet memories with premium custom cakes and interactive 3D design experiences.
                </p>
                <div className="flex space-x-3">
                  {['f', 't', 'i']?.map((social, index) => (
                    <motion.button 
                      key={social}
                      className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="text-sm">{social}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
                }}
              >
                <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { href: "/cake-category-browse", text: "Browse Cakes" },
                    { href: "/3d-custom-cake-designer", text: "Custom Designer" },
                    { href: "/shopping-cart-checkout", text: "Cart" },
                    { href: "/order-tracking-history", text: "Track Order" }
                  ]?.map((link, index) => (
                    <motion.li 
                      key={link?.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <motion.a 
                        href={link?.href} 
                        className="text-background/80 hover:text-background transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link?.text}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Categories */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
                }}
              >
                <h3 className="font-heading font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Bento Cakes",
                    "Birthday Cakes", 
                    "Wedding Cakes",
                    "Seasonal Specials"
                  ]?.map((category, index) => (
                    <motion.li 
                      key={category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <motion.a 
                        href="/cake-category-browse" 
                        className="text-background/80 hover:text-background transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {category}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.4 } }
                }}
              >
                <h3 className="font-heading font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-background/80">
                  {[
                    "📞 (555) 123-CAKE",
                    "✉️ hello@cuppiecake.com",
                    "📍 123 Sweet Street, Bakery District",
                    "🕒 Mon-Sat: 8AM-8PM"
                  ]?.map((contact, index) => (
                    <motion.li 
                      key={contact}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      {contact}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div 
              className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>&copy; {new Date()?.getFullYear()} Cuppie Cake. All rights reserved. | Privacy Policy | Terms of Service</p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default InteractiveHomepage;