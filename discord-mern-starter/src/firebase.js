import firebase from 'firebase'

const firebaseConfig = {
    // your firebase config
    apiKey: "AIzaSyD4dDENepCg0KlsulO0YDnFl6awZIhZ80A",
    authDomain: "merndiscord.firebaseapp.com",
    projectId: "merndiscord",
    storageBucket: "merndiscord.appspot.com",
    messagingSenderId: "92216303461",
    appId: "1:92216303461:web:6da5f3191a28054ff48b8c",
    measurementId: "G-CXEHHW52HP"
    
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db