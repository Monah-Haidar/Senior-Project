function JournalEntryCard(props) {
  return (
    <>
      <div className="card card-side ">
        <div className="card-body p-6 relative rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-2xl lg:w-full lg:max-w-5xl mx-8">
        <button
          className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          onClick={() => props.handleDelete(props.entryId)} 
        >
          &times;
        </button>
          <h2
            className={`mb-4 text-xl font-bold ${
              props.trade_result === "Winner"
                ? "text-green-600"
                : props.trade_result === "Loser"
                  ? "text-red-600"
                  : "text-gray-600"
            }`}
          >
            {props.trade_result}: {props.currency}
          </h2>

          <h4 className="text-lg font-semibold text-gray-700">
            Entry Date:{" "}
            <span className="font-normal">
              {new Date(props.entryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </span>
          </h4>

          <h4 className="text-lg font-semibold text-gray-700">
            Reasoning: <span className="font-normal">{props.reasoning}</span>
          </h4>

          <h4 className="text-lg font-semibold text-gray-700">
            Mood: <span className="font-normal">{props.mood}</span>
          </h4>

          <h4 className="text-lg font-semibold text-gray-700">
            Market condition:{" "}
            <span className="font-normal">{props.marketConditions}</span>
          </h4>

          <h4 className="text-lg font-semibold text-gray-700">
            Self reflection:{" "}
            <span className="font-normal">{props.selfReflection}</span>
          </h4>

          {props.img && (
            <h4 className="text-lg font-semibold text-gray-700">
              Image path:{" "}
              <a
                href={props.img}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal text-blue-500 hover:underline"
              >
                Preview Image
              </a>
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default JournalEntryCard;
