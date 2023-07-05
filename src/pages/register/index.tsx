import { useForm, SubmitHandler } from "react-hook-form";
import authServices from "@/services/authService";
import toast from "react-hot-toast";
import { RegisterForm, Role } from "@/interfaces/user";
import { useRouter } from "next/router";
import Select from "react-select"; 

const days = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
]; 

const selectStyle = {
  control: (base: any) => ({
    ...base,
    minHeight: 38,
    borderRadius: 8,
    borderColor: "#e2e8f0",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#cbd5e0",
    },
  }),
};
export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Add setValue to your destructuring here
  } = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      role: "",
      assignedDays: [],
      password: "",
      confirmPassword: "",
    },
  });

  const watchRole = watch("role");

  const handleDaysChange = (selectedDays: any) => {
    const values = selectedDays.map((day: any) => day.value);
    setValue("assignedDays", values);
  };

  const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
    if (
      [
        "employee",
        "entretienAgent",
        "seller",
        "veterinarian",
        "accueilAgent",
      ].includes(formData.role) &&
      (formData.assignedDays === undefined ||
        formData.assignedDays.length === 0)
    ) {
      toast.error("Assigned days is required for this role!", {
        duration: 3000,
      });
      return;
    }

    authServices
      .register(formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success("User was registered !", { duration: 3000 });
        }
      })
      .catch((err) => {
        toast.error("Username already exist !", { duration: 3000 });
      });
  };

  return (
    <div className="flex justify-center ">
    <form
    className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
    onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold">Register</h1>
      <input
        className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
        {...register("username", {
          minLength: 2,
          required: { value: true, message: "This is required" },
        })}
        placeholder="Username"
      />
      {errors.username && <p className="text-red-600">username is not valid</p>}

      <select
        className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
        {...register("role", { required: true })}
      >
        <option value="">Select role...</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="veterinarian">Veterinarian</option>
        <option value="entretienAgent">Entretien Agent</option>
        <option value="accueilAgent">Accueil Agent</option>
        <option value="seller">Seller</option>
        <option value="visitor">Visitor</option>
      </select>
      {errors.role && <p className="text-red-600">Role is required</p>}

      {[
        "employee",
        "entretienAgent",
        "seller",
        "veterinarian",
        "accueilAgent",
      ].includes(watchRole) && (
        <Select
          isMulti
          className="w-3/4 m-5"
          name="assignedDays"
          options={days}
          placeholder="Select days..."
          styles={selectStyle}
          onChange={handleDaysChange}
        />
      )}

      {errors.assignedDays && (
        <p className="text-red-600">Assigned days are required for this role</p>
      )}

      <input
        className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
        type="password"
        {...register("password", {
          minLength: 2,
          required: { value: true, message: "This is required" },
        })}
        placeholder="Please enter password"
      />
      {errors.password && (
        <p className="text-red-600">
          Password is not valid. Min 2 characters required
        </p>
      )}

      <input
        className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
        type="password"
        {...register("confirmPassword", {
          minLength: 2,
          required: { value: true, message: "This is required" },
        })}
        placeholder="Please confirm password"
      />
      {errors.confirmPassword && (
        <p className="text-red-600">
          Password is not valid. Min 2 characters required
        </p>
      )}

      <button
        type="submit"
        className="w-%[50] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </form>
    </div>
  );
}
