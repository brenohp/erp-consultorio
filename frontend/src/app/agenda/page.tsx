"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "@/components/Modal";

export default function Agenda() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [modalAberto, setModalAberto] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("Presencial");

  const horariosDisponiveis = [
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const alterarData = (dias: number) => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + dias);
    setDataSelecionada(novaData);
  };

  const abrirModal = (hora: string) => {
    setHorarioSelecionado(hora);
    setModalAberto(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Menu abaixo do menu principal */}
      <div className="bg-white p-3 shadow-md flex items-center justify-between rounded-md">
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Nova Consulta</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300" onClick={() => {
            setDataSelecionada(new Date());
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
            {horariosDisponiveis.map((hora) => (
              <li key={hora} className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700 w-16">{hora}</span>
                <div className="flex-1 p-4 shadow rounded-md bg-gray-100 cursor-pointer hover:bg-gray-200" onClick={() => abrirModal(hora)}>
                  (Clique para agendar)
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna Direita - Próximos Horários Livres */}
        <div className="col-span-1 bg-white p-3 shadow-md rounded-md max-h-[400px] overflow-y-auto">
          <h2 className="font-bold">Próximos Horários Livres</h2>
          {[...Array(5)].map((_, index) => {
            const novaData = new Date(dataSelecionada);
            novaData.setDate(novaData.getDate() + index);
            return (
              <div key={index} className="mb-4">
                <p className="text-gray-500 font-semibold">
                  {novaData.toLocaleDateString("pt-BR", { weekday: 'long' })}, {novaData.toLocaleDateString("pt-BR")}
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {horariosDisponiveis.map((hora) => (
                    <li key={hora} className="p-2 bg-blue-100 shadow rounded-md cursor-pointer hover:bg-blue-200">
                      {hora}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Agendamento */}
      {modalAberto && (
        <Modal onClose={() => setModalAberto(false)}>
          <h2 className="text-xl font-semibold">Agendar para {dataSelecionada.toLocaleDateString("pt-BR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, às {horarioSelecionado}</h2>
          <input type="text" placeholder="Nome do paciente" className="border p-2 w-full mt-4 focus:outline-blue-500" autoFocus />
          <select className="border p-2 w-full mt-2">
            <option>Selecione a clínica</option>
            <option>Clínica A</option>
            <option>Clínica B</option>
          </select>
          <select className="border p-2 w-full mt-2">
            <option>Tipo de consulta</option>
            <option>Particular</option>
            <option>Convênio</option>
          </select>
          <input type="text" placeholder="Endereço" className="border p-2 w-full mt-2 focus:outline-blue-500" />

          {/* Seleção de Presencial ou Teleconsulta */}
          <div className="flex justify-between mt-4">
            {["Presencial", "Teleconsulta"].map((tipo) => (
              <div
                key={tipo}
                className={`p-3 border-2 rounded-md cursor-pointer w-1/2 text-center ${
                  tipoConsulta === tipo ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => setTipoConsulta(tipo)}
              >
                {tipo}
              </div>
            ))}
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 w-full">Agendar</button>
        </Modal>
      )}
    </div>
  );
}
