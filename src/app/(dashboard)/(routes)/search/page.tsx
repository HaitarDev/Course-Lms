import prisma from "@/lib/prisma";
import Categories from "./_components/Categories";
import SearchBar from "@/components/ui/SearchBar";

async function Searchpage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-5">
      <div className="mb-4 block lg:hidden ">
        <SearchBar />
      </div>
      <Categories categories={categories} />
    </div>
  );
}
export default Searchpage;
