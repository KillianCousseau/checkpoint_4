import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function VolumeCard({ volume }) {
  return (
    volume.volumeInfo && (
      <div className="w-full flex flex-col gap-2 text-umber border-2 border-umber rounded-md p-2 min-h-[10rem]">
        <Link
          to={`/books/${volume.id}`}
          className="font-bold text-xanthous text-ellipsis"
        >
          {volume.volumeInfo.title}
        </Link>
        <div className="flex justify-between">
          <div className="flex truncate max-w-[28rem]">
            {volume.volumeInfo?.authors ? (
              volume.volumeInfo.authors.map((author, index) => (
                <span className="text-cactus" key={author}>
                  {index ? <span className="text-umber">, </span> : ""}
                  {author.trim()}
                </span>
              ))
            ) : (
              <p className="text-cactus">Unknown</p>
            )}
          </div>
          {volume.volumeInfo?.publishedDate ? (
            <p>{volume.volumeInfo.publishedDate.split("-")[0]}</p>
          ) : (
            <p>Unknown</p>
          )}
        </div>
        {volume.volumeInfo?.description ? (
          <p className="line-clamp-3 text-ellipsis">
            {volume.volumeInfo.description}
          </p>
        ) : (
          <p>No description available</p>
        )}
      </div>
    )
  );
}

VolumeCard.propTypes = {
  volume: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      publishedDate: PropTypes.string,
    }),
  }).isRequired,
};
