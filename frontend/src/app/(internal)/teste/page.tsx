import { auth } from "@/auth";

export default async function Page() {
  const { user } = await auth();
  return <h1>Olá mundo {user.name}</h1>;
}
