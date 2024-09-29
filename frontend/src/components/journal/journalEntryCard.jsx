function JournalEntryCard(props) {
  return (
    <>
      <div className=" w-10/12">
        <div className="card card-side bg-base-100 shadow-xl">
          <h2 className="card-title font-bold">{props.title}</h2>
          <h4 className=" font-semibold ">Entry Date: {props.entryDate}</h4>

          <figure className="w-1/3">
            {props.img ? <img src={props.img} className="" alt="img" /> : ""}
          </figure>

          <div className="card-body">
            <h4 className="font-semibold ">
              Reasoning: <span className=" font-normal">{props.reasoning}</span>
            </h4>

            <h4 className=" font-semibold ">
              Mood: <span className=" font-normal">{props.mood}</span>
            </h4>

            <h4 className=" font-semibold ">
              Market condition:{" "}
              <span className=" font-normal">{props.marketConditions}</span>
            </h4>

            <h4 className=" font-semibold ">
              Self reflection:{" "}
              <span className=" font-normal">{props.selfReflection}</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default JournalEntryCard;
