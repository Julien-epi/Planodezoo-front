import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/utils/UserContext";

function withAuth(WrappedComponent: React.ComponentType<any>) {
  return function WithAuthComponent(props: any) {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== "admin") {
        // router.push("/login");
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
