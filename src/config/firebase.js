import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

    
const firebaseConfig = {
    apiKey: "AIzaSyAfY9eftQAHR4fyG1sJ6wJVL0e01Si8IJw",
    authDomain: "chat-app-ds-5939e.firebaseapp.com",
    projectId: "chat-app-ds-5939e",
    storageBucket: "chat-app-ds-5939e.firebasestorage.app",
    messagingSenderId: "819571129983",
    appId: "1:819571129983:web:222d8fdc20f58ba1f1094a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email: email,
            name: "",
            avatar: "",
            bio: "Hey, Threr I am using chat app",
            lastSeen: Date.now()
        })

        await setDoc(doc(db, "chats", user.uid), {
            chatsData: [],
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

export { signup, login, logout, auth, db }