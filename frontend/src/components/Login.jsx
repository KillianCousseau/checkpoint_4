import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";

export default function Login() {
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
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
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
    expressAPI.post("/auth/login", registerData).then((res) => {
      if (res.status === 200) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setLogin(true);
        navigate("/");
      }
    });
  };

  return (
    <form
      className="flex flex-col items-center"
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
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name={passwordRegister.name}
          onChange={passwordRegister.onChange}
          ref={passwordRegister.ref}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-xanthous px-3 py-1 rounded-md text-umber font-bold"
      >
        Log In
      </button>
    </form>
  );
}
