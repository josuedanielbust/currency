export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-full">
      <main className="mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  )
}
