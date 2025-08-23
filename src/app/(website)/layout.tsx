export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  return (
    <div className="">
      {/* <Navbar isLoggedin={!!session} session={session!} /> */}
      <div className="">{children}</div>
    </div>
  );
}
