// src/app/admin/layout.tsx
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 antialiased font-sans relative overflow-x-hidden">
      {/* Sidebar Desktop (Toujours visible sur grand écran) */}
      <div className="hidden md:flex md:shrink-0">
        <AdminSidebar />
      </div>

      {/* Sidebar Mobile (Tiroir coulissant contrôlé par le header) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay sombre en arrière-plan */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          {/* Contenu du tiroir */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <AdminSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenu Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Admin avec le Bouton Burger */}
        <header className="h-16 shrink-0 border-b border-slate-800 bg-slate-950/60 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* BOUTON BURGER MOBILE (Déclenche l'ouverture) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Ouvrir le menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <div className="text-xs font-mono text-slate-400">
              System: <span className="text-emerald-400">Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-300 hidden sm:inline">
              Local Instance
            </span>
          </div>
        </header>

        {/* Corps de la page */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
