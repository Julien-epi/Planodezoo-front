import { useForm, SubmitHandler } from "react-hook-form";
import authServices from "@/services/authService";
import toast from "react-hot-toast";
import { LoginForm } from "@/interfaces/user";
import { useRouter } from "next/router";
import { useUser } from "@/utils/UserContext";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (dataForm) => {
    authServices
      .login(dataForm)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User was logged in !", { duration: 3000 });
          const user = authServices.getCurrentUser();
          setUser(user);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: index.tsx:27 ~ constonSubmit:SubmitHandler<LoginForm>= ~ err:",
          err
        );
        toast.error("Username or Password not found !", { duration: 3000 });
      });
    reset();
  };

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-5">LOGIN</h1>
  
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="w-3/4" htmlFor="Username">
            Username
          </label>
          <input
            className="border-2 border-gray-300 p-2 m-2 rounded-lg w-3/4"
            id="username"
            {...register("username", {
              required: "required",
            })}
          />
          {errors.username && (
            <span role="alert" className="text-red-600">
              {errors.username.message}
            </span>
          )}
  
          <label className="w-3/4" htmlFor="password">
            password
          </label>
          <input
            className="border-2 border-gray-300 p-2 m-2 rounded-lg w-3/4"
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 2,
                message: "min length is 2",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span role="alert" className="text-red-600">
              {errors.password.message}
            </span>
          )}
  
          <button
            type="submit"
            className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
