import { Button } from "@/components/ui/button";
import Link from "next/link";

function CoursesPage() {
  return (
    <div className="p-5">
      <Link href={"/teacher/courses/create"}>
        <Button>Create course</Button>
      </Link>
    </div>
  );
}
export default CoursesPage;
