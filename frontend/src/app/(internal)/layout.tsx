import Sidebar from "@/components/layout/sidebar";
import { auth } from "@/features/auth/auth.config";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) return redirect("/auth/sign-in");

  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
