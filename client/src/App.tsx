import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import SEOHead from "./components/SEOHead";

const sectionRoutes = [
  "/services",
  "/how-it-works",
  "/assessment",
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
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
