import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Console | Portfolio",
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 antialiased font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 shrink-0 border-b border-slate-800 bg-slate-950/40 px-8 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            System: <span className="text-emerald-400">Online</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">
              Local Instance
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
