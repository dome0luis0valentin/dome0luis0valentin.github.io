"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import {
  beachLocations,
  calculateAggregatedScoresWithFinalTen,
  beachRatings as initialBeachRatings,
  BeachWithScores,
  UserRating,
  Rating,
} from "@/data/beaches";

interface BeachesContextType {
  beachRatings: Record<number, UserRating[]>;
  beachesWithScores: BeachWithScores[];
  addOpinion: (beachId: number, opinion: UserRating) => void;
  editOpinion: (beachId: number, updatedOpinion: UserRating) => void;
  deleteOpinion: (beachId: number, opinionId: number) => void;

  selectedFilters: number[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<number[]>>;

  filteredScoresByFilter: Record<number, number>; // puntaje filtrado para cada playa
}

// Mapeo índices de filtros a keys de rating
const ratingKeysMap: Record<number, keyof Rating> = {
  0: "arena",
  1: "agua",
  2: "limpieza",
  3: "tranquilidad",
  4: "atracciones",
};

const BeachesContext = createContext<BeachesContextType | undefined>(undefined);

export function BeachesProvider({ children }: { children: ReactNode }) {
  const [beachRatings, setBeachRatings] = useState<Record<number, UserRating[]>>(initialBeachRatings);

  const [beachesWithScores, setBeachesWithScores] = useState<BeachWithScores[]>(() => {
    return beachLocations.map((beach) => {
      const userRatings = initialBeachRatings[beach.id] || [];
      const scores = calculateAggregatedScoresWithFinalTen(userRatings.map((r) => r.rating));
      return { ...beach, scores };
    });
  });

  // Estado para filtros seleccionados: por defecto todos (0..4)
  const [selectedFilters, setSelectedFilters] = useState<number[]>([0, 1, 2, 3, 4]);

  // Función para actualizar los scores luego de agregar/editar/borrar opiniones
  const updateScores = (beachId: number, updatedList: UserRating[]) => {
    const scores = calculateAggregatedScoresWithFinalTen(updatedList.map((r) => r.rating));
    setBeachesWithScores((prev) =>
      prev.map((b) => (b.id === beachId ? { ...b, scores } : b))
    );
  };

  function addOpinion(beachId: number, opinion: UserRating) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: [...(prev[beachId] || []), opinion],
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  function editOpinion(beachId: number, updatedOpinion: UserRating) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: prev[beachId].map((op) =>
          op.id === updatedOpinion.id ? updatedOpinion : op
        ),
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  function deleteOpinion(beachId: number, opinionId: number) {
    setBeachRatings((prev) => {
      const updated = {
        ...prev,
        [beachId]: prev[beachId].filter((op) => op.id !== opinionId),
      };
      updateScores(beachId, updated[beachId]);
      return updated;
    });
  }

  // Calcular puntajes temporales para cada playa según filtros seleccionados
  const filteredScoresByFilter = useMemo(() => {
    if (selectedFilters.length === 0) return {};

    // Para cada playa:
    // - saco todas las opiniones
    // - calculo promedio solo de los filtros seleccionados
    // - escalo a 1-10

    const result: Record<number, number> = {};

    for (const beach of beachLocations) {
      const ratings = beachRatings[beach.id];
      if (!ratings || ratings.length === 0) {
        result[beach.id] = 1; // mínimo puntaje si no hay datos
        continue;
      }

      // Calcular promedio para filtros seleccionados
      let sum = 0;
      let count = 0;
      for (const ratingObj of ratings) {
        for (const filterIndex of selectedFilters) {
          const key = ratingKeysMap[filterIndex];
          if (key && ratingObj.rating[key] !== undefined) {
            sum += ratingObj.rating[key];
            count++;
          }
        }
      }
      const avg = count > 0 ? sum / count : 1;

      // Escalar promedio (1-4) a 1-10 usando la función scaleToTen (importarla o definir acá)
      const scaleToTen = (value: number): number => {
        return +(1 + (value - 1) * 3).toFixed(2);
      };

      result[beach.id] = scaleToTen(avg);
    }

    return result;
  }, [beachRatings, selectedFilters]);

  return (
    <BeachesContext.Provider
      value={{
        beachRatings,
        beachesWithScores,
        addOpinion,
        editOpinion,
        deleteOpinion,

        selectedFilters,
        setSelectedFilters,

        filteredScoresByFilter,
      }}
    >
      {children}
    </BeachesContext.Provider>
  );
}

export function useBeaches() {
  const context = useContext(BeachesContext);
  if (!context) throw new Error("useBeaches must be used within BeachesProvider");
  return context;
}
