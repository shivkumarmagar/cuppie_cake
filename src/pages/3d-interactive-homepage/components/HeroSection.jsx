import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e?.clientX / window?.innerWidth - 0.5) * 20;
      const y = (e?.clientY / window?.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window?.addEventListener('mousemove', handleMouseMove);
    return () => window?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTouchStart = (e) => {
    setIsAutoRotating(false);
    setTouchStart(e?.touches?.[0]?.clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const currentTouch = e?.touches?.[0]?.clientX;
    const diff = touchStart - currentTouch;
    setCurrentRotation(prev => prev + diff * 0.5);
    setTouchStart(currentTouch);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  const handleMouseInteraction = (isEntering) => {
    setIsAutoRotating(!isEntering);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative min-h-screen bg-gradient-to-br from-accent via-background to-accent/50 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[
          { size: "w-20 h-20", position: "top-10 left-10", delay: 0 },
          { size: "w-16 h-16", position: "top-32 right-20", delay: 0.5 },
          { size: "w-12 h-12", position: "bottom-20 left-1/4", delay: 1 },
          { size: "w-8 h-8", position: "bottom-40 right-1/3", delay: 1.5 }
        ]?.map((circle, index) => (
          <motion.div
            key={index}
            className={`absolute ${circle?.position} ${circle?.size} bg-primary rounded-full`}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: 360,
              x: mousePosition?.x * (index + 1) * 0.1,
              y: mousePosition?.y * (index + 1) * 0.1
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, delay: circle?.delay },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              x: { duration: 0.3 },
              y: { duration: 0.3 }
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Content Side */}
          <motion.div 
            className="text-center lg:text-left space-y-6 lg:space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              >
                Create Your
                <motion.span 
                  className="block text-primary"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
                >
                  Dream Cake
                </motion.span>
                in 3D
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.7 }}
              >
                Experience the magic of custom cake design with our interactive 3D builder. From bento cakes to wedding masterpieces, bring your sweetest dreams to life.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Palette"
                  iconPosition="left"
                  className="text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/3d-custom-cake-designer">Start Designing</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Search"
                  iconPosition="left"
                  className="text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/cake-category-browse">Browse Cakes</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
              variants={itemVariants}
            >
              {[
                { number: "500+", label: "Custom Designs" },
                { number: "50k+", label: "Happy Customers" },
                { number: "4.9★", label: "Average Rating" }
              ]?.map((stat, index) => (
                <motion.div 
                  key={stat?.label}
                  className="text-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 15, 
                    delay: 1 + index * 0.1 
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-heading font-bold text-primary"
                    animate={{ 
                      textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(59, 130, 246, 0.5)", "0px 0px 0px rgba(0,0,0,0)"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat?.number}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Cake Display */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-full max-w-lg mx-auto aspect-square bg-gradient-to-br from-accent to-background rounded-full shadow-xl-custom overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => handleMouseInteraction(true)}
              onMouseLeave={() => handleMouseInteraction(false)}
              whileHover={{ scale: 1.02 }}
              animate={{ 
                x: mousePosition?.x * 0.02,
                y: mousePosition?.y * 0.02
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Enhanced 3D Cake Model */}
              <motion.div 
                className="absolute inset-4 transition-transform duration-100 ease-out"
                style={{ transform: `rotateY(${currentRotation}deg)` }}
                animate={floatingVariants?.float}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop"
                    alt="3D Interactive Birthday Cake"
                    className="w-full h-full object-cover rounded-full shadow-large"
                  />
                </motion.div>
                
                {/* Enhanced Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full shadow-medium flex items-center justify-center"
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon name="Star" size={16} className="text-primary-foreground" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary rounded-full shadow-medium flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    x: [-2, 2, -2] 
                  }}
                  transition={{ 
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.4 }}
                >
                  <Icon name="Heart" size={12} className="text-secondary-foreground" />
                </motion.div>
              </motion.div>

              {/* Enhanced Interaction Hints */}
              <AnimatePresence>
                <motion.div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-medium"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="RotateCcw" size={16} className="text-primary" />
                  </motion.div>
                  <motion.span 
                    className="text-xs font-medium text-foreground"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Touch to rotate
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Zoom Controls */}
            <motion.div 
              className="absolute top-4 right-4 flex flex-col space-y-2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {['ZoomIn', 'ZoomOut']?.map((icon, index) => (
                <motion.div
                  key={icon}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={icon}
                    className="bg-background/80 backdrop-blur-sm shadow-medium hover:bg-accent"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-2xl">
              <motion.div 
                className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.2, 0.8, 1.2],
                  opacity: [0.4, 0.8, 0.4] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div 
          className="flex flex-col items-center space-y-2 text-muted-foreground"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="ChevronDown" size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;