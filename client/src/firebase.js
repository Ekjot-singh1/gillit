

import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAzCsfYO8h7qlh1K3xxNaygTnTxoAKSzwA",
  authDomain: "video-2a5b9.firebaseapp.com",
  projectId: "video-2a5b9",
  storageBucket: "video-2a5b9.appspot.com",
  messagingSenderId: "815661273014",
  appId: "1:815661273014:web:67f470a130c5726c747b17"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;
