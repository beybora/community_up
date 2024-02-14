import { createContext, useEffect, useState } from "react";
import axios from "../axiosinstance";

export const AppDataContext = createContext();

function AppDataProvider({ children }) {
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/places/places");
        setPlaces(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching places:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{ places, loading }}>
      {children}
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;
