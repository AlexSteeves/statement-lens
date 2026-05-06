import { useTheme } from "../hooks/useTheme";

type Theme = "light" | "dark" | "system";

const options: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark",  label: "Dark",  icon: "🌙" },
  { value: "system",label: "System",icon: "💻" },
];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          title={opt.label}
          className={`flex items-center justify-center w-7 h-7 rounded-lg text-sm transition-colors
            ${theme === opt.value
              ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};
