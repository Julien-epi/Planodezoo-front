import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SpaceService from "../../../services/spaceService";
import { ISpace } from "@/interfaces/space";

const headers = [
  {
    key: 1,
    text: "Type",
  },
  {
    key: 2,
    text: "Capacity",
  },
  {
    key: 3,
    text: "Duration",
  },
  {
    key: 4,
    text: "HandicappedAccess",
  },
  {
    key: 5,
    text: "Status",
  },
  {
    key: 5,
    text: "Last Maintenance",
  },
];

export default function SpaceDetails() {
  const { query } = useRouter();
  const { spaceId } = query;
  const [space, setSpace] = useState<ISpace>();

  useEffect(() => {
    const fetchSpace = async () => {
      if (spaceId) {
        const spaceData = await SpaceService.getSpaceById(spaceId);
        setSpace(spaceData);
      }
    };
    fetchSpace();
  }, [spaceId]);

  console.log(space);

  return (
    <div className="px-6 sm:px-6 lg:px-8 ">
      <div className="py-4 px-4 border-slate-200 border-2 rounded-3xl shadow-lg">
        <h1 className="underline text-2xl font-semibold text-gray-900 text-center">
          Space : {space?.name}
        </h1>
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Opening Hours : {space?.openingHours}
        </h2>
        <div className="pt-12 grid grid-cols-3 gap-4">
          <span className="col-span-2">{space?.description}</span>
          <img
            className="rounded-xl border-2 border-slate-500 col-span-1 "
            src={space?.images}
            width={300}
            height={300}
            alt="space"
          />
        </div>
        <div>
          <table className="border border-2 mt-3 mx-auto text-center">
            <thead>
              <tr>
                {headers.map(({ text, key }) => (
                  <th
                    key={key}
                    scope="col"
                    className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.type}
                </td>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.capacity}
                </td>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.duration}
                </td>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.handicappedAccess ? "Yes" : "No"}
                </td>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.status ? "Available" : "Not Available"}
                </td>
                <td className="border px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {space?.lastMaintenance}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
