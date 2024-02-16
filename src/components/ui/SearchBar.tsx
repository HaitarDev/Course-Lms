import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

function SearchBar() {
  return (
    <form action="" className="flex max-w-2xl">
      <Input className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0" />
      <Button className="rounded-l-none ">
        <Search />
      </Button>
    </form>
  );
}
export default SearchBar;
