import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TreatmentService from "../../../services/treatmentService";

type FormData = {
  animalId: string;
  veterinarianId: string;
  treatmentDescription: string;
  date: Date;
};

type Treatment = {
  _id: string;
  animalId: string;
  veterinarianId: string;
  treatmentDescription: string;
  date: Date;
};

const ModifyTreatmentPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { treatmentId } = router.query;
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [valueToSubmit, setValueToSubmit] = useState<FormData | null>(null);

  useEffect(() => {
    // Récupère les données de l'espace que vous voulez modifier
    // Remplacez cela par votre propre logique pour obtenir les données de l'espace
    const fetchTreatment = async () => {
      if (treatmentId) {
        const treatmentData = await TreatmentService.getTreatmentById(
          treatmentId
        );
        setTreatment(treatmentData);
        setValue("animalId", treatmentData.animalId);
        setValue("veterinarianId", treatmentData.veterinarianId);
        setValue("treatmentDescription", treatmentData.treatmentDescription);
        setValue("date", treatmentData.date);
      }
    };

    if (treatmentId) {
      fetchTreatment();
    }
  }, [treatmentId, setValue]);
console.log("treatment > ", treatment)

  const onSubmit = (data: FormData) => {
    const dataToSubmit = {
      ...data,
    };
    setValueToSubmit(dataToSubmit);

    if (valueToSubmit) {
      TreatmentService.updateTreatment(treatmentId, dataToSubmit);
      router.push("/treatment/dashboard");
    }
  };

  console.log("valueToSubmit", valueToSubmit);
  if (!treatment) return <p>Chargement...</p>;

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
            date:
            <input
              {...register("date", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.date && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            treatmentDescription:
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

export default ModifyTreatmentPage;
