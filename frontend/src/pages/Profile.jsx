import { useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useUserContext } from "../contexts/UserContext";
import expressAPI from "../services/expressAPI";

export default function Profile() {
  const { user, setUser } = useUserContext();
  const fileRef = useRef(null);
  const [file, setFile] = useState([]);
  const [edit, setEdit] = useState(false);

  const {
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
  };

  const usernameRegister = register("username", registerOptions.username);
  const emailRegister = register("email", registerOptions.email);

  const handleProfileUpdate = (data) => {
    const formData = new FormData();
    if (file.length > 0) {
      formData.append("profileImage", file[0]);
    } else {
      formData.append("profileImage", user.profileImage);
    }

    formData.append("username", data.username);
    formData.append("email", data.email);

    expressAPI
      .put(`/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setEdit(false);
        setFile([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xanthous text-3xl font-bold my-10">Your profile</h1>
      <div className="relative w-11/12 lg:w-1/2 p-5 text-2xl flex flex-col rounded-md bg-umber">
        {!edit ? (
          <>
            <div className="flex justify-center mb-5">
              {user.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                    user.profileImage
                  }`}
                  alt="profileImage"
                  className="rounded-full w-36 h-36"
                />
              ) : (
                <FaCircleUser size={150} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xanthous">
                Username :&nbsp;
                <span className="text-cactus font-bold">{user.username}</span>
              </p>
              <p className="text-xanthous">
                Email :&nbsp;
                <span className="text-cactus font-bold">{user.email}</span>
              </p>
            </div>
            <button
              type="button"
              className="absolute top-2 right-2 bg-xanthous px-3 rounded-md text-umber font-bold"
              onClick={() => setEdit(!edit)}
            >
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(handleProfileUpdate)}>
            <div className="flex justify-center mb-5">
              {file.length ? (
                <img
                  src={URL.createObjectURL(file[0])}
                  alt="preview"
                  className="rounded-full w-36 h-36"
                />
              ) : (
                <div>
                  {user.profileImage ? (
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                          user.profileImage
                        }`}
                        alt="profileImage"
                        className="rounded-full w-36 h-36"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                    >
                      <FaCircleUser size={150} />
                    </button>
                  )}
                </div>
              )}

              <input
                type="file"
                ref={fileRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xanthous">
                Username :&nbsp;
                <input
                  className="text-cactus font-bold bg-umber focus:outline-none border-b-2 border-alice-blue"
                  defaultValue={user.username}
                  name={usernameRegister.name}
                  onChange={usernameRegister.onChange}
                  ref={usernameRegister.ref}
                  aria-invalid={errors.usernameRegister ? "true" : "false"}
                />
                {errors.username && <p>{errors.username.message}</p>}
              </p>
              <p className="text-xanthous">
                Email :&nbsp;
                <input
                  className="text-cactus font-bold bg-umber focus:outline-none border-b-2 border-alice-blue"
                  defaultValue={user.email}
                  name={emailRegister.name}
                  onChange={emailRegister.onChange}
                  ref={emailRegister.ref}
                  aria-invalid={errors.emailRegister ? "true" : "false"}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </p>
            </div>
            <button
              type="submit"
              className="absolute top-2 right-2 bg-xanthous px-3 rounded-md text-umber font-bold"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
