import { useEffect, useState } from "react";

const useDateFormat = (dateString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatted = formatDate(dateString);
    setFormattedDate(formatted);
  }, [dateString]);

  const formatDate = (dateString) => {
    
    const date = new Date(dateString);
    
    
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    
    const formattedDate = date.toLocaleDateString("en-US", options);
    
    return formattedDate;
  };

  return formattedDate;
};

export default useDateFormat;
