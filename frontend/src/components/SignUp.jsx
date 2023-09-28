import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import expressAPI from "../services/expressAPI";
import { useUserContext } from "../contexts/UserContext";

export default function SignUp() {
  const { setUser, setLogin } = useUserContext();
  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    username: {
      required: "An username must be registered.",
      pattern: {
        value: /[a-z0-9éèàëñçù^*+'\\"=²&§$¤€£<>()|%°.-_@]/gi,
        message: "Registered username contains forbidden characters.",
      },
      minLength: {
        value: 3,
        message: "An username must have at least 3 characters.",
      },
      maxLength: {
        value: 64,
        message: "An username must have less than 64 characters.",
      },
    },
    email: {
      required: "An email must be registered.",
      pattern: {
        value: /^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,4}$/gi,
        message:
          'Registered email has the wrong format. It must resemble "johndoe@example.com."',
      },
    },
    password: {
      required: "A password must be registered.",
      minLength: {
        value: 8,
        message: "A valid password must have at least 8 characters.",
      },
      maxLength: {
        value: 64,
        message: "A valid password must have less than 64 characters.",
      },
    },
    passwordconfirmation: {
      required: "A password confirmation must be registered.",
      validate: (value) =>
        value === watch("password") || "Passwords do not match.",
    },
  };

  const usernameRegister = register("username", registerOptions.username);
  const emailRegister = register("email", registerOptions.email);
  const passwordRegister = register("password", registerOptions.password);
  const passwordConfirmationRegister = register(
    "passwordConfirmation",
    registerOptions.passwordconfirmation
  );

  const handleSignUp = (registerData) => {
    expressAPI
      .post("/auth/signup", registerData)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setLogin(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          name={usernameRegister.name}
          onChange={usernameRegister.onChange}
          ref={usernameRegister.ref}
          aria-invalid={errors.usernameRegister ? "true" : "false"}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          name={emailRegister.name}
          onChange={emailRegister.onChange}
          ref={emailRegister.ref}
          aria-invalid={errors.emailRegister ? "true" : "false"}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name={passwordRegister.name}
          onChange={passwordRegister.onChange}
          ref={passwordRegister.ref}
          aria-invalid={errors.passwordRegister ? "true" : "false"}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="passwordConfirmation">Confirm your password :</label>
        <input
          type="password"
          name={passwordConfirmationRegister.name}
          onChange={passwordConfirmationRegister.onChange}
          ref={passwordConfirmationRegister.ref}
          aria-invalid={errors.passwordConfirmationRegister ? "true" : "false"}
        />
        {errors.passwordConfirmation && (
          <p>{errors.passwordConfirmation.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-xanthous px-3 py-1 rounded-md text-umber font-bold"
      >
        SignUp
      </button>
    </form>
  );
}
