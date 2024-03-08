import { getAnalytics } from "@/app/actions/analytics/getAnalytics";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";

async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/");

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
      </div>
      <Chart data={data} />
    </div>
  );
}
export default AnalyticsPage;
