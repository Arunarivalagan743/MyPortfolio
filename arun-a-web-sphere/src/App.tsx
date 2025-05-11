import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';  // Correct path to the ThemeContext
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a query client for react-query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <TooltipProvider> {/* Tooltip Provider */}
        <Toaster />  {/* Primary toaster */}
        <Sonner />  {/* Secondary toaster */}

        {/* Browser Router for routing */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />  {/* Home Route */}
            <Route path="*" element={<NotFound />} />  {/* Catch-all Route */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
