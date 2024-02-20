import Navbar from "@/components/globals/Navbar";
import SideBar from "@/components/globals/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-[calc(100%-4rem)] flex">
        <SideBar />
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
