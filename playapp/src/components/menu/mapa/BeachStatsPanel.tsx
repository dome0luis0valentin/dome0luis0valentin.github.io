"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BeachWithScores, Rating } from "@/data/beaches";
import Image from "next/image";
import { beachLevelScoreUrls } from "@/data/beaches";
import { useBeaches } from "@/app/context/BeachesContext";
import { useTheme } from "@/app/context/ThemeContext";
import { users } from "@/data/users";

interface BeachStatsPanelProps {
  beach: BeachWithScores;
  onClose: () => void;
}

export default function BeachStatsPanel({
  beach,
  onClose,
}: BeachStatsPanelProps) {
  const [activeTab, setActiveTab] = useState<"scores" | "opinions">("scores");
  const { beachRatings } = useBeaches();
  const { darkMode } = useTheme();
  const router = useRouter();

  const handleOpinar = () => router.push(`/menu/opinar?playa=${beach.id}`);
  const opiniones = beachRatings[beach.id] ?? [];

  const getIconUrlForScore = (score: number) =>
    beachLevelScoreUrls[`nivel${score}` as keyof typeof beachLevelScoreUrls];

  const getEmojiFinalScore = (score: number) => {
    if (score >= 7) return "😀";
    if (score >= 5) return "🙂";
    if (score >= 3) return "😐";
    return "🙁";
  };

  const getEmojiColor = (score: number) => {
    if (score >= 7) return "bg-green-400";
    if (score >= 5) return "bg-yellow-300";
    if (score >= 3) return "bg-orange-500";
    return "bg-red-600";
  };

  const getTextColorForFinalScore = (score: number) => {
    if (score >= 7 || score >= 5) return "text-black";
    return "text-white";
  };

  const getTextColorForBackground = (
    color: "green" | "yellow" | "orange" | "red"
  ): "white" | "black" => {
    return color === "yellow" || color === "green" ? "black" : "white";
  };

  const getUserById = (id: number) => users.find((u) => u.id === id);

  if (!beach.scores) {
    return (
      <div className="p-4 text-white">
        No hay datos de puntuación para esta playa.
      </div>
    );
  }

  const scores = beach.scores!;
  const score = scores.finalScore;
  const scoreColor = getEmojiColor(score);
  const textColor = getTextColorForFinalScore(score);

  return (
    <aside
      className={`rounded-t-3xl shadow-xl w-full max-w-none h-[480px] mx-0 max-h-screen flex flex-col
    ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 sticky top-0 z-20 bg-inherit">
        <h2 className="text-lg font-bold truncate">{beach.name}</h2>
        <button
          onClick={onClose}
          className={`text-xl font-semibold hover:opacity-70 ${
            darkMode ? "text-white" : "text-black"
          }`}
          aria-label="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
        {opiniones.length > 0 && (
        <div className="flex space-x-2 sticky top-[56px] z-10 bg-inherit px-3 pb-1">
          <button
            onClick={() => setActiveTab("scores")}
            className={`flex-1 py-1.5 rounded-t-lg font-semibold text-center text-sm ${
              activeTab === "scores"
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Puntaje
          </button>
          <button
            onClick={() => setActiveTab("opinions")}
            className={`flex-1 py-1.5 rounded-t-lg font-semibold text-center text-sm ${
              activeTab === "opinions"
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Opiniones ({opiniones.length})
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 px-3 pb-3 pt-[44px]">
        {activeTab === "scores" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
              <StatItem
                {...getStatProps("Calidad de Arena", "🏖️", scores.arena)}
              />
              <StatItem
                {...getStatProps("Calidad del Agua", "🌊", scores.agua)}
              />
              <StatItem
                {...getStatProps("Concurrencia", "👨‍👩‍👧", scores.concurrencia)}
              />
              <StatItem {...getStatProps("Limpieza", "🧹", scores.limpieza)} />
              <StatItem
                {...getStatProps("Tranquilidad", "☮️", scores.tranquilidad)}
              />
              <StatItem
                {...getStatProps("Atracciones", "🎡", scores.atracciones)}
              />
            </div>

            <div
              className={`flex items-center justify-between px-2 py-1 rounded-md mb-3 ${scoreColor}`}
            >
              <span className={`text-lg ${textColor}`}>
                {getEmojiFinalScore(score)}
              </span>
              <span className={`font-bold ${textColor} text-sm`}>
                Puntuación: {scores.finalScore.toFixed(2)}/10
              </span>
            </div>

            <button
              onClick={handleOpinar}
              className={`w-full font-semibold py-1.5 rounded-md shadow-sm text-sm transition ${
                darkMode
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Opinar
            </button>
          </>
        )}

        {activeTab === "opinions" && (
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Opiniones de usuarios
            </h3>
            <div className="space-y-3">
              {opiniones.map((op, idx) => {
                const user = getUserById(op.userId);
                const ratingItems: (keyof Rating)[] = [
                  "arena",
                  "agua",
                  "concurrencia",
                  "limpieza",
                  "tranquilidad",
                  "atracciones",
                ];

                return (
                  <div
                    key={idx}
                    className={`rounded-lg shadow px-3 py-2 flex flex-col gap-2 ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Image
                        src={user?.photo || "/default-user.png"}
                        alt={user?.username || "Usuario"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user?.username || "Usuario anónimo"}
                        </p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {op.fecha}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {op.comentario}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {ratingItems.map((item) => {
                        const value = op.rating[item];
                        const nivel =
                          `nivel${value}` as keyof typeof beachLevelScoreUrls;
                        const iconUrl = beachLevelScoreUrls[nivel];
                        const label =
                          item.charAt(0).toUpperCase() + item.slice(1);

                        return (
                          <div key={item} className="flex items-center gap-2">
                            <span
                              className={`text-sm ${
                                darkMode ? "text-gray-200" : "text-gray-700"
                              }`}
                            >
                              {label}:
                            </span>
                            <Image
                              src={iconUrl}
                              alt={nivel}
                              width={28}
                              height={28}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  function getStatProps(label: string, icon: string, value: number) {
    const color = getColor(value);
    return {
      color,
      icon,
      label,
      value,
      iconUrl: getIconUrlForScore(value),
      textColor: getTextColorForBackground(color),
    };
  }
}

function getColor(score: number): "green" | "yellow" | "orange" | "red" {
  if (score === 4) return "green";
  if (score === 3) return "yellow";
  if (score === 2) return "orange";
  return "red";
}

interface StatItemProps {
  color: "green" | "yellow" | "orange" | "red";
  icon: string;
  label: string;
  value: number;
  textColor?: "white" | "black";
  iconUrl: string;
}

function StatItem({
  color,
  icon,
  label,
  value,
  textColor = "white",
  iconUrl,
}: StatItemProps) {
  const bg = {
    green: "bg-green-400",
    yellow: "bg-yellow-300",
    orange: "bg-orange-500",
    red: "bg-red-600",
  }[color];
  const txt = textColor === "white" ? "text-white" : "text-black";

  return (
    <div className={`${bg} flex items-center justify-between p-1 rounded-md`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className={`font-bold text-sm ${txt}`}>{label.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-lg">
        <Image
          src={iconUrl}
          alt={`Nivel ${value}`}
          width={40}
          height={40}
          className="ml-1"
        />
      </div>
    </div>
  );
}
