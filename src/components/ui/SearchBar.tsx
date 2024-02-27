import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { searchByQuery } from "@/app/actions/searchByQuery";

function SearchBar() {
  return (
    <form action={searchByQuery} method="GET" className="flex max-w-2xl ">
      <Input
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
        placeholder="Search..."
        name="query"
      />
      <Button className="rounded-l-none" type="submit">
        <Search />
      </Button>
    </form>
  );
}
export default SearchBar;
