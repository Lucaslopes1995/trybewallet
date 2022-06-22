// Coloque aqui suas actionss
export const SEND_USER_DATA = 'sendUserData';

export const sendLogin = (user) => ({
  type: SEND_USER_DATA,
  payload: user,
});
