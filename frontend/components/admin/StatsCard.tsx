import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "green" | "purple" | "blue" | "pink" | "orange";
}

const colorClasses = {
  green: {
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    glow: "shadow-accent-green/20",
  },
  purple: {
    bg: "bg-accent-purple/10",
    text: "text-accent-purple",
    glow: "shadow-accent-purple/20",
  },
  blue: {
    bg: "bg-accent-blue/10",
    text: "text-accent-blue",
    glow: "shadow-accent-blue/20",
  },
  pink: {
    bg: "bg-accent-pink/10",
    text: "text-accent-pink",
    glow: "shadow-accent-pink/20",
  },
  orange: {
    bg: "bg-accent-orange/10",
    text: "text-accent-orange",
    glow: "shadow-orange-500/20",
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "green",
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-bg-card border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-accent-green" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={colors.text} size={24} />
        </div>
      </div>
    </div>
  );
}
