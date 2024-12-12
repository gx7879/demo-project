const Api = {
  signWithFirebase: "/api/auth/sign_in_with_firebase",
  sendVerifyEmail: "/api/auth/send_verify_email",
  sendResetPassword: "/api/auth/send_reset_password",
  getCustomToken: "/api/auth/get_custom_token",
  userProfiles: "/api/user/user_profiles/self",
  orders: "/api/order/orders",
  emailVerify: "/api/auth/email_verify",
};

export function login(data) {
  return useHttp.post(Api.signWithFirebase, data);
}

export function sendVerifyEmail() {
  return useHttp.post(Api.sendVerifyEmail);
}

export function sendResetPassword(data) {
  return useHttp.post(Api.sendResetPassword, data);
}

export function getCustomToken(data) {
  return useHttp.get(Api.getCustomToken, data);
}

export function userProfiles() {
  return useHttp.get(Api.userProfiles);
}

export function orders(data) {
  return useHttp.get(Api.orders, data);
}

export function updateUserProfiles(data) {
  return useHttp.post(Api.userProfiles, data);
}

export function emailVerify(data) {
  return useHttp.post(Api.emailVerify, data);
}
