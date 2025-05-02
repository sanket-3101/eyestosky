// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCkyclwDfJqr8CsQkmYScqf3meQLrEmQlk",
    authDomain: "rab-and-rab-associates-llp.firebaseapp.com",
    projectId: "rab-and-rab-associates-llp",
    storageBucket: "rab-and-rab-associates-llp.appspot.com",
    messagingSenderId: "771198469887",
    appId: "1:771198469887:web:407b34a2ac4faaf562aeca",
    measurementId: "G-4NL36HHBY1"
};


const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
console.log('Message ==>', messaging)
export const generateToken = async () => {
    try {
        const persmission = await Notification.requestPermission()
        console.log('Permisionn ===>', persmission)
        if (persmission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: 'BEgT_EDvQ7U9G5jEBNunJadKBQZwETMTGYKYiE61esYeYuCWeyX_irJiuv5bN8SBuEyU1b-tXFc1o5ZsXR8GTfI'
            })
            return token
        } else {
            return null
        }
    }catch(error) {
        console.log('Error ==>', error)
    }

}