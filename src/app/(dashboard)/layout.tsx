import Navbar from "@/components/globals/Navbar";
import SideBar from "@/components/globals/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden">
      <Navbar />
      <main className="h-full flex">
        <SideBar />
        <div className="w-full overflow-scroll">{children}</div>
      </main>
    </div>
  );
}
