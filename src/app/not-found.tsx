import Link from "next/link";
import { Compass, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/75 p-10 text-center shadow-2xl backdrop-blur-md">
        {/* Barre supérieure orange #eb4d16 */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#eb4d16] to-transparent" />

        {/* Icône & Code 404 */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#eb4d16]/30 bg-[#eb4d16]/10 text-[#eb4d16]">
          <Compass className="h-8 w-8" />
        </div>

        <p className="font-mono text-xs font-bold tracking-widest text-[#eb4d16] uppercase">
          Erreur 404
        </p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Page introuvable
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Oups ! La page ou la ressource que vous recherchez n&apos;existe pas,
          a été déplacée ou l&apos;adresse saisie est incorrecte.
        </p>

        {/* Boutons de redirection */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#eb4d16] px-6 py-3 text-xs font-bold tracking-wide text-white uppercase shadow-lg shadow-[#eb4d16]/25 transition-all hover:bg-[#d94310] active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/qcm"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            <BookOpen className="h-4 w-4 text-[#eb4d16]" />
            Explorer les QCM
          </Link>
        </div>
      </div>
    </div>
  );
}
