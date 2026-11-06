import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import StudentLoginForm from "@/components/student/StudentLoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connexion élève",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

// N'autorise que des chemins internes (évite les redirections vers un autre site).
function safeCallback(value?: string) {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")
    ? value
    : "/espace";
}

export default async function StudentLoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  const target = safeCallback(callbackUrl);

  const session = await getServerSession(authOptions);
  if (session?.user?.role === "student") redirect(target);

  return <StudentLoginForm callbackUrl={target} />;
}
