"use client";

import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const session = useSession();
  const userId = session.data?.user.id;
  if (!userId) redirect("/");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const getCategory = searchParams.get("category");

    if (getCategory) {
      router.push(`/search?query=${query}&category=${getCategory}`);
    } else {
      router.push(`/search?query=${query}`);
    }
  };
  return (
    <form className="flex max-w-2xl" onSubmit={handleSubmit}>
      <Input
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
        placeholder="Search..."
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="rounded-l-none" type="submit">
        <Search />
      </Button>
    </form>
  );
}
export default SearchBar;
