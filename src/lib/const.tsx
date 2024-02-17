import { BarChart3, Compass, Layout, List } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export const SIDEBAR_TABS = [
  {
    label: "Dashboard",
    href: "/",
    icon: <Layout />,
  },
  {
    label: "Browse",
    href: "/search",
    icon: <Compass />,
  },
];

export const TEACHER_TABS = [
  {
    label: "Courses",
    href: "/teacher/courses",
    icon: <List />,
  },
  {
    label: "Analytics",
    href: "/teacher/analytics",
    icon: <BarChart3 />,
  },
];
