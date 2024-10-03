import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import JournalEntryCard from "../components/journal/journalEntryCard";
import JournalEntryForm from "../components/trade/journalEntryForm";

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  //fetch journal entries
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axiosPrivate.get("/journalEntries");
        setJournalEntries(response.data.data);
        // console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <>
      {/* <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-primary m-1">
          Add Journal Entry
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <JournalEntryForm />
        </ul>
      </div> */}

      {/* <div className="flex flex-col items-center justify-center gap-12 p-6">
        <JournalEntryForm />
      </div> */}

      <div className="mt-8 flex flex-col">
        <h1 className="text-center text-7xl font-bold text-base-content">
          Your Journal
        </h1>
        <h3 className="mt-5 flex flex-row justify-center text-2xl font-semibold">
        Record, analyze, and improve with every trade you make
        </h3>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-12 p-6">
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
    </>
  );
}

export default Journal;
