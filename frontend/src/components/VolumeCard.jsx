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
          <div className="flex">
            {volume.volumeInfo?.authors ? (
              volume.volumeInfo.authors.map((author, index) => (
                <p className="text-ellipsis">
                  {index ? ", " : ""}
                  <span className="text-cactus">{author}</span>
                </p>
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
          <p>No description</p>
        )}
      </div>
    )
  );
}

VolumeCard.propTypes = {
  volume: PropTypes.shape({
    id: PropTypes.string.isRequired,
    volumeInfo: PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
