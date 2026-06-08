import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import Nifty50Widget from "./components/Nifty50Widget"; // example extra page
import Nifty50Detailed from "./components/Nifty50Detailed"; // create this file

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent onTabChange={setActiveTab} />;
      case "nifty50":
        return <Nifty50Widget onTabChange={setActiveTab} />;
      case "nifty50-detailed":
        return <Nifty50Detailed />; // detailed view for Nifty50
      default:
        return <div className="p-6">Page not found</div>;
    }
  };

  return (
    <div className="size-full flex bg-[var(--color-background)]">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  );
}
