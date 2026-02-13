import Image from "next/image";

/**
 * Cabeçalho visível APENAS na impressão / exportação PDF.
 * Exibe a logo do projeto e identificação do relatório.
 */
export function PrintHeader() {
  return (
    <div className="hidden print:flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-200">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo Nambikuara"
          width={48}
          height={48}
          className="object-contain"
        />
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none">
            Relatório Financeiro Nambikuara
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            Projeto Carbono 40 Anos — Análise Financeira Avançada
          </p>
        </div>
      </div>
      
    </div>
  );
}
