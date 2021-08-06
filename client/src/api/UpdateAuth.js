const updateAuthApi = {
  async changeUsername(values) {
    try {
      const response = await fetch("/dashboard/change-username", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  },

  async changePassword(values) {
    try {
      const response = await fetch("/dashboard/change-password", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  },
};

export default updateAuthApi;
