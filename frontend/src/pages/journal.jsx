import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import JournalEntryCard from "../components/journal/journalEntryCard";
import JournalEntryForm from "../components/trade/journalEntryForm";

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filter, setFilter] = useState("All");
  const axiosPrivate = useAxiosPrivate();
  //fetch journal entries
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axiosPrivate.get("/journalEntries");
        setJournalEntries(response.data.data);
        setFilteredEntries(response.data.data);
        // console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);

  const handleClick = (term) => {
    setFilter(term);
    if (term === "All") {
      setFilteredEntries(journalEntries);
    } else {
      const filtered = journalEntries.filter(
        (entry) => entry.trade_result === term,
      );
      setFilteredEntries(filtered);
    }
  };

  const handleDelete = (entry_id) => {
    axiosPrivate
      .delete(`/journalEntries/${entry_id}`)
      .then((response) => {
        console.log("Entry Deleted:", response.data);
        setJournalEntries(journalEntries.filter((entry) => entry.entry_id !== entry_id));
        setFilteredEntries(filteredEntries.filter((entry) => entry.entry_id !== entry_id));
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  return (
    <>
      <div className="mt-8 flex flex-col">
        <h1 className="text-center text-7xl font-bold text-base-content">
          Your Journal
        </h1>
        <h3 className="mt-5 flex flex-row justify-center text-2xl font-semibold">
          Record, analyze, and improve with every trade you make
        </h3>
      </div>

      <div className="flex gap-2 justify-center mt-12">
        <button
          onClick={() => handleClick("All")}
          className={`btn btn-sm rounded-xl ${filter === "All" ? "btn-primary" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => handleClick("Winner")}
          className={`btn btn-sm rounded-xl ${filter === "Winner" ? "btn-primary" : ""}`}
        >
          Winner
        </button>
        <button
          onClick={() => handleClick("Loser")}
          className={`btn btn-sm rounded-xl ${filter === "Loser" ? "btn-primary" : ""}`}
        >
          Loser
        </button>
        <button
          onClick={() => handleClick("Break Even")}
          className={`btn btn-sm rounded-xl ${filter === "Break Even" ? "btn-primary" : ""}`}
        >
          Break Even
        </button>
      </div>

      <div className="flex flex-col items-center gap-12 p-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((item, index) => (
            <JournalEntryCard
              key={index}
              entryId={item.entry_id}
              trade_result={item.trade_result}
              currency={item.currency}
              img={item.img}
              entryDate={item.entry_date}
              reasoning={item.reasoning}
              mood={item.mood}
              marketConditions={item.market_conditions}
              selfReflection={item.self_reflection}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default Journal;
