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
};

const CreateAnimalPage = () => {
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
      AnimalService.createAnimal(dataToSubmit);
      router.push("/animal/dashboard");
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
          name :
            <input
              {...register("name", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.name && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>
          <label className="flex flex-col">
          species :
            <input
              {...register("species", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.species && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>     
          <label className="flex flex-col">
          healthStatus :
            <input
              {...register("healthStatus", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.healthStatus && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>  
          <label className="flex flex-col">
          age :
            <input
              {...register("age", { required: true })}
              className="mt-2 p-2 border rounded-md"
            />
            {errors.age && (
              <p className="mt-1 text-red-500">Ce champ est requis</p>
            )}
          </label>  
          <label className="flex flex-col">
          spaceId :
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
