import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Checklist from "./pages/Checklist";
import Tools from "./pages/Tools";
import Emergency from "./pages/Emergency";
import Resources from "./pages/Resources";
import SEOHead from "./components/SEOHead";
import Analytics from "./components/Analytics";
import Article from "./pages/Article";
import About from "./pages/About";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

const sectionRoutes = [
  "/services",
  "/how-it-works",
  "/social-proof",
  "/certifications",
  "/guarantees",
  "/faq",
  "/contact",
];

function SectionPage({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [sectionId]);

  return <Home />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:slug" component={Article} />
      <Route path="/booking" component={Booking} />
      <Route path="/checklist" component={Checklist} />
      <Route path="/tools" component={Tools} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/about" component={About} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      {sectionRoutes.map((route) => {
        const sectionId = route.slice(1);
        return (
          <Route key={route} path={route}>
            <SectionPage sectionId={sectionId} />
          </Route>
        );
      })}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <SEOHead />
          <Analytics />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
