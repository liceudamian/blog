const postareSect=document.getElementById('postare-section');

const url = new URL(document.location);
let id=url.searchParams.get("id");
let postare;

postDB.doc(id).get().then(renderPost);

function renderPost(doc){
    postare=doc.data();

    let delBtn='';
    if (isAdmin()==true){
        delBtn=`<div onclick="delp()" class="delete"><i class="fas fa-trash"></i></div>`;
    }
    
    let html=`
    <div class="postare-full">
                ${delBtn}
                <div class="likes" onclick="like()">
                    <i class="far fa-heart" id="no-like"></i>
                    <i class="fas fa-heart" id="yes-like"></i>
                    <span id="likes-count">${postare.likes.length}</span>
                </div>

                <h1 class="centered">${postare.title}</h1>
                <img
                    src="${postare.image}">
                <p>
                    ${postare.long}
                </p>

                <br/>
                <span><i>Creat de: </i></span>
                <i>${postare.username}</i>
                <br>
                <span id="data">${formatDate(postare.created)}</span>
            </div>
    `;
    postareSect.innerHTML=html;
    if (user !=null && postare.likes.includes(user.uid)){
        document.getElementById('no-like').style.display='none';
    }
    else {document.getElementById('yes-like').style.display='none';
    }
}

function delp(){
    let confirmdel=confirm("Sunteti sigur ?");
    if (confirmdel==true){
        postDB.doc(id).delete().then(showPost);
    }
}

function showPost(){
    window.location="postari.html";
}

function refresh(){
    window.location.reload();
}

function like(){
    if (postare.likes.includes(user.uid)==false){
        postDB.doc(id).update({
            likes:firebase.firestore.FieldValue.arrayUnion(user.uid)
        }).then(refresh)
    }
    else{
        postDB.doc(id).update({
            likes:firebase.firestore.FieldValue.arrayRemove(user.uid)
        }).then(refresh)
    }
}