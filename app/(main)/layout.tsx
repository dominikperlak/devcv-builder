export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex">
        <div className="flex-1">{children}</div>
        <div className="flex-none"></div>
      </main>
    </div>
  );
}
