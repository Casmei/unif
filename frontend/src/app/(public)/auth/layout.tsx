import { auth } from "@/features/auth/auth.config";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) return redirect("/");
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
}
