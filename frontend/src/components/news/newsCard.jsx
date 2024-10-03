function NewsCard(props) {
  // console.log("PROPS:", props);
  return (
    <>
      <a
        href={props.url}
        target="_blank"
        className="cursor-pointer rounded-2xl hover:bg-gray-100"
      >
        <div className="flex flex-row gap-x-4 p-3">
          {props.img && (
            <img
              className="h-20 w-20 rounded-2xl  object-cover"
              src={props.img}
              alt={props.alt}
            />
          )}
          <div>
            <div className="flex flex-row gap-x-2 text-sm font-medium text-gray-400">
              <span>{`${new Date(props.dateUploaded).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: '2-digit'})} ${"\u2022"} ${props.newsSource}`}</span>
              {/* <span>{"\u2022"}</span>
              <span>{props.newsSource}</span> */}
            </div>
            <p className="font-semibold text-medium">{props.title.length > 100 ? props.title.slice(0, 100) + "..." : props.title}</p>
          </div>
        </div>
      </a>
    </>
  );
}
export default NewsCard;
