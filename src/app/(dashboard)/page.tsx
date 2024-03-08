import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDashboardCourses } from "../actions/getDashboardCourses";
import CoursesList from "./(routes)/search/_components/CoursesList";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/InfoCard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) return redirect("/");

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <main className="p-6 space-y-">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={<Clock />}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={<CheckCircle />}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList courses={[...coursesInProgress, ...completedCourses]} />
    </main>
  );
}
