import { useEffect, useState } from "react";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";
import BookCheckbox from "../components/BookCheckbox";

export default function ReadingList() {
  const [bookList, setBookList] = useState(null);
  const { user } = useUserContext();

  const fetchBooks = () => {
    expressAPI
      .get(`/books?user=${user.id}`)
      .then((res) => setBookList(res.data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xanthous text-3xl font-bold my-5">Reading List</h1>
      <div className="flex flex-col my-5 gap-5">
        {bookList
          ? bookList.map((book) => (
              <BookCheckbox book={book} key={book.id} fetchBooks={fetchBooks} />
            ))
          : null}
      </div>
    </div>
  );
}
