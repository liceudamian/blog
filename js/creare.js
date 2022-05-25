const titleIn=document.getElementById("titlul");
const imgIn=document.getElementById("link-img");
const descsIn=document.getElementById("desc-scurt");
const desclIn=document.getElementById("desc-lung");
const creareBtn=document.getElementById("creare-btn");
const form=document.getElementById("creare-form");

creareBtn.onclick=function(e){
    e.preventDefault();
    if (form.checkValidity()==false) {form.reportValidity();}
    else {
        let data= new Date();
        let postare={
            title: titleIn.value,
            image: imgIn.value,
            short: descsIn.value,
            long: desclIn.value,
            likes: [],
            username: user.displayName,
            created: data.getTime()
        }

        form.reset();

        postDB.add(postare).then(function(){
            alert("Postare a fost adaugata!");
            window.location="postari.html";
        });
    }
}

auth.onAuthStateChanged(function(fuser){
    if (isAdmin()==false){
        window.location="../index.html";
    }
})