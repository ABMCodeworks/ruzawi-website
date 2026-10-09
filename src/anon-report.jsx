import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AnonymousReportPage from "./pages/AnonymousReportPage";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

const reportingEnabled = import.meta.env.VITE_ANON_REPORT_ENABLED === "true";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {reportingEnabled ? <AnonymousReportPage /> : (
      <>
        <TopBar solid />
        <main className="mx-auto min-h-[60vh] max-w-3xl px-6 pb-16 pt-40">
          <h1 className="font-serif text-4xl font-semibold text-[#00582C]">Page unavailable</h1>
          <p className="mt-5 text-lg text-[#35443a]">This page is currently unavailable.</p>
        </main>
        <Footer showCookieSettings={false} />
      </>
    )}
  </StrictMode>,
);
