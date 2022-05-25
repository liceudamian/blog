const firebaseConfig = {
    apiKey: "AIzaSyDxnNfA42AkccuJZ2reXcFZXBOD7Co1mWY",
    authDomain: "blog-lt-liviu-damian.firebaseapp.com",
    projectId: "blog-lt-liviu-damian",
    storageBucket: "blog-lt-liviu-damian.appspot.com",
    messagingSenderId: "73492998109",
    appId: "1:73492998109:web:4d3355a59285c073b6b834",
    measurementId: "G-7FKP3G4RBQ"
};

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}


const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postBtn = document.getElementById('post-btn');

let user = null;
let admins=["9J6WAqJN0sTmmkjNX7lZmSadegc2"];

//setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

//referinta la serviciu de autentificare
const auth=firebase.auth();

//referinta la bd
const db=firebase.firestore();

//referinta la colectia de postari din BD
const postDB=db.collection('posts');

//alegem provider de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick=function(){
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() {
        window.location.reload();
    });
}
logoutBtn.onclick=function(){
    auth.signOut();
    window.location.reload();
}

function isAdmin(){
    let admin;
    if (user == null) return false;
    
    admin=admins.includes(user.uid); //true sau false

    return admin;
}

function formatDate(time){
    let date=new Date(time);
    let zi=date.getDate();
    let luna=date.getMonth()+1;
    let an=date.getFullYear();
    let result;
    if (zi<10) result="0"+zi+"/"; else result=zi+"/";
    if (luna<10) result+="0"+luna+"/"; else result+=luna+"/";
    result+=an;
    return result;
}

auth.onAuthStateChanged(function(fuser){ 
    user=fuser;
    console.log(user);
    if (user!=null){
        // logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
        document.getElementById("username").innerHTML="Salut, "+user.displayName;
        if (isAdmin()==true){
            postBtn.style.display = "block";
        }
        else{
            postBtn.style.display = "none";
        }
    }
    else{
        //nu e logat in sistem
        loginBtn.style.display = "block";
    }
    document.querySelector('body').style.display="block";
})

const yearElement = document.getElementById('year');
if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

