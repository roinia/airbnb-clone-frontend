import useUser from "./useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useHostOnlyPage() {
  const { userLoading, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading && !user?.is_host) {
      navigate("/");
    }
  }, [userLoading, user, navigate]);
  return;
}
