import { ClockIcon } from "@heroicons/react/24/outline";

function AcademyVerticalCard(props) {
  return (
    <>
      {/* <div className="flex flex-col rounded-xl shadow-md xl:max-w-[357px]"> */}

      <div className="flex flex-col rounded-2xl shadow-md xl:max-w-[357px]">
        <img
          className="rounded-2xl object-cover"
          src={props.img}
          alt={props.alt}
        />

        <a
          href={props.url}
          target="_blank"
          className="mt-3 px-5 text-xl font-semibold text-base-content hover:underline"
        >
          {props.title}
        </a>

        <p className="font-small mt-3 px-5 text-base text-[#797A7B]">
          {props.body}
        </p>

        <div className="mt-3 flex flex-row items-center gap-4 px-5 pb-4">
          <button
            className={`flex items-center rounded-xl px-3 py-2 text-xs font-medium text-base-content 
              ${props.difficulty === "Beginner" 
                ? "bg-[#c3faae]" 
                : props.difficulty === "Indermediate" 
                ? "bg-[#fffba8]" 
                : props.difficulty === "Advanced" 
                ? "bg-[#ffa8a8]" 
                : ""} `}
          >
            {props.difficulty}
          </button>

          {/* <p className="text-base font-medium text-[#797A7B]">{props.date}</p> */}

          <p className="flex flex-row items-center text-base font-medium text-[#797A7B]">
            <ClockIcon className="mr-1 h-4 w-4" />
            {props.duration}min
          </p>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}

export default AcademyVerticalCard;
