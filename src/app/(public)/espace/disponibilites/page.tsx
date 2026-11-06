import { requireStudent } from "@/lib/session";
import StudentScheduleClient from "./StudentScheduleClient";

export const dynamic = "force-dynamic";

export default async function DisponibilitesPage() {
  await requireStudent();
  return <StudentScheduleClient />;
}
