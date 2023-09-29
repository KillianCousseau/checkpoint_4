import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import PropTypes from "prop-types";
import { useState } from "react";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";

export default function BookCheckbox({ book, fetchBooks }) {
  const [checked, setChecked] = useState(book.checked);
  const { user } = useUserContext();

  const handleCheckbox = () => {
    expressAPI
      .put("/books/list", {
        user_id: user.id,
        volume_id: book.volume_id,
        checked: !checked,
      })
      .then((res) => {
        if (res.status === 201) {
          setChecked(!checked);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRemoveBookList = () => {
    expressAPI
      .delete("/books/list", {
        data: {
          user_id: user.id,
          volume_id: book.volume_id,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          fetchBooks();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      key={book.id}
      className="mx-2 items-center justify-start grid grid-rows-1 grid-cols-[2.5rem_auto_2.5rem] gap-x-3"
    >
      <input
        type="checkbox"
        className="w-10 h-5"
        onChange={handleCheckbox}
        checked={checked}
      />
      <Link to={`/books/${book.volume_id}`} className="text-2xl font-semibold">
        {book.title}
      </Link>
      <button
        type="button"
        className="text-xanthous w-10"
        onClick={handleRemoveBookList}
      >
        <MdCancel size={27} />
      </button>
    </div>
  );
}

BookCheckbox.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    volume_id: PropTypes.string.isRequired,
    checked: PropTypes.number,
  }).isRequired,
  fetchBooks: PropTypes.func.isRequired,
};
