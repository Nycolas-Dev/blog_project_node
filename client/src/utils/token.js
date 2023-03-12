export const getToken = () => {
  try {

    const getCookie = (name) => {
        const cookie = document.cookie
          .split(";")
          .find((c) => c.trim().startsWith(name + "="));
        if (!cookie) return null;
        return cookie.split("=")[1];
      };

    const token = getCookie("access_token");

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
