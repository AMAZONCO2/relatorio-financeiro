"use client";

import Image from "next/image";
import { Download, ShieldCheck, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-6 no-print">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo Nambikuara"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none">
            Relatório Financeiro Nambikuara
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">
            Projeto Carbono 40 Anos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition shadow-lg"
          >
            <Download className="w-4 h-4" /> Exportar PDF
          </button>
        </div>
      </div>
    </header>
  );
}
