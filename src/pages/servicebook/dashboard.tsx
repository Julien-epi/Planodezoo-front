import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import ServiceBookService from "../../services/serviceBook";
import { IServiceBook } from "@/interfaces/servicebook";
import withAuth from "@/components/hoc/withAuth"; // 👈 HOC

const tableHeaders = [
  "Space Id",
  "Rate Frequency",
  "Last Maintenance",
  "Edit",
  "Delete",
];

function Spaces() {
  const [servicebook, setServicebook] = useState<IServiceBook[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const servicebookData = await ServiceBookService.getAllServiceBooks();
        setServicebook(servicebookData);
        console.log("🚀 ~ file: spaces.tsx:16 ~ Spaces ~ spaces:", servicebook)
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchSpaces ~ err:", err)
      }
    };
    fetchSpaces();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/servicebook/modify/${id}`);
  };

  const handleCreate = () => {
    router.push(`/servicebook/createservicebook`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Servicebook of the Zoo
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here, you can see all services book of the zoo
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleCreate}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add servicebook
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
                {servicebook.map((item, key) => (
                  <tr key={key}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item.spaceId}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-4 text-sm`}
                    >
                      {item.rateFrequency}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.lastMaintenance}
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
                        await ServiceBookService.deleteServiceBook(item._id);
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
