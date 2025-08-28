import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import UserAccountDashboard from './pages/user-account-dashboard';
import CakeCategoryBrowse from './pages/cake-category-browse';
import CustomCakeDesigner from './pages/3d-custom-cake-designer';
import InteractiveHomepage from './pages/3d-interactive-homepage';
import OrderTrackingHistory from './pages/order-tracking-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomCakeDesigner />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/cake-category-browse" element={<CakeCategoryBrowse />} />
        <Route path="/3d-custom-cake-designer" element={<CustomCakeDesigner />} />
        <Route path="/3d-interactive-homepage" element={<InteractiveHomepage />} />
        <Route path="/order-tracking-history" element={<OrderTrackingHistory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
