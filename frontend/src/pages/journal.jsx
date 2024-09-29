import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import JournalEntryCard from "../components/journal/journalEntryCard";

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  //fetch journal entries
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axiosPrivate.get(
          "/journalEntries"
        );
        setJournalEntries(response.data.data);
        // console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center p-6 gap-12">
      {journalEntries.length > 0 ? (
        journalEntries.map((item, index) => (
          <JournalEntryCard
            key={index}
            title={item.title}
            img={item.img}
            entryDate={item.entry_date}
            reasoning={item.reasoning}
            mood={item.mood}
            marketConditions={item.market_conditions}
            selfReflection={item.self_reflection}
          />
        ))
      ) : (
        <p>Loading Journal Entries...</p>
      )}
    </div>
  );
}

export default Journal;
