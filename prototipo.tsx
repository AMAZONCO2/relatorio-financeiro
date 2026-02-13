import React, { useState } from 'react';
import { 
  Download, 
  Leaf, 
  Info, 
  TrendingUp, 
  Percent, 
  BarChart3, 
  Clock, 
  ShieldCheck, 
  Moon, 
  Sun,
  Database,
  Calendar,
  Zap,
  DollarSign,
  Scale,
  BarChart as BarChartIcon
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, LineChart, Line, ComposedChart, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';

// --- Dados Simulados Baseados na Estrutura do Projeto ---
const kpiData = [
  { label: "VPL TOTAL (WACC 12%)", value: "R$ 1.24B", sub: "+ 4.2% vs Base Case", icon: <Database className="w-5 h-5 text-emerald-500" />, border: "border-emerald-500", color: "text-emerald-500" },
  { label: "TIR GLOBAL (IRR)", value: "42.8%", sub: "High Confidence", icon: <Percent className="w-5 h-5 text-blue-500" />, border: "border-blue-500", color: "text-blue-500" },
  { label: "ROI TOTAL (40Y)", value: "18.5x", sub: "Total Multiplier", icon: <BarChart3 className="w-5 h-5 text-purple-500" />, border: "border-purple-500", color: "text-purple-500" },
  { label: "ROI (5 ANOS)", value: "3.2x", sub: "Short Term Return", icon: <Clock className="w-5 h-5 text-orange-500" />, border: "border-orange-500", color: "text-orange-500" }
];

const smallMetrics = [
  { label: "RETORNO POR VCU", value: "R$ 48.50", unit: "/ VCU", icon: <DollarSign className="w-4 h-4" />, progress: 70, color: "bg-blue-500" },
  { label: "MÉDIA RECEITA ANUAL", value: "R$ 213.3M", unit: "", icon: <Calendar className="w-4 h-4" />, progress: 95, color: "bg-emerald-500" },
  { label: "CUSTO MÉDIO (OPEX)", value: "R$ 2.5M", unit: "/ ano", icon: <TrendingUp className="w-4 h-4" />, progress: 15, color: "bg-orange-500" },
  { label: "PAYBACK (PONTO EQUILÍBRIO)", value: "Year 2.4", unit: "", icon: <Scale className="w-4 h-4" />, progress: 10, color: "bg-purple-500" }
];

const radarData = [
  { subject: 'VPL Potential', A: 95, B: 65, fullMark: 150 },
  { subject: 'Cash Flow Vol', A: 90, B: 50, fullMark: 150 },
  { subject: 'Risk Adj. Return', A: 85, B: 95, fullMark: 150 },
  { subject: 'Social Impact', A: 100, B: 40, fullMark: 150 },
  { subject: 'Margin %', A: 80, B: 90, fullMark: 150 },
];

// Dados anuais detalhados para o novo gráfico de barras
const annualBarData = [
  { year: '2024', flow: -100, status: 'invest' },
  { year: '2025', flow: -20, status: 'invest' },
  { year: '2026', flow: 45, status: 'profit' },
  { year: '2027', flow: 180, status: 'profit' },
  { year: '2028', flow: 218, status: 'profit' },
  { year: '2029', flow: 218, status: 'profit' },
  { year: '2030', flow: 218, status: 'profit' },
  { year: '2031', flow: 218, status: 'profit' },
  { year: '2032', flow: 218, status: 'profit' },
  { year: '2033', flow: 218, status: 'profit' },
  { year: '2034', flow: 230, status: 'profit' },
  { year: '2035', flow: 245, status: 'profit' },
];

const cashFlowData = [
  { name: '2024', liquid: 0, accumulated: 0 },
  { name: '2028', liquid: 45, accumulated: 120 },
  { name: '2032', liquid: 90, accumulated: 380 },
  { name: '2036', liquid: 140, accumulated: 750 },
  { name: '2040', liquid: 160, accumulated: 1100 },
  { name: '2044', liquid: 180, accumulated: 1400 },
  { name: '2048', liquid: 195, accumulated: 1650 },
  { name: '2052', liquid: 210, accumulated: 1850 },
  { name: '2056', liquid: 220, accumulated: 2000 },
  { name: '2060', liquid: 235, accumulated: 2150 },
  { name: '2064', liquid: 250, accumulated: 2300 },
];

const waterfallData = [
  { name: 'Gross Revenue', value: 8857, color: '#0284c7' },
  { name: 'PIS/COFINS', value: -323, color: '#ef4444' },
  { name: 'OpEx', value: -100, color: '#f59e0b' },
  { name: 'IR/CSLL', value: -655, color: '#ef4444' },
  { name: 'Net Result', value: 7779, color: '#059669' },
];

const paretoData = [
  { name: 'IR/CSLL', cost: 655, cumulative: 55 },
  { name: 'PIS/COFINS', cost: 323, cumulative: 75 },
  { name: 'OpEx', cost: 100, cumulative: 88 },
  { name: 'Admin Fees', cost: 50, cumulative: 94 },
  { name: 'Other', cost: 20, cumulative: 100 },
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-6 transition-colors duration-300">
        
        {/* Header */}
        <header className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-6 no-print">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">Análise Financeira Avançada</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Projeto Carbono 40 Anos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">System Version</p>
              <div className="flex items-center gap-1.5 justify-end">
                <ShieldCheck className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-bold">Financial Engine v2.0</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition shadow-lg">
                <Download className="w-4 h-4" /> PDF Export
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Top KPIs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, i) => (
              <div key={i} className={`bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 ${kpi.border} shadow-sm flex items-center justify-between`}>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-2xl font-black">{kpi.value}</h3>
                  <p className={`text-[10px] font-bold mt-1 ${kpi.color}`}>{kpi.sub}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-full">
                  {kpi.icon}
                </div>
              </div>
            ))}
          </section>

          {/* DRE Table & Radar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">DRE Consolidado (Income Statement)</h3>
                <span className="text-[9px] text-slate-400 font-bold">2024 - 2064 Total Projection</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[9px] text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Descrição</th>
                      <th className="px-6 py-4 text-right">Total Projeto</th>
                      <th className="px-6 py-4 text-right text-emerald-500">Comunidade (70%)</th>
                      <th className="px-6 py-4 text-right text-blue-500">ACC (Desenvolvedor)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-6 py-4">Receita Bruta</td>
                      <td className="px-6 py-4 text-right font-bold">R$ 8.857M</td>
                      <td className="px-6 py-4 text-right text-slate-400">-</td>
                      <td className="px-6 py-4 text-right text-slate-400">-</td>
                    </tr>
                    <tr className="text-rose-500">
                      <td className="px-6 py-4">(-) Impostos Diretos (PIS/COFINS)</td>
                      <td className="px-6 py-4 text-right font-bold">(R$ 323M)</td>
                      <td className="px-6 py-4 text-right text-slate-400">-</td>
                      <td className="px-6 py-4 text-right text-slate-400">-</td>
                    </tr>
                    <tr className="bg-slate-50/30 dark:bg-slate-800/20 font-bold">
                      <td className="px-6 py-4">(=) Receita Líquida</td>
                      <td className="px-6 py-4 text-right">R$ 8.534M</td>
                      <td className="px-6 py-4 text-right text-emerald-500">R$ 5.974M</td>
                      <td className="px-6 py-4 text-right text-blue-500">R$ 2.560M</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">(-) Custos Operacionais (OpEx)</td>
                      <td className="px-6 py-4 text-right font-bold">(R$ 100M)</td>
                      <td className="px-6 py-4 text-right text-slate-400">Included</td>
                      <td className="px-6 py-4 text-right text-slate-400">(R$ 100M)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">(-) Impostos de Renda (IR/CSLL)</td>
                      <td className="px-6 py-4 text-right font-bold">(R$ 655M)</td>
                      <td className="px-6 py-4 text-right text-slate-400">Isento</td>
                      <td className="px-6 py-4 text-right text-slate-400">(R$ 655M)</td>
                    </tr>
                    <tr className="bg-emerald-500 text-white font-black border-t-2 border-emerald-600">
                      <td className="px-6 py-5">(=) Resultado Líquido do Projeto</td>
                      <td className="px-6 py-5 text-right uppercase">R$ 7.779M</td>
                      <td className="px-6 py-5 text-right uppercase">R$ 5.974M</td>
                      <td className="px-6 py-5 text-right uppercase">R$ 1.805M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Performance Dimensions</h3>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                    <Radar name="Community" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Radar name="Developer" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Small Metric Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {smallMetrics.map((m, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{m.label}</p>
                  <div className="text-slate-300">{m.icon}</div>
                </div>
                <div className="text-lg font-black">{m.value} <span className="text-[10px] text-slate-400 font-medium">{m.unit}</span></div>
                <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color}`} style={{ width: `${m.progress}%` }}></div>
                </div>
              </div>
            ))}
          </section>

          {/* NOVO GRÁFICO: FLUXO DE CAIXA ANUAL EM BARRAS */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <BarChartIcon className="w-4 h-4 text-emerald-500" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fluxo de Caixa Total Anual do Projeto (Visão Detalhada)</h3>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded bg-rose-500" /> Investimento</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded bg-emerald-500" /> Superávit</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={annualBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `R$ ${v}M`} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="flow" radius={[4, 4, 0, 0]}>
                    {annualBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.flow < 0 ? '#f43f5e' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Charts Row 2 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cash Flow Projection (Liquid vs Accumulated)</h3>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Liquid</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-slate-800" /> Accumulated</span>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 700 }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `R$ ${v}M`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `R$ ${v}M`} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area yAxisId="left" type="monotone" dataKey="liquid" stroke="#10b981" strokeWidth={3} fill="rgba(16, 185, 129, 0.1)" />
                    <Area yAxisId="right" type="monotone" dataKey="accumulated" stroke="#1e293b" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">DRE Decomposition (Waterfall)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterfallData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#94a3b8', fontWeight: 700 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value">
                      {waterfallData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Pareto Chart */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cost Drivers (Pareto ABC Analysis)</h3>
                <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase">Impact of taxes and operational costs on Gross Revenue</p>
              </div>
              <button className="text-[10px] font-black text-blue-500 hover:underline uppercase tracking-tighter">Download CSV</button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={paretoData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 700 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `R$ ${v}`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="cost" fill="#1e293b" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="max-w-[1400px] mx-auto mt-12 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="text-emerald-500 w-5 h-5" />
              <span className="font-black text-sm tracking-tighter">Amazon Connection Carbon</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-tighter">
              Leading sustainable development through high-integrity carbon credits in the Amazon basin.
            </p>
          </div>
          
          <div className="flex-1 max-w-lg">
            <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Confidentiality Notice</h5>
            <p className="text-[9px] text-slate-400 leading-tight font-medium uppercase tracking-tighter">
              This document contains proprietary financial projections. Unauthorized distribution, copying, or disclosure is strictly prohibited. Figures are estimates based on current market conditions.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Project ID: AMZ-CNX-2024</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1">Generated: 2026-02-13</p>
            <div className="flex gap-4 mt-4 text-[9px] font-black text-blue-500 uppercase tracking-tighter">
              <a href="#" className="hover:underline">Legal Disclaimer</a>
              <a href="#" className="hover:underline">Methodology</a>
            </div>
          </div>
        </footer>

        {/* Print Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; font-size: 10pt; }
            .bg-slate-50, .dark .bg-slate-950 { background: white !important; }
            .shadow-sm, .shadow-lg { box-shadow: none !important; }
            .border { border-color: #f1f5f9 !important; }
            .max-w-[1400px] { max-width: 100% !important; margin: 0 !important; }
            .grid { display: grid !important; }
            .rounded-xl { border-radius: 8px !important; }
          }
        `}} />
      </div>
    </div>
  );
};

export default App;