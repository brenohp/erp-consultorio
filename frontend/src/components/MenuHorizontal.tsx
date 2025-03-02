"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";

export default function MenuHorizontal() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <nav
      className="bg-[#1E90FF] text-white px-6 py-3 flex justify-between items-center shadow-lg"
      tabIndex={-1} // Evita que o menu receba foco
    >
      {/* Logo (maior) */}
      <div className="text-2xl font-extrabold">
        <span className="text-white">Clinical</span>
        <span className="text-blue-900">App</span>
      </div>

      {/* Abas do Menu (mais espaçadas) */}
      <ul className="flex space-x-10 text-lg font-medium">
        <li>
          <Link href="/agenda" className="hover:text-gray-200 transition">
            Agenda
          </Link>
        </li>
        <li>
          <Link href="/pacientes" className="hover:text-gray-200 transition">
            Pacientes
          </Link>
        </li>
        <li>
          <Link href="/relatorios" className="hover:text-gray-200 transition">
            Relatório
          </Link>
        </li>
        <li>
          <Link href="/recursos" className="hover:text-gray-200 transition">
            Recursos
          </Link>
        </li>
      </ul>

      {/* Notificações e Menu do Usuário */}
      <div className="flex items-center space-x-6">
        {/* Ícone de notificações */}
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-200 transition" />

        {/* Menu do usuário */}
        <div className="relative" ref={menuRef}>
          <div
            role="button"
            tabIndex={0}
            className="flex items-center space-x-2 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-lg transition"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <img
              src="/user.jpg"
              alt="Usuário"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="text-sm font-semibold">Nome do Usuário</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Dropdown do usuário */}
          {menuAberto && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md overflow-hidden">
              <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">
                Perfil
              </Link>
              <Link href="/configuracoes" className="block px-4 py-2 hover:bg-gray-100">
                Configurações
              </Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
