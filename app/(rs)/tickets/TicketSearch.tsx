import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Rechercher tickets..."
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
