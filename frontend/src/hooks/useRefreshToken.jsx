import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {

    const response = await axios.get("http://localhost:3500/refresh/", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("PREV TOKEN: ", JSON.stringify(prev));
      console.log("REFRESH ACCESS TOKEN: ", response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
