import prisma from "@/lib/prisma";
import Categories from "./_components/Categories";
import SearchBar from "@/components/ui/SearchBar";
import { getCourses } from "@/app/actions/search/get-courses";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import CoursesList from "./_components/CoursesList";

interface SearchPageProps {
  searchParams: {
    category: string;
    query: string;
  };
}
async function Searchpage({ searchParams }: SearchPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) return redirect("/");

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses(
    userId,
    searchParams.category,
    searchParams.query
  );

  return (
    <div className="p-5">
      <div className="mb-4 block lg:hidden ">
        <SearchBar />
      </div>
      <Categories categories={categories} />
      <CoursesList courses={courses} />
    </div>
  );
}
export default Searchpage;
