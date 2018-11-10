export const enterAsUser = (user, token) => ({
    type: "ENTER_AS_USER",
    payload: {
      user,
      token
    }
  });
  