import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AnonymousReportPage from "./pages/AnonymousReportPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnonymousReportPage />
  </StrictMode>,
);
