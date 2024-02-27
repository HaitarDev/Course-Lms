import prisma from "@/lib/prisma";
import Categories from "./_components/Categories";

async function Searchpage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-5">
      <Categories categories={categories} />
    </div>
  );
}
export default Searchpage;
