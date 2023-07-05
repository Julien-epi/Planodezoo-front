import { useEffect, useState } from "react";
import { User } from "@/interfaces/user";
import userService from "@/services/userService";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa"; // font awesome icons

export default function PanelAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    userService
      .getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        toast.error("Error retry!", { duration: 3000 });
      });
  };

  const deleteUser = (id: string) => {
    userService
      .deleteUsers(id)
      .then(() => {
        toast.success("User was deleted successfully!", { duration: 3000 });
        retrieveUsers();
      })
      .catch(() => {
        toast.error("Error retry!", { duration: 3000 });
      });
  };
  return (
    <div className="m-10 overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Username
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Role
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {user.username}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {user.role}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2">
                <Link href={`/panelAdmin/edit/${user._id}`}>
                  <FaEdit className="inline-block text-blue-500 hover:text-blue-700" />
                </Link>
                <FaTrash
                  className="inline-block text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                  onClick={() => deleteUser(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
