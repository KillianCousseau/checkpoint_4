import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../services/formatDate";

export default function Book() {
  const { id } = useParams();
  const [volume, setVolume] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_GOOGLE_BOOKS_URL}/volumes/${id}?key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => setVolume(res.data));
  }, []);

  return (
    volume && (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl text-xanthous font-bold my-10">
          {volume.volumeInfo.title}
          {volume.volumeInfo?.subtitle ? (
            <span> : {volume.volumeInfo.subtitle}</span>
          ) : null}
        </h1>

        <div className="flex flex-col justify-center w-11/12 lg:w-2/3 p-2 border-4 border-umber min-h-[10rem] rounded-md">
          <h2 className="text-umber font-bold mb-3">About this edition :</h2>
          <div className="text-umber flex flex-col lg:grid lg:grid-cols-2">
            {volume.volumeInfo?.industryIdentifiers.map((ISBN) => (
              <p>
                {ISBN.type} :&nbsp;
                <span className="text-cactus">{ISBN.identifier}</span>
              </p>
            ))}
            <p>
              Publication :&nbsp;
              {volume.volumeInfo?.publishedDate && (
                <span>{formatDate(volume.volumeInfo.publishedDate)}</span>
              )}
            </p>
            <p>
              Publisher :&nbsp;
              {volume.volumeInfo?.publisher && (
                <span>{volume.volumeInfo.publisher}</span>
              )}
            </p>
            <p>
              Authors :&nbsp;
              {volume.volumeInfo?.authors ? (
                volume.volumeInfo.authors.map((author, index) => (
                  <span className="text-ellipsis">
                    {index ? ", " : ""}
                    <span className="text-cactus">{author}</span>
                  </span>
                ))
              ) : (
                <span className="text-cactus">Unknown</span>
              )}
            </p>
            <p>
              Page count :&nbsp;
              {volume.volumeInfo.printedPageCount && (
                <span>{volume.volumeInfo.printedPageCount}</span>
              )}
            </p>
          </div>
        </div>
        <div className="w-11/12 lg:w-2/3 my-5">
          <h2 className="text-umber text-2xl font-bold">Description :</h2>
        </div>
        {volume.volumeInfo?.description ? (
          <div className="w-11/12 lg:w-2/3">
            <p className="text-umber">{volume.volumeInfo.description}</p>
          </div>
        ) : (
          <p>No description available</p>
        )}
      </div>
    )
  );
}
