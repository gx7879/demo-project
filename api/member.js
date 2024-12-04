// import { useHttp } from "~/composables/useHttp";

const Api = {
  signWithFirebase: "/api/auth/sign_in_with_firebase",
  sendVerifyEmail: "/api/auth/send_verify_email",
  sendResetPassword: "/api/auth/send_reset_password",
  getCustomToken: "/api/auth/get_custom_token",
};

export function login(data) {
  return useHttp.post(Api.signWithFirebase, data);
}

export function sendVerifyEmail(data) {
  return useHttp.post(Api.sendVerifyEmail);
}

export function sendResetPassword(data) {
  console.log(data);
  return useHttp.post(Api.sendResetPassword, data);
}

export function getCustomToken(data) {
  return useHttp.get(Api.getCustomToken, data);
}
