"use client";

import { cn } from "@/lib/utils";
import qs from "query-string";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FcComboChart,
  FcEngineering,
  FcCamcorderPro,
  FcMusic,
  FcLandscape,
  FcHome,
} from "react-icons/fc";
import { url } from "inspector";

interface Props {
  categories: Category[];
}

const CATEGORIES_DATA: Record<string, React.ReactNode> = {
  "Digital Marketing": <FcComboChart />,

  "Computer Science": <FcEngineering />,

  Photography: <FcCamcorderPro />,

  Music: <FcMusic />,

  Fitness: <FcLandscape />,

  Cooking: <FcHome />,
};
function Categories({ categories }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const getCategoryParam = params.get("category");
  const getQueryParam = params.get("query");

  const handleSearch = (categoryId: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          query: getQueryParam,
          category: categoryId === getCategoryParam ? null : categoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div className="flex  gap-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleSearch(category.id)}
          className={cn(
            "flex items-center gap-x-1  rounded-full px-3 py-2 border-primary/30 border hover:border-primary transition cursor-default justify-center",
            {
              "border-primary": getCategoryParam === category.id,
              "bg-primary/20": getCategoryParam === category.id,
            }
          )}
        >
          <span>{CATEGORIES_DATA[category.name]}</span>
          <p className="text-sm text-nowrap">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
export default Categories;
