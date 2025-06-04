
import Navbar from "@/components/section/navbar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <div className="">{children}</div>
  
    </div>
  );
}
