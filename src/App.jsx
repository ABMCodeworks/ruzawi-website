import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AcademicLifePage from "./pages/AcademicLifePage";
import BoardingLifePage from "./pages/BoardingLifePage";
import SchoolLifePage from "./pages/SchoolLifePage";
import ProjectsVentureCapitalPage from "./pages/ProjectsVentureCapitalPage";
import SportsClubsPage from "./pages/SportsClubsPage";
import WelcomeHeadmasterPage from "./pages/WelcomeHeadmasterPage";
import WhyRuzawiPage from "./pages/WhyRuzawiPage";
import TraditionRuzawiPage from "./pages/TraditionRuzawiPage";
import GovernancePage from "./pages/GovernancePage";
import JuniorMastersMistressesPage from "./pages/JuniorMastersMistressesPage";
import RopaPage from "./pages/RopaPage";
import MagazinesPage from "./pages/MagazinesPage";
import OnlineApplicationPage from "./pages/OnlineApplicationPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/welcome-from-the-headmaster"
          element={<WelcomeHeadmasterPage />}
        />
        <Route path="/why-ruzawi" element={<WhyRuzawiPage />} />
        <Route path="/tradition-at-ruzawi" element={<TraditionRuzawiPage />} />
        <Route path="/governance" element={<GovernancePage />} />
        <Route
          path="/junior-masters-and-mistresses"
          element={<JuniorMastersMistressesPage />}
        />
        <Route path="/ropa-and-alumni" element={<RopaPage />} />
        <Route path="/magazines" element={<MagazinesPage />} />
        <Route
          path="/online-applications"
          element={<OnlineApplicationPage />}
        />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/academic-life" element={<AcademicLifePage />} />
        <Route path="/academics-at-ruzawi" element={<AcademicLifePage />} />
        <Route path="/curriculum-support" element={<AcademicLifePage />} />
        <Route path="/kipper-department" element={<AcademicLifePage />} />
        <Route path="/subject-teaching" element={<AcademicLifePage />} />
        <Route path="/ruzawi-library" element={<AcademicLifePage />} />

        <Route path="/boarding-life" element={<BoardingLifePage />} />
        <Route path="/dorm-life" element={<BoardingLifePage />} />
        <Route
          path="/kitchen-housekeeping-and-laundry"
          element={<BoardingLifePage />}
        />
        <Route path="/pastoral-care" element={<BoardingLifePage />} />
        <Route path="/ruzawi-families" element={<BoardingLifePage />} />
        <Route path="/ruzawi-sanatorium" element={<BoardingLifePage />} />

        <Route path="/school-life" element={<SchoolLifePage />} />
        <Route path="/chapel" element={<SchoolLifePage />} />
        <Route path="/charities-we-support" element={<SchoolLifePage />} />
        <Route path="/leadership-at-ruzawi" element={<SchoolLifePage />} />
        <Route path="/learning-knights-award" element={<SchoolLifePage />} />
        <Route path="/outdoor-education" element={<SchoolLifePage />} />
        <Route
          path="/ruzchats-life-skills-and-the-chat-room"
          element={<SchoolLifePage />}
        />
        <Route path="/world-peace-games" element={<SchoolLifePage />} />

        <Route
          path="/projects-and-venture-capital"
          element={<ProjectsVentureCapitalPage />}
        />

        <Route path="/sports-and-clubs" element={<SportsClubsPage />} />
        <Route path="/sport-at-ruzawi" element={<SportsClubsPage />} />
        <Route path="/clubs" element={<SportsClubsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
