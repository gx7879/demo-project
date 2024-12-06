import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useUserStore } from "@/stores/User";

const firebaseConfig = {
  apiKey: "AIzaSyC1V-QOXomHb-pvcyBr04oVIAX4MJeTUJo",
  authDomain: "air-water-f48d6.firebaseapp.com",
  projectId: "air-water-f48d6",
  storageBucket: "air-water-f48d6.firebasestorage.app",
  messagingSenderId: "543311698134",
  appId: "1:543311698134:web:27d8166f4abf5f5b111177",
  measurementId: "G-6V0DT2Z8Z7",
};

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    // console.log(nuxtApp.$pinia.User);
    const { setUserInfo } = useUserStore(nuxtApp.$pinia);
    setUserInfo(user);
    // nuxtApp.$pinia.User.setUserInfo(user); // 更新全域使用者狀態
  });

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("signInWithEmailAndPassword", signInWithEmailAndPassword);
  nuxtApp.provide(
    "createUserWithEmailAndPassword",
    createUserWithEmailAndPassword
  );
  nuxtApp.provide("signInWithCustomToken", signInWithCustomToken);
  nuxtApp.provide("updatePassword", updatePassword);
  nuxtApp.provide("signOut", signOut);
});
