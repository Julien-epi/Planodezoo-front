import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
  WrenchScrewdriverIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import SpaceService from "../../services/spaceService";
import { ISpace } from "@/interfaces/space";
import withAuth from "@/components/hoc/withAuth"; // 👈 HOC

const tableHeaders = [
  "Name",
  "Status",
  "Maintenance",
  "Maintenance Off",
  "Details",
  "Edit",
  "Delete",
];

function Spaces() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const spacesData = await SpaceService.getAllSpaces();
        setSpaces(spacesData);
        console.log("🚀 ~ file: spaces.tsx:16 ~ Spaces ~ spaces:", spaces)
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchSpaces ~ err:", err)
      }
    };
    fetchSpaces();
  }, []);

  console.log(spaces);

  const handleDetails = (id: string) => {
    router.push(`/spaces/details/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/spaces/modify/${id}`);
  };

  const handleCreate = () => {
    router.push(`/spaces/createspaces`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Spaces of the Zoo
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here, you can see all spaces of the zoo
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleCreate}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add space
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
                {spaces.map((item, key) => (
                  <tr key={key}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item.name}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-4 text-sm ${
                        item.status ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.status ? "En maintenance" : "Fonctionnel"}
                    </td>
                    <td
                      onClick={async () => {
                        await SpaceService.setMaintenance(item._id);
                        window.location.reload();
                      }}
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                    >
                      <WrenchScrewdriverIcon
                        aria-hidden="true"
                        className="cursor-pointer h-5 w-5 text-gray-400"
                      />
                    </td>
                    <td
                      onClick={async () => {
                        await SpaceService.unsetMaintenance(item._id);
                        window.location.reload();
                      }}
                      className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                    >
                      <CheckIcon
                        aria-hidden="true"
                        className="cursor-pointer h-5 w-5 text-gray-400"
                      />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <EyeIcon
                        aria-hidden="true"
                        className="cursor-pointer h-5 w-5 text-gray-400"
                        onClick={() => handleDetails(item._id)}
                      />
                    </td>
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
                        await SpaceService.deleteSpace(item._id);
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
