import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../services/formatDate";
import checkInnerHTML from "../services/checkInnerHTML";
import { useUserContext } from "../contexts/UserContext";
import expressAPI from "../services/expressAPI";

export default function Book() {
  const { id } = useParams();
  const [volume, setVolume] = useState(null);
  const { user } = useUserContext();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_GOOGLE_BOOKS_URL}/volumes/${id}?key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => setVolume(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    expressAPI
      .get(`/books/${id}?user=${user.id}`)
      .then((rows) => {
        if (rows.data) {
          setIsAdded(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddBookList = () => {
    expressAPI
      .post("/books/list", {
        title: volume.volumeInfo.title,
        volume_id: volume.id,
        user_id: user.id,
      })
      .then((res) => {
        if (res.status === 201) {
          setIsAdded(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRemoveBookList = () => {
    expressAPI
      .delete("/books/list", {
        data: {
          user_id: user.id,
          volume_id: volume.id,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          setIsAdded(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    volume && (
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl text-xanthous font-bold my-10 w-10/12">
          {volume.volumeInfo.title}
          {volume.volumeInfo?.subtitle ? (
            <span> : {volume.volumeInfo.subtitle}</span>
          ) : null}
        </h1>

        <div className="w-11/12 lg:w-2/3">
          <div className="flex flex-col justify-center p-2 border-4 border-umber min-h-[10rem] rounded-md">
            <h2 className="text-umber font-bold mb-3">About this edition :</h2>
            <div className="text-umber flex flex-col lg:grid lg:grid-cols-2">
              {volume.volumeInfo?.industryIdentifiers
                ? volume.volumeInfo?.industryIdentifiers.map((ISBN) => (
                    <p key={ISBN.identifier}>
                      {ISBN.type} :&nbsp;
                      <span className="text-cactus">{ISBN.identifier}</span>
                    </p>
                  ))
                : null}
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
                    <span key={author}>
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
          <h2 className="text-umber text-2xl font-bold my-5">Description :</h2>
          {volume.volumeInfo?.description ? (
            <p className="text-umber">
              {checkInnerHTML(volume.volumeInfo.description)}
            </p>
          ) : (
            <p>No description available</p>
          )}
          <div className="flex mt-10 mb-5">
            {!isAdded ? (
              <button
                type="button"
                className="bg-xanthous text-alice-blue font-bold px-3 py-1 rounded-md"
                onClick={handleAddBookList}
              >
                Add to list
              </button>
            ) : (
              <button
                type="button"
                className="bg-xanthous text-alice-blue font-bold px-3 py-1 rounded-md"
                onClick={handleRemoveBookList}
              >
                Remove from list
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
