import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { columns } from "./_components/columns";

async function CoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return redirect("/");

  const data = await prisma.course.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
export default CoursesPage;
