import Link from "next/link";
import { useUser } from "@/utils/UserContext";
import authService from "@/services/authService";
import { useEffect } from "react";
import userService from "@/services/userService";

export default function Navbar() {
  const { user, setUser } = useUser();

  const logOut = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <div className="sticky top-0 z-10 pb-12">
      <div className="mx-auto px-2 bg-primary sm:px-4 lg:px-8 shadow-lg py-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="md:flex items-center lg:px-0 flex-1">
            <Link href="/">
              <h1>Home</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center flex-1 justify-evenly mx-6 ">
            {!user && (
              <Link href="/login">
                <h1 className="mx-6">Login</h1>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/register">
                <h1 className="mx-6">Register</h1>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/spaces/dashboard">
                <h1 className="mx-6">Zoo&apos;s Spaces</h1>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/servicebook/dashboard">
                <h1 className="mx-6">ServiceBook</h1>
              </Link>
            )}
             {user?.role === "admin" && (
              <Link href="/animal/dashboard">
                <h1 className="mx-6">Animals</h1>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/panelAdmin">
                <h1 className="mx-6">Panel Admin</h1>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/statistiques">
                <h1 className="mx-6">Stats</h1>
              </Link>
            )}

            {(user?.role === "admin" || user?.role === "accueilAgent") && (
              <Link href="/ticket">
                <h1 className="mx-6">Tickets</h1>
              </Link>
            )}
            {user?.role === "veterinarian" && (
              <Link href="/treatment/dashboard">
                <h1 className="mx-6">treatment</h1>
              </Link>
            )}
            {user && (
              <Link href="/login" onClick={logOut}>
                <h1 className="mx-6">Log out</h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
