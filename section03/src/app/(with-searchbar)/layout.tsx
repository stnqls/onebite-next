import Searchbar from "../../components/Searchbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
