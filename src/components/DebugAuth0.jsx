import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const DebugAuth0 = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Access Token:", token);
        } catch (error) {
          console.error("Lỗi khi lấy token:", error);
        }
      } else {
        console.warn("Người dùng chưa đăng nhập.");
      }
    };

    fetchToken();
  }, [isAuthenticated]);

  return null; // Không hiển thị gì trên giao diện
};

export default DebugAuth0;
