"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // Simulação de horários e agendamentos
  const agendamentos: Record<string, string | null> = {
    "08:00": "João Silva",
    "09:00": "Maria Oliveira",
    "10:00": null,
    "11:00": "Carlos Souza",
    "14:00": null,
    "15:00": "Ana Pereira",
    "16:00": null,
    "17:00": "Fernando Lima",
  };

  const horarios = Object.keys(agendamentos);
  const horariosLivres = horarios.filter((hora) => !agendamentos[hora]);

  const alterarData = (dias: number) => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + dias);
    setDataSelecionada(novaData);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Menu abaixo do menu principal */}
      <div className="bg-white p-3 shadow-md flex items-center justify-between rounded-md">
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Nova Consulta</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300" onClick={() => {
            const hoje = new Date();
            setDataSelecionada(hoje);
          }}>Ir para Hoje</button>
          <button className="p-2 hover:bg-gray-200 rounded-md" onClick={() => alterarData(-1)}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-md" onClick={() => alterarData(1)}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="text-lg font-semibold">
            {dataSelecionada.toLocaleDateString("pt-BR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
          <Printer className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Coluna Esquerda */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-3 shadow-md rounded-md flex justify-center">
            <Calendar onChange={(value) => setDataSelecionada(value as Date)} value={dataSelecionada} className="border rounded p-2" />
          </div>
          <div className="bg-white p-3 shadow-md rounded-md">Tarefas do Dia</div>
        </div>

        {/* Centro - Horários do Dia */}
        <div className="col-span-2 bg-white p-3 shadow-md rounded-md min-h-[400px]">
          <h2 className="font-bold mb-4">Horários para {dataSelecionada.toLocaleDateString("pt-BR")}</h2>
          <ul className="space-y-2">
            {horarios.map((hora) => (
              <li key={hora} className={`p-2 shadow rounded-md ${agendamentos[hora] ? 'bg-red-200' : 'bg-green-200'}`}>
                {hora} - {agendamentos[hora] ? `Agendado para ${agendamentos[hora]}` : "Disponível"}
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna Direita - Próximos Horários Livres */}
        <div className="col-span-1 bg-white p-3 shadow-md rounded-md">
          <h2 className="font-bold">Próximos Horários Livres</h2>
          <p className="text-gray-500">
            {dataSelecionada.toLocaleDateString("pt-BR", { weekday: 'long' })}, {dataSelecionada.toLocaleDateString("pt-BR")}
          </p>
          <ul className="mt-2 space-y-2">
            {horariosLivres.map((hora) => (
              <li key={hora} className="p-2 bg-blue-100 shadow rounded-md cursor-pointer hover:bg-blue-200">
                {hora}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
