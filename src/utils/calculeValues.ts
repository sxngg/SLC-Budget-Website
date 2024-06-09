import { TParticipationData } from "../types";

// Función auxiliar para calcular la suma de porcentajes
export const calculateTotalPercentages = (participationData: TParticipationData) => {
  return Object.values(participationData).reduce((total, data) => total + (data.participationPercentage || 0), 0);
};

// Función auxiliar para calcular la suma de valores exactos
export const calculateTotalStaticValues = (participationData: TParticipationData) => {
  return Object.values(participationData).reduce((total, data) => total + (data.staticValue || 0), 0);
};