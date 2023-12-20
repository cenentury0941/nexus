import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";  
import { getStorage, ref as refStorage,  uploadBytes } from "firebase/storage";

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

const url_start = "https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/";
const url_end = "?alt=media&token=eb9599ea-4b29-43f1-bcc3-336f42ca1bed";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const email = "hackathon-test@email.com"
const password = "12345abcdef@"
const username = "Jane Doe"
const profilepic = "https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/JaneDoe.png?alt=media&token=f6b798af-582b-460e-b8a4-dd164772c510"

var messagesCallback = (data) => {console.log(data)}
var commentsCallback = (data) => {console.log(data)}

var localdata = []
var localcommentdata = []

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


function postComment(title, content, img, email, username, profilepic, tags , response_to){
  const date = new Date()
  const id = date.getTime().toString()
  set(ref(database, 'nexus/comments/' + id), {
    username : username,
    email: email,
    profile_picture : profilepic,
    title : title,
    content : content,
    img : img,
    id : id,
    csv_tags : tags,
    response_to : response_to
  });
}

function getMessages(setMessages){
  messagesCallback = setMessages
  setMessages(localdata)
}

function getComments(setComments){
  commentsCallback = setComments
  setComments(localcommentdata)
}

function getMessagesByUsername(uname){
  return localdata.filter( (item) => {return item[1].username === uname} )
}

const messagesRef = ref(database, 'nexus/messages/');

onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  localdata = Object.entries(data).sort( function(a, b){return parseInt(b[0]) - parseInt(a[0])} )
  messagesCallback(localdata)
});

const commentsRef = ref(database, 'nexus/comments/');

onValue(commentsRef, (snapshot) => {
  const data = snapshot.val();
  if( data === undefined )
  {
    return
  }
  localcommentdata = Object.entries(data).sort( function(a, b){return parseInt(b[0]) - parseInt(a[0])} )
  commentsCallback(localcommentdata)
});


async function uploadImage(event,setImgUrl)
{
    var file = event.target.files[0];
    const storageRef = refStorage(storage, file.name);

    uploadBytes(storageRef, file).then( async (snapshot) => {
    console.log('Uploaded a blob or file!');
    console.log(storageRef.fullPath);

    var image_url = url_start + storageRef.fullPath.replaceAll( " " , "%20" ) + url_end;
    console.log( "Image URL : " + image_url );

    setImgUrl(image_url)

    });

}

function getConnections() {
    var connections = []
    var names_cache = []
    localdata.forEach( (item) => {
      if(item[1]["username"] === username)
      {
        return
      }
        if( !(names_cache.includes(item[1]["username"])))
        {
          names_cache.push( item[1]["username"] )
          connections.push( { username : item[1]["username"] , profile_picture : item[1]["profile_picture"] } )
        }
    } )
    console.log( "Connections" )
    console.log(connections)
    return connections
}


function getConnectionsCount(){
  var connections = []
  var names_cache = []
  localdata.forEach( (item) => {
    if(item[1]["username"] === username)
    {
      return
    }
      if( !(names_cache.includes(item[1]["username"])))
      {
        names_cache.push( item[1]["username"] )
        connections.push( { username : item[1]["username"] , profile_picture : item[1]["profile_picture"] } )
      }
  } )
  console.log( "Connections" )
  console.log(connections)
  return connections.length
}

function getUsername() {
  return username
}

function getProfilePic() {
  return profilepic
}


export { login , logout , postComment, getComments,  postMessage , getMessages , getMessagesByUsername , uploadImage , getConnections, getUsername , getProfilePic, getConnectionsCount}