import { useEffect } from "react";
import { useForm, useWatch, Controller, SubmitHandler } from "react-hook-form";
import userService from "@/services/userService";
import toast from "react-hot-toast";
import Select from "react-select";
import { FormAccount } from "@/interfaces/user";
import { useRouter } from "next/router";

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

export default function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormAccount>();

  const watchRole = useWatch({
    control,
    name: "role",
  });

  useEffect(() => {
    if (id) {
      userService
        .getUserById(id as string)
        .then((response) => {
          const user = response.data;
          setValue("username", user.username);
          setValue("role", user.role);

          // Verify that assignedDays exists
          if (user.assignedDays) {
            // Convert assignedDays from string[] to Array<{ value: string; label: string; }>
            const assignedDays = user.assignedDays.map((day) => ({
              value: day,
              label: day,
            }));
            setValue("assignedDays", assignedDays);
          }
        })
        .catch(() => {
          toast.error("Error retrieving user!", { duration: 3000 });
        });
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormAccount> = (formData) => {
    if (id) {
      userService
        .updateUser(id as string, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success("User was updated !", { duration: 3000 });
          }
        })
        .catch((err) => {
          toast.error("Error updating user !", { duration: 3000 });
        });
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Edit User</h1>
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("username", {
            minLength: 2,
            required: { value: true, message: "This is required" },
          })}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-600">Username is not valid</p>
        )}

        <select
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("role", { required: true })}
        >
          <option value="">Select role...</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="veterinarian">Veterinarian</option>
          <option value="entretienAgent">Maintenance Agent</option>
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
          <Controller
            name="assignedDays"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={days}
                className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
                placeholder="Select days..."
                styles={selectStyle}
                onChange={(selectedOptions, _actionMeta) => {
                  const value = selectedOptions ? (selectedOptions as any) : [];
                  field.onChange(value);
                }}
                value={field.value}
              />
            )}
          />
        )}

        <button
          type="submit"
          className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
