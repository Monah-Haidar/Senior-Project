import { ClockIcon } from "@heroicons/react/24/outline";

function AcademyVerticalCard(props) {
  return (
    <>
      <div className="bg-base-100 rounded-xl xl:max-w-[357px] shadow-md overflow-hidden max-w-5/12">
        <div className="flex flex-col">
          <div className="">
            <img
              className="object-cover h-full w-full rounded-2xl"
              src={props.img}
              alt={props.alt}
            />
          </div>

          <div className="flex flex-col gap-10 p-8">
            <div className="text-base-content text-xl font-display font-semibold hover:underline">
              <a href={props.url} target="_blank">
                {props.title}
              </a>
              {/* <Link to={props.url}>{props.title}</Link> */}
            </div>
            <p className="text-base text-[#797A7B] font-body font-small">{props.body}</p>

            <div className="flex flex-row items-center gap-4">
              <button className="bg-[#FFE5A8] text-base-content font-body font-medium px-3 py-2 rounded-xl text-xs flex items-center">
                {props.difficulty}
              </button>

              <p className="text-base text-[#797A7B] font-body font-medium">
                {props.date}
              </p>

              <p className="flex flex-row text-base text-[#797A7B] font-body font-medium">
                <ClockIcon className="w-4 h-4 items-center" />
                {props.duration} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademyVerticalCard;
