var config = {
    apiKey: "AIzaSyB2tcFqQjaXnKhuc3xGN9kEk5ZyfaxC_bk",
    authDomain: "wanlkingquete.firebaseapp.com",
    databaseURL: "https://wanlkingquete.firebaseio.com",
    projectId: "wanlkingquete",
    storageBucket: "wanlkingquete.appspot.com",
    messagingSenderId: "943004861228"
};
firebase.initializeApp(config);
var db = firebase.database();
var character = db.ref('Characters');

character.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.uid === myId || !childData.uid) {

            document.getElementById('character-list').innerHTML += '<li>' + childData.name +
                '</li>';
        }

    });
});

function writeUserData(Name) {
    db.ref('Characters/' + name).push({
        name: Name,
        uid: myId
    });

}

function PushOnFirebase() {
    let name = document.getElementById("Name").value;
    writeUserData(name);
    window.location.reload();
}

// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: 'home.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

myId = '';

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById('showUser').style.display = 'none';

        if (user) {
            document.getElementById('showUser').style.display = 'block';
            // All datas
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, ' ');
            });

            myId = user.uid;
        } else {

            // Gestion de la deconnexion

            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
initApp();


function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}