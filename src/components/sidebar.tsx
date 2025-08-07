import { Home, BarChart2, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  darkMode,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const theme = {
    bg: darkMode ? "bg-gray-800" : "bg-white",
    text: darkMode ? "text-white" : "text-gray-900",
    textSecondary: darkMode ? "text-gray-400" : "text-gray-600",
    border: darkMode ? "border-gray-700" : "border-gray-200",
    hover: darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
  };

  const navItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { label: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0
        h-auto
        z-50 transform transition-transform duration-300
        md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:w-52 w-64
        p-4 border-r
        ${theme.bg} ${theme.border}
        `}
    >
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className={`text-xl font-bold ${theme.text}`}>Menu</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`p-2 rounded ${theme.hover}`}
          style={{ cursor: "pointer" }}
        >
          ✕
        </button>
      </div>
      <h2 className={`text-2xl font-bold mb-6 ${theme.text} hidden md:block`}>
        My Dashboard
      </h2>
      <nav className="flex flex-col gap-4">
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium ${theme.text} ${theme.hover} transition-colors`}
            style={{ cursor: "pointer" }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
