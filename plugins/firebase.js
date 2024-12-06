import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        const userStore = useUserStore(nuxtApp.$pinia);
        const { setUserInfo } = userStore;
        setUserInfo(user);
        return resolve(user);
      });
    });
  };
  // onAuthStateChanged(auth, (user) => {
  //   const userStore = useUserStore(nuxtApp.$pinia)
  //   const {setUserInfo} = userStore
  //   setUserInfo(user)
  // })

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("signInWithEmailAndPassword", signInWithEmailAndPassword);
  nuxtApp.provide(
    "createUserWithEmailAndPassword",
    createUserWithEmailAndPassword
  );
  nuxtApp.provide("signOut", signOut);
  nuxtApp.provide("getCurrentUser", getCurrentUser);
});
