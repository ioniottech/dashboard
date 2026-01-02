// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3InTcj1j0yci8Y2j-6k8v6_pTQ-WmuMI",
  authDomain: "ioniottech.firebaseapp.com",
  projectId: "ioniottech",
  storageBucket: "ioniottech.appspot.com",
  messagingSenderId: "85048863774",
  appId: "1:85048863774:web:9d30bda93562833cff120f",
  measurementId: "G-V5CXFZWWQ9"
};

const app = initializeApp(firebaseConfig);
let analytics: ReturnType<typeof getAnalytics> | null = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may fail in some environments; swallow errors silently
  analytics = null;
}

const auth = getAuth(app);

export { app, analytics, auth };
