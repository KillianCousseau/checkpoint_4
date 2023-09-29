import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";
import CustomModal from "./CustomModal";

export default function Login() {
  const [modal, setModal] = useState(false);
  const { setUser, setLogin } = useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message: "Registered email has the wrong format.",
      },
    },
    password: {
      required: "A password must be registered",
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters",
      },
      maxLength: {
        value: 30,
        message: "A valid password must have less than 30 characters",
      },
    },
  };

  const emailRegister = register("email", registerOptions.email);
  const passwordRegister = register("password", registerOptions.password);

  const handleLogin = (registerData) => {
    expressAPI
      .post("/auth/login", registerData)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          setLogin(true);
          navigate("/");
        }
      })
      .catch(() => {
        setModal(true);
      });
  };

  return (
    <form
      className="flex flex-col items-center text-xanthous font-semibold"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          name={emailRegister.name}
          onChange={emailRegister.onChange}
          ref={emailRegister.ref}
          aria-invalid={errors.email ? "true" : "false"}
          className="bg-alice-blue text-umber border-2 border-umber focus:outline-xanthous rounded-md pl-1 py-0.5"
        />
        {errors.email && (
          <p className="text-md text-cactus">{errors.email.message}</p>
        )}
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name={passwordRegister.name}
          onChange={passwordRegister.onChange}
          ref={passwordRegister.ref}
          aria-invalid={errors.password ? "true" : "false"}
          className="bg-alice-blue text-umber border-2 border-umber focus:outline-xanthous rounded-md pl-1 py-0.5"
        />
        {errors.password && (
          <p className="text-md text-cactus">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-xanthous px-3 py-1 rounded-md text-umber font-bold"
      >
        Log In
      </button>
      {modal &&
        createPortal(
          <CustomModal
            closeModal={() => setModal(false)}
            msg="Wrong credentials"
          />,
          document.body
        )}
    </form>
  );
}
