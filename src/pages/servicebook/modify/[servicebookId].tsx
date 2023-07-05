import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ServiceBookService from "../../../services/serviceBook";

type FormData = {
  spaceId: string;
  rateFrequency: number;
  lastMaintenance: Date;
};

type Servicebook = {
  _id: string;
  spaceId: string;
  rateFrequency: number;
  lastMaintenance: Date;
};

const ModifyServicebookPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { servicebookId } = router.query;
  const [servicebook, setServicebook] = useState<Servicebook | null>(null);
  const [valueToSubmit, setValueToSubmit] = useState<FormData | null>(null);

  useEffect(() => {
    // Récupère les données de l'espace que vous voulez modifier
    // Remplacez cela par votre propre logique pour obtenir les données de l'espace
    const fetchSpace = async () => {
      if (servicebookId) {
        const servicebookData = await ServiceBookService.getServiceBookById(
          servicebookId
        );
        setServicebook(servicebookData);
        setValue("spaceId", servicebookData.spaceId);
        setValue("rateFrequency", servicebookData.rateFrequency);
        setValue("lastMaintenance", servicebookData.lastMaintenance);
      }
    };

    if (servicebookId) {
      fetchSpace();
    }
  }, [servicebookId, setValue]);

  const onSubmit = (data: FormData) => {
    const dataToSubmit = {
      ...data,
    };
    setValueToSubmit(dataToSubmit);

    if (valueToSubmit) {
      ServiceBookService.updateServiceBook(servicebookId, dataToSubmit);
      router.push("/servicebook/dashboard");
    }
  };

  console.log("valueToSubmit", valueToSubmit);
  if (!servicebook) return <p>Chargement...</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            SpaceId :
            <input
              {...register("spaceId", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.spaceId && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>

          <label className="flex flex-col">
            rateFrequency :
            <input
              {...register("rateFrequency", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.rateFrequency && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
          lastMaintenance :
            <input
              {...register("lastMaintenance", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.lastMaintenance && (
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

export default ModifyServicebookPage;
