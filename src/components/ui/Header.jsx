import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountSidebarOpen, setIsAccountSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/3d-interactive-homepage', icon: 'Home' },
    { label: 'Browse Cakes', path: '/cake-category-browse', icon: 'Search' },
    { label: 'Custom Designer', path: '/3d-custom-cake-designer', icon: 'Palette' },
    { label: 'Cart', path: '/shopping-cart-checkout', icon: 'ShoppingCart' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAccountSidebar = () => {
    setIsAccountSidebarOpen(!isAccountSidebarOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/3d-interactive-homepage" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Cake" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              Cuppie Cake
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-accent' :'text-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Account & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              onClick={toggleAccountSidebar}
              className="text-foreground hover:text-primary"
            >
              Account
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="User"
              onClick={toggleAccountSidebar}
              className="text-foreground hover:text-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-medium">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-accent' :'text-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      {/* Account Sidebar */}
      {isAccountSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={toggleAccountSidebar}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 z-50 h-full w-full sm:w-80 bg-background border-l border-border shadow-large transform transition-large">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                My Account
              </h2>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={toggleAccountSidebar}
                className="text-foreground hover:text-primary"
              />
            </div>
            
            <nav className="p-4 space-y-2">
              <Link
                to="/user-account-dashboard"
                onClick={toggleAccountSidebar}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath('/user-account-dashboard')
                    ? 'text-primary bg-accent' :'text-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                <Icon name="User" size={20} />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/order-tracking-history"
                onClick={toggleAccountSidebar}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath('/order-tracking-history')
                    ? 'text-primary bg-accent' :'text-foreground hover:text-primary hover:bg-accent/50'
                }`}
              >
                <Icon name="Package" size={20} />
                <span>Order History</span>
              </Link>
              
              <div className="pt-4 border-t border-border">
                <button className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth w-full text-left">
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </button>
                
                <button className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-smooth w-full text-left">
                  <Icon name="HelpCircle" size={20} />
                  <span>Help & Support</span>
                </button>
                
                <button className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth w-full text-left">
                  <Icon name="LogOut" size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;