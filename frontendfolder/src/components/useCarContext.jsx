import { useContext } from "react";
import { CarContext } from "./FetchCarDetails";

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context)
    throw new Error("useCarContext must be used within FetchCarDetails");
  return context;
};
