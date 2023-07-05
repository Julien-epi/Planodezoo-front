import { Inter } from "next/font/google";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import SpaceService from "@/services/spaceService";
import { ISpace } from "@/interfaces/space";
import ZooService from "@/services/zooService";
import { useUser } from "@/utils/UserContext";
import UserService from "@/services/userService";
import ticketService from "@/services/ticketService";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [canOpen, setCanOpen] = useState(false);

  useEffect(() => {
    const checkZooStatus = async () => {
      try {
        const response = await ZooService.canZooOpen();
        setCanOpen(response.data.canOpen);
        console.log("🚀 ~ file: index.tsx:19 ~ checkZooStatus ~ response.data:", response.data)
      } catch (err) {
        console.log("Error checking if zoo can open:", err);
      }
    };

    checkZooStatus();
  }, []);

  const [userTickets, setUserTickets] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const spacesData = await SpaceService.getAllSpaces();
        setSpaces(spacesData);
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchSpaces ~ err:", err);
      }
    };
    fetchSpaces();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (user?.userId) {
          const username = await UserService.getUserById(user?.userId);
          setUserName(username.data.username);
        }
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchSpaces ~ err:", err);
      }
    };
    fetchUsername();
  }, [user]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (userName) {
          const userTickets = await ticketService.checkTicket(userName);
          setUserTickets(userTickets.data.tickets[0].allowedSpaces);
        }
      } catch (err) {
        console.log("🚀 ~ file: spaces.tsx:26 ~ fetchSpaces ~ err:", err);
      }
    };
    fetchTicket();
  }, [userName]);

  const handleTicket = async (spaceId: string) => {
    console.log("Checking for ID:", spaceId);

    if (Array.isArray(userTickets) && userTickets.includes(spaceId)) {
      setModalMessage("Vous pouvez rentrer dans cet espace");
    } else {
      setModalMessage("Vous n'avez pas de ticket pour accéder à cet espace");
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <h1 className="text-center text-2xl bold pb-6">
        Welcome to the Planode ZOO
      </h1>
      <h2
        className={`text-center text-4xl bold pb-6 ${
          canOpen ? "text-green-600" : "text-red-600"
        } blink`}
      >
        {canOpen ? "🚀 The Zoo is Open!" : "🚧 The Zoo is Closed!"}
      </h2>

      <h2 className="text-center text-xl bold pb-6">
        Get access to your favorite space
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {canOpen && spaces.map((space) => (
          <li
            key={space._id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={space.images}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {space.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dd className="text-sm text-gray-500">{space.type}</dd>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Opening Hours : {space.openingHours}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    key={space._id}
                    onClick={() => {
                      handleTicket(space._id);
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <SquaresPlusIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Enter with my ticket
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-80 text-center">
            <p className="mb-4">{modalMessage}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
