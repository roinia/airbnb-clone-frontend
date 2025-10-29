import useUser from "./useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useProtectedPage() {
  const { userLoading, isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [userLoading, isLoggedIn, navigate]);
  return;
}
