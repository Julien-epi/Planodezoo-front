import React from "react";
import { Stats } from "@/interfaces/stats";


interface StatisticsTableProps {
  stats: Stats[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ stats }) => {
  return (
    <div className="mx-auto w-full max-w-4xl"> {/* Ajout d'un conteneur avec une largeur maximale */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Espace</th>
            <th className="px-6 py-3">Nombre de tickets</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-gray-500">
          {stats.map((stat: Stats, index: number) => (
            <tr key={index} className="text-center border-t border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">{stat.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{stat.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
