import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AnimalService from "../../services/animalService";

type FormData = {
  _id: string;
  name: string;
  species: string;
  healthStatus: string;
  age: number;
  spaceId: string;
  treatments?: string;
};

const CreateAnimalPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const dataToSubmit = {
      ...data,
      treatments: ''
    };
  
    await AnimalService.createAnimal(dataToSubmit);
    router.push("/animal/dashboard");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            Name:
            <input
              {...register("name", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Species:
            <input
              {...register("species", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.species && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Health Status:
            <input
              {...register("healthStatus", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.healthStatus && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Age:
            <input
              {...register("age", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.age && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
            Space ID:
            <input
              {...register("spaceId", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.spaceId && (
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

export default CreateAnimalPage;
