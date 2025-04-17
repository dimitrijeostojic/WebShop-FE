import React from "react";

interface ProfileTabsProps {
  tab: "orders" | "users";
  onTabChange: (tab: "orders" | "users") => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ tab, onTabChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange("orders")}
        className={`px-4 py-2 rounded-full font-semibold ${
          tab === "orders"
            ? "bg-violet-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Sve porudžbine
      </button>
      <button
        onClick={() => onTabChange("users")}
        className={`px-4 py-2 rounded-full font-semibold ${
          tab === "users"
            ? "bg-violet-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Svi korisnici
      </button>
    </div>
  );
};

export default ProfileTabs;
