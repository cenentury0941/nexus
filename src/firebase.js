import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";  
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNFPbEh-IGXcu-ei2z4G_Tt3Q_OR2qJSg",
  authDomain: "combined-hackathon-services.firebaseapp.com",
  databaseURL: "https://combined-hackathon-services-default-rtdb.firebaseio.com",
  projectId: "combined-hackathon-services",
  storageBucket: "combined-hackathon-services.appspot.com",
  messagingSenderId: "151604687446",
  appId: "1:151604687446:web:ef22919571302190e801f7",
  measurementId: "G-NP9FLZ40GH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const email = "hackathon-test@email.com"
const password = "12345abcdef@"

var messagesCallback = (data) => {console.log(data)}

const auth = getAuth();

function login( setLoginState , navigate ){
    setLoginState(1)
    setTimeout( () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginState(2)
          setTimeout(
            () => {
                navigate("/dashboard")}
          ,
          2000)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } , 2000 )
}

function logout(navigate){
    signOut(auth).then(() => {
        navigate("/")
      }).catch((error) => {
      });
}

function postMessage(title, content, img, email, username, profilepic, tags){
  const date = new Date()
  const id = date.getTime().toString()
  set(ref(database, 'nexus/messages/' + id), {
    username : username,
    email: email,
    profile_picture : profilepic,
    title : title,
    content : content,
    img : img,
    id : id,
    csv_tags : tags
  });
}

function getMessages(setMessages){
  messagesCallback = setMessages
}

const messagesRef = ref(database, 'nexus/messages/');

onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  messagesCallback(Object.entries(data).sort( function(a, b){return parseInt(b[0]) - parseInt(a[0])} ))
});

export { login , logout , postMessage , getMessages }