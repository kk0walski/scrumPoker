// user object is set server side and is never updated client side but this empty reducer is still needed
const user = (state = null, action) => {
  switch (action.type) {
    case "ENTER_AS_USER":
      {
        const {
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          phoneNumber
        } = action.payload.user;
        const {
          token
        } = action.payload;
        const user = {
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
          isAnonymous,
          phoneNumber,
          token
        };
        return user;
      }
    case "ENTER_AS_GUEST":
      {
        const {
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          phoneNumber
        } = action.payload.user;
        const user = {
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
          isAnonymous,
          phoneNumber,
        }
        return user
      }
    default:
      return state;
  }
};

export default user;