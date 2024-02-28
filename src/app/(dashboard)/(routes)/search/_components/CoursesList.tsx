import { Category, Course } from "@prisma/client";
import CourseCard from "./CoursesCard";

type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface Props {
  courses: CoursesWithProgressWithCategory[];
}

function CoursesList({ courses }: Props) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            chaptersLength={course.chapters.length}
            price={course.price!}
            progress={course.progress}
            category={course.category?.name!}
          />
        ))}
      </div>

      <div>
        {courses.length === 0 && (
          <p className="text-center text-gray-500 mt-28">No courses found</p>
        )}
      </div>
    </div>
  );
}
export default CoursesList;
