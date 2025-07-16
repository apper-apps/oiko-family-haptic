import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import CalendarPage from "@/components/pages/CalendarPage";
import EventDetailsPage from "@/components/pages/EventDetailsPage";
import FamilyPage from "@/components/pages/FamilyPage";
import SettingsPage from "@/components/pages/SettingsPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CalendarPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;