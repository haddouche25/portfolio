import type { Metadata } from "next";
import { requireStudent } from "@/lib/session";
import ChangePasswordForm from "@/components/student/ChangePasswordForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mot de passe",
  robots: { index: false, follow: false },
};

export default async function ChangePasswordPage() {
  const me = await requireStudent({ allowMustChange: true });
  return <ChangePasswordForm forced={me.mustChangePassword} />;
}
