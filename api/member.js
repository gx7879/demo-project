// import { useHttp } from "~/composables/useHttp";

const Api = {
  signWithFirebase: "/api/auth/sign_in_with_firebase",
};

export function login(data) {
  return useHttp.post(Api.signWithFirebase, data);
}
