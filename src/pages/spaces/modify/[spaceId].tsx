import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SpaceService from "../../../services/spaceService";

type FormData = {
  name: string;
  description: string;
  images: string;
  type: string;
  capacity: number;
  duration: number;
  openingHours: string;
  handicappedAccess: string | boolean;
  status: boolean | string;
  lastMaintenance: Date;
};

type Space = {
  _id: string;
  name: string;
  description: string;
  images: string;
  type: string;
  capacity: number;
  duration: number;
  openingHours: string;
  handicappedAccess: boolean;
  status: boolean;
  lastMaintenance: Date;
};

const ModifySpacePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { spaceId } = router.query;
  const [space, setSpace] = useState<Space | null>(null);
  const [valueToSubmit, setValueToSubmit] = useState<FormData | null>(null);

  useEffect(() => {
    // Récupère les données de l'espace que vous voulez modifier
    // Remplacez cela par votre propre logique pour obtenir les données de l'espace
    const fetchSpace = async () => {
      if (spaceId) {
        const spaceData = await SpaceService.getSpaceById(spaceId);
        setSpace(spaceData);
        setValue("name", spaceData.name);
        setValue("description", spaceData.description);
        setValue("images", spaceData.images);
        setValue("type", spaceData.type);
        setValue("capacity", spaceData.capacity);
        setValue("duration", spaceData.duration);
        setValue("openingHours", spaceData.openingHours);
        setValue("handicappedAccess", spaceData.handicappedAccess);
      }
    };

    if (spaceId) {
      fetchSpace();
    }
  }, [spaceId, setValue]);

  const onSubmit = (data: FormData) => {
    const dataToSubmit = {
      ...data,
      handicappedAccess: data.handicappedAccess === "true",
      status: data.status === "true",
    };
    setValueToSubmit(dataToSubmit);

    if (valueToSubmit) {
      SpaceService.updateSpace(spaceId, dataToSubmit);
      router.push("/spaces/dashboard");
    }
  };

  console.log("valueToSubmit", valueToSubmit);
  if (!space) return <p>Chargement...</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            Space&apos;s name :
            <input
              {...register("name", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>

          <label className="flex flex-col">
            Description :
            <input
              {...register("description", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Images (URL):
            <input
              {...register("images", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Type:
            <input
              {...register("type", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Capacity:
            <input
              {...register("capacity", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Duration:
            <input
              {...register("duration", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Opening hours:
            <input
              {...register("openingHours", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.description && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Handicapped Access:
            <select
              {...register("handicappedAccess", { required: true })}
              className="mt-2 p-2 border rounded-md"
            >
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
            {errors.handicappedAccess && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>

          <label className="flex flex-col">
            Status:
            <select
              {...register("status", { required: true })}
              className="mt-2 p-2 border rounded-md"
            >
              <option value="true">En maintenance</option>
              <option value="false">Pas en maintenance</option>
            </select>
            {errors.status && (
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

export default ModifySpacePage;
