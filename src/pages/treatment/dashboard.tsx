import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import TreatmentService from "../../services/treatmentService";
import { ITreatment } from "@/interfaces/treatment";
import withAuth from "@/components/hoc/withAuth"; // 👈 HOC

const tableHeaders = [
  "animalId",
  "veterinarianId",
  "date",
  "treatmentDescription",
  "Edit",
  "Delete",
];

function Spaces() {
  const [treatment, setTreatment] = useState<ITreatment[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const treatmentData = await TreatmentService.getAllTreatment();
        setTreatment(treatmentData);
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchTreatment ~ err:", err);
      }
    };
    fetchTreatment();
  }, []);

  console.log(treatment);

  const handleEdit = (id: string) => {
    router.push(`/treatment/modify/${id}`);
  };

  const handleCreate = () => {
    router.push(`/treatment/createTreatment`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Treatment of the Zoo
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here, you can see all treatments of the zoo
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleCreate}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add treatment
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {treatment.map((item, key) => (
                  <tr key={key}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item.animalId}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm`}>
                      {item.veterinarianId}
                    </td>{" "}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.date}
                    </td>{" "}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.treatmentDescription}
                    </td>{" "}
                    <td
                      onClick={() => handleEdit(item._id)}
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                    >
                      <PencilSquareIcon
                        aria-hidden="true"
                        className="cursor-pointer h-5 w-5 text-gray-400"
                      />
                    </td>
                    <td
                      onClick={async () => {
                        await TreatmentService.deleteTreatment(item._id);
                        window.location.reload();
                      }}
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                    >
                      <TrashIcon
                        aria-hidden="true"
                        className="cursor-pointer h-5 w-5 text-gray-400"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Spaces);
