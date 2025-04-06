
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Franchises from "./pages/Franchises";
import FranchiseListing from "./pages/FranchiseListing";
import NotFound from "./pages/NotFound";

// Quiz Platform Routes
import ManagerDashboard from "./pages/quiz/ManagerDashboard";
import CreateQuiz from "./pages/quiz/CreateQuiz";
import QuizAttempt from "./pages/quiz/QuizAttempt";
import Reports from "./pages/quiz/Reports";
import Login from "./pages/quiz/Login";
import Signup from "./pages/quiz/Signup";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/franchises" element={<Franchises />} />
          <Route path="/franchise/:slug" element={<FranchiseListing />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Quiz Platform Routes */}
          <Route path="/quiz/dashboard" element={<ManagerDashboard />} />
          <Route path="/quiz/create" element={<CreateQuiz />} />
          <Route path="/quiz/attempt/:quizId" element={<QuizAttempt />} />
          <Route path="/quiz/reports" element={<Reports />} />
          <Route path="/quiz/login" element={<Login />} />
          <Route path="/quiz/signup" element={<Signup />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
