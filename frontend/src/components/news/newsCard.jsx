function NewsCard(props) {
  return (
    <>
      <a href={props.url} 
      target="_blank"
      
      className="rounded-2xl w-full hover:bg-base-300 p-2 border-2 border-black bg-white">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="object-cover h-20 w-20 rounded-2xl"
            src={props.img}
            alt={props.alt}
          />
          <div className=" flex flex-col gap-3">
            <ul className="flex flex-col gap-1" >
              <li className=" font-bold">{props.title}</li>
              <li>{props.dateUploaded}</li>
              <li>{props.newsSource}</li>
            </ul>

            <div className="flex flex-row justify-between gap-x-6">
              <p className="text-base">{props.body}</p>
              <p className="text-base">{props.sentiment}</p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
export default NewsCard;
