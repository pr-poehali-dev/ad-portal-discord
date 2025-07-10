import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  isDark?: boolean;
}

const AnimatedBackground = ({ isDark = false }: AnimatedBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 ${isDark ? "bg-[#2C2F33]" : "bg-gray-50"}`}
      >
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {/* Circle 1 */}
          <div
            className={`absolute w-96 h-96 rounded-full opacity-20 animate-pulse
              ${isDark ? "bg-gradient-to-br from-blue-500 to-purple-600" : "bg-gradient-to-br from-blue-200 to-purple-300"}
              floating-shape-1`}
            style={{
              top: "10%",
              left: "5%",
              animationDelay: "0s",
              animationDuration: "8s",
            }}
          />

          {/* Triangle 1 */}
          <div
            className={`absolute w-0 h-0 opacity-15 floating-shape-2
              ${isDark ? "triangle-dark" : "triangle-light"}`}
            style={{
              top: "60%",
              right: "10%",
              animationDelay: "2s",
              animationDuration: "12s",
              borderLeft: "120px solid transparent",
              borderRight: "120px solid transparent",
              borderBottom: isDark
                ? "200px solid rgba(99, 102, 241, 0.3)"
                : "200px solid rgba(99, 102, 241, 0.2)",
            }}
          />

          {/* Square 1 */}
          <div
            className={`absolute w-48 h-48 opacity-15 floating-shape-3 rotate-45
              ${isDark ? "bg-gradient-to-br from-green-500 to-teal-600" : "bg-gradient-to-br from-green-200 to-teal-300"}`}
            style={{
              top: "20%",
              right: "20%",
              animationDelay: "4s",
              animationDuration: "10s",
            }}
          />

          {/* Circle 2 */}
          <div
            className={`absolute w-64 h-64 rounded-full opacity-20 animate-pulse
              ${isDark ? "bg-gradient-to-br from-pink-500 to-red-600" : "bg-gradient-to-br from-pink-200 to-red-300"}
              floating-shape-4`}
            style={{
              bottom: "15%",
              left: "15%",
              animationDelay: "6s",
              animationDuration: "14s",
            }}
          />

          {/* Hexagon */}
          <div
            className={`absolute opacity-15 floating-shape-5 hexagon
              ${isDark ? "hexagon-dark" : "hexagon-light"}`}
            style={{
              top: "40%",
              left: "40%",
              animationDelay: "3s",
              animationDuration: "16s",
            }}
          />

          {/* Small circles */}
          <div
            className={`absolute w-24 h-24 rounded-full opacity-25 animate-pulse
              ${isDark ? "bg-gradient-to-br from-yellow-500 to-orange-600" : "bg-gradient-to-br from-yellow-200 to-orange-300"}
              floating-shape-6`}
            style={{
              top: "80%",
              right: "30%",
              animationDelay: "1s",
              animationDuration: "6s",
            }}
          />

          <div
            className={`absolute w-32 h-32 rounded-full opacity-20 animate-pulse
              ${isDark ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gradient-to-br from-indigo-200 to-purple-300"}
              floating-shape-7`}
            style={{
              top: "5%",
              right: "5%",
              animationDelay: "5s",
              animationDuration: "9s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
