// proxy is only use in development so it will be ignored in production
// so if there is no http://localhost:5000 then by default it is going to use heroku domain
// this heroku app is just our server serving the build static content and also holding the restful api

const authApi = {
  async login(userInfo) {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  },

  async signup(userInfo) {
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  },

  async isUserAuth() {
    try {
      const response = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default authApi;
