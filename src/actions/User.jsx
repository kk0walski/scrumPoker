export const enterAsUser = (user, token) => ({
    type: "ENTER_AS_USER",
    payload: {
      user,
      token
    }
  });
  
  export const enterAsGuest = (user) => ({
    type: "ENTER_AS_GUEST",
    payload: {
      user
    }
  })