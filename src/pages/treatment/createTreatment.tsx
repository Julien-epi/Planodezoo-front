import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TreatmentService from "../../services/treatmentService";

type FormData = {
  _id: string;
  animalId: string;
  veterinarianId: string;
  treatmentDescription: string;
  date: Date;
};

const CreateTreatmentsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const [valueToSubmit, setValueToSubmit] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    const dataToSubmit = {
      ...data,
    };
    setValueToSubmit(dataToSubmit);

    if (valueToSubmit) {
      TreatmentService.createTreatment(dataToSubmit);
      router.push("/treatment/dashboard");
    }
  };

  console.log("valueToSubmit", valueToSubmit);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            animalId :
            <input
              {...register("animalId", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.animalId && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            veterinarianId :
            <input
              {...register("veterinarianId", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.veterinarianId && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            date :
            <input
              {...register("date", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.date && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            treatmentDescription :
            <input
              {...register("treatmentDescription", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.treatmentDescription && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <input
            type="submit"
            className="cursor-pointer mt-4 p-2 bg-blue-500 text-white rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTreatmentsPage;
