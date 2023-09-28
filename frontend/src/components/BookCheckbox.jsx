import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";

export default function BookCheckbox({ book }) {
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
  return (
    <div key={book.id} className="flex items-center gap-3">
      <input
        type="checkbox"
        className="w-5 h-5"
        onChange={handleCheckbox}
        checked={checked}
      />
      <Link to={`/books/${book.volume_id}`} className="text-2xl">
        {book.title}
      </Link>
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
};
