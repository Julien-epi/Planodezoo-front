import { useForm, SubmitHandler } from "react-hook-form";
import TicketService from "@/services/ticketService";
import toast from "react-hot-toast";
import { TicketForm } from "@/interfaces/ticket";
import SpaceService from "@/services/spaceService";
import { ISpace } from "@/interfaces/space";
import { useEffect, useState } from "react";

export default function Ticket() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TicketForm>({
    defaultValues: {
      username: "",
      type: "",
      allowedSpaces: [],
      escapeGameOrder: [],
    },
  });

  const watchType = watch("type");

  useEffect(() => {
    SpaceService.getAllSpaces()
      .then((spacesData) => {
        setSpaces(spacesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onSubmit: SubmitHandler<TicketForm> = async (formData) => {
    if (formData.type === "pass escape game" && formData.escapeGameOrder) {

      let tempArray = [];
      for (let i = 0; i < formData.escapeGameOrder.length; i++) {
        if (formData.escapeGameOrder[i] != "") {
          tempArray.push(formData.escapeGameOrder[i]);
        }
      }

      const isOrderIncludedInAllowedSpaces = tempArray.every((orderSpace) =>
        formData.allowedSpaces.includes(orderSpace)
      );

      formData.escapeGameOrder = tempArray;
      if (!isOrderIncludedInAllowedSpaces) {
        toast.error(
          "All spaces in Escape Game Order must be included in Allowed Spaces",
          { duration: 3000 }
        );
        return;
      }
    } else {
      formData.escapeGameOrder = [];
    }

    TicketService.createTicket(formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Ticket was registered successfully!", {
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error("Error", { duration: 3000 });
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-6 bg-gray-100 p-10 rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Create a New Ticket
      </h2>

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <input
          className="border-2 border-gray-200 p-3 rounded-md focus:border-indigo-500"
          {...register("username", {
            minLength: 2,
            required: { value: true, message: "This is required" },
          })}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is not valid</p>
        )}
      </div>

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <select
          className="border-2 border-gray-200 p-3 rounded-md focus:border-indigo-500"
          {...register("type", {
            required: { value: true, message: "This is required" },
          })}
        >
          <option value="">Select a ticket type</option>
          <option value="pass journée">PASS journée</option>
          <option value="pass week-end">PASS Week-end</option>
          <option value="pass 1daymonth">PASS 1daymonth</option>
          <option value="pass annuel">PASS Annuel</option>
          <option value="pass escape game">PASS Escape game</option>
          <option value="pass night">PASS Night</option>
        </select>
        {errors.type && <p className="text-red-500">Type is required</p>}
      </div>

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-800">Allowed Spaces</h3>
        {spaces.map((space) => (
          <label className="flex items-center space-x-3" key={space._id}>
            <input
              type="checkbox"
              value={space._id} // Changed from space.name to space._id
              {...register("allowedSpaces")}
              className="rounded border-gray-300 text-indigo-600 focus:border-indigo-500 focus:ring-indigo-200"
            />
            <span className="text-gray-900">{space.name}</span>
          </label>
        ))}
        {errors.allowedSpaces && (
          <p className="text-red-500">At least one space must be selected</p>
        )}
      </div>

      {watchType === "pass escape game" &&
        spaces.map((space, index) => (
          <div
            key={space._id}
            className="flex flex-col space-y-2 w-full max-w-md"
          >
            <h3 className="text-lg font-medium text-gray-800">{`Escape Game Order ${
              index + 1
            }`}</h3>
            <select
              className="border-2 border-gray-200 p-3 rounded-md focus:border-indigo-500"
              {...register(`escapeGameOrder.${index}`)}
            >
              <option value="">Select a space</option>
              {spaces.map((spaceOption) => (
                <option key={spaceOption._id} value={spaceOption._id}>
                  {spaceOption.name}
                </option>
              ))}
            </select>
            {errors.escapeGameOrder && (
              <p className="text-red-500">{`Escape Game Order ${
                index + 1
              } is required`}</p>
            )}
          </div>
        ))}

      <button
        type="submit"
        className="bg-indigo-600 text-white font-semibold p-3 rounded-md hover:bg-indigo-500 transition-all"
      >
        Submit
      </button>
    </form>
  );
}
