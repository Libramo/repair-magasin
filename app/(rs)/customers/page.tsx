import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";
import { getAllCustomers, getCustomerSearchResults } from "@/lib/queries";

export const metadata = {
  title: "Customer Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  // Fetch data based on searchText
  const data = searchText
    ? await getCustomerSearchResults(searchText)
    : await getAllCustomers();

  return (
    <>
      <CustomerSearch />

      {searchText && data.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">Aucun résultat trouvé.</p>
      ) : (
        <CustomerTable data={data} />
      )}
    </>
  );
}
