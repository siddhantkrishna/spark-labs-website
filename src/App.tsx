import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ApplyProvider } from "@/components/ui";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RootLayout } from "@/layouts/RootLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PreloaderScreen } from "@/components/PreloaderScreen";

/* Public pages */
import Home from "@/pages/Home";
import About from "@/pages/About";
import Program from "@/pages/Program";
import CurriculumPage from "@/pages/CurriculumPage";
import ProjectsPage from "@/pages/ProjectsPage";
import JourneyPage from "@/pages/JourneyPage";
import Admissions from "@/pages/Admissions";
import ApplicationSubmitted from "@/pages/ApplicationSubmitted";
import FaqPage from "@/pages/FaqPage";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import LegalPage from "@/pages/LegalPage";
import NotFound from "@/pages/NotFound";

/* Admin */
import { AdminLoginPage, ForgotPasswordPage, ResetPasswordPage } from "@/pages/admin/AuthPages";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminApplications from "@/pages/admin/Applications";
import { AdminBlog, AdminProjects, AdminTestimonials } from "@/pages/admin/CrudPages";
import { AdminContent, AdminSettings } from "@/pages/admin/ContentAndSettings";
import AdminMedia from "@/pages/admin/MediaLibrary";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Only show preloader once per session, and only on the home route first load
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const alreadyShown = sessionStorage.getItem("sparkPreloaderShown");
    return !alreadyShown && window.location.pathname === "/";
  });

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  const handlePreloaderFinish = () => {
    sessionStorage.setItem("sparkPreloaderShown", "1");
    setShowPreloader(false);
  };

  return (
    <ErrorBoundary>
      <ApplyProvider>
        {showPreloader && isHome && (
          <PreloaderScreen onFinish={handlePreloaderFinish} />
        )}
        <Routes>
          {/* Public site */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="program" element={<Program />} />
            <Route path="curriculum" element={<CurriculumPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="journey" element={<JourneyPage />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="application-submitted" element={<ApplicationSubmitted />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="privacy" element={<LegalPage slug="privacy" />} />
            <Route path="terms" element={<LegalPage slug="terms" />} />
            <Route path="refund" element={<LegalPage slug="refund" />} />
            <Route path="cookies" element={<LegalPage slug="cookies" />} />
            <Route path="code-of-conduct" element={<LegalPage slug="code-of-conduct" />} />
            <Route path="disclaimer" element={<LegalPage slug="disclaimer" />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin auth (no layout — full-screen split-panel) */}
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="admin/reset-password" element={<ResetPasswordPage />} />

          {/* Admin dashboard (protected by AdminLayout) */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </ApplyProvider>
    </ErrorBoundary>
  );
}
