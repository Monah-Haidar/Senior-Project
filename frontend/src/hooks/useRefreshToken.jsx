import useAuth from "./useAuth";

const useRefreshToken = async () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch("http://localhost:3500/refresh", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(data.accessToken);
      return { ...prev, accessToken: data };
    });

    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
