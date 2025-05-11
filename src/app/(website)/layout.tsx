import Navbar from "@/components/section/navbar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-primary-valentine">{children}</div>
    </div>
  );
}
