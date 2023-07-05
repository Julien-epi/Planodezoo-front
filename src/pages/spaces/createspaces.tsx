import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SpaceService from "../../services/spaceService";

type FormData = {
  _id: string;
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

const CreateSpacesPage = () => {
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
      handicappedAccess: data.handicappedAccess === "true",
      status: data.status === "true",
    };
    setValueToSubmit(dataToSubmit);

    if (valueToSubmit) {
      SpaceService.createSpace(dataToSubmit);
      router.push("/spaces/dashboard");
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
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Images (URL) :
            <input
              {...register("images", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Type :
            <input
              {...register("type", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Capacity:
            <input
              {...register("capacity", { required: true, valueAsNumber: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Duration :
            <input
              {...register("duration", { required: true, valueAsNumber: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Opening hours :
            <input
              {...register("openingHours", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            handicappedAccess :
            <input
              {...register("handicappedAccess", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Status :
            <input
              {...register("status", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
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

export default CreateSpacesPage;
