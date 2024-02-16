import { CalendarDays, Code, Compass, Trophy } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export const SIDEBAR_TABS = [
  {
    label: "Browse",
    href: "/",
    icon: <Compass />,
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    icon: <Trophy />,
  },
  {
    label: "Discord",
    href: "/discord",
    icon: <FaDiscord className="w-6 h-6" />,
  },
  {
    label: "Events",
    href: "/events",
    icon: <CalendarDays />,
  },
  {
    label: "Problems",
    href: "/problems",
    icon: <Code />,
  },
];
