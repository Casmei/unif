import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) return redirect("/login");

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {children}
    </div>
  );
}
