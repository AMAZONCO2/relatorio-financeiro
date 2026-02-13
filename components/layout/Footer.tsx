import Image from "next/image";

export function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto mt-12 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src="/logo.png"
            alt="Logo Nambikuara"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-black text-sm tracking-tighter">
            Nambikuara — Amazon Connection Carbon
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-tighter">
          Liderando o desenvolvimento sustentável por meio de créditos de
          carbono de alta integridade na bacia amazônica.
        </p>
      </div>

      <div className="flex-1 max-w-lg">
        <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
          Aviso de Confidencialidade
        </h5>
        <p className="text-[9px] text-slate-400 leading-tight font-medium uppercase tracking-tighter">
          Este documento contém projeções financeiras proprietárias. A
          distribuição, cópia ou divulgação não autorizada é estritamente
          proibida. Os valores são estimativas baseadas nas condições atuais de
          mercado.
        </p>
      </div>

      <div className="text-right">
        <p className="text-[10px] text-slate-400 font-bold mt-1">
          Gerado em: 13/02/2026
        </p>
      </div>
    </footer>
  );
}
