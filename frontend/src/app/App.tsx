import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Nifty50DetailedView from './components/Nifty50DetailedView';
import LoginPage from './components/LoginPage';
import UserProfilePage from './components/UserProfile'
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNiftyDetails, setShowNiftyDetails] = useState(false);
  const [showUserProfilePage, setUserProfilePage] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="size-full flex bg-[var(--color-background)]">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setUserProfilePage(true)}
      />
      <main className="flex-1 overflow-auto">
        {
          showUserProfilePage ? (
            <UserProfilePage onBack={() => setUserProfilePage(false)} />
          ) :
            showNiftyDetails ? (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowNiftyDetails(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </button>
                </div>
                <Nifty50DetailedView />
              </div>
            ) : (
              <DashboardContent
                onShowNiftyDetails={() => setShowNiftyDetails(true)}
              />
            )}
      </main>
    </div>
  );
}
