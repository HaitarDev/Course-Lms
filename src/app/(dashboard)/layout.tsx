import Navbar from "@/components/globals/Navbar";
import SideBar from "@/components/globals/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <Navbar />
      <main className="h-full flex">
        <SideBar />
        <div className="w-full overflow-scroll">{children}</div>
      </main>
    </div>
  );
}
