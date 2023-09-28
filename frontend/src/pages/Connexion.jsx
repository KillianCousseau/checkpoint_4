import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function Connexion() {
  const [login, setLogin] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 my-10 w-[15rem] justify-between items-center">
        <button
          type="button"
          className={`${
            login ? "bg-xanthous px-3 py-1 rounded-md" : ""
          } text-umber font-bold w-1/2`}
          onClick={() => setLogin(!login)}
        >
          Log In
        </button>
        <button
          type="button"
          className={`${
            !login ? "bg-xanthous px-3 py-1 rounded-md" : ""
          } text-umber font-bold w-1/2`}
          onClick={() => setLogin(!login)}
        >
          Sign Up
        </button>
      </div>
      {login ? <Login /> : <SignUp />}
    </div>
  );
}
