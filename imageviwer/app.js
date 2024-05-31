// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDnl-l0FxqcAJ6bHMpB-cAtcM5F-2xFnRk",
    authDomain: "login-page-50608.firebaseapp.com",
    projectId: "login-page-50608",
    storageBucket: "login-page-50608.appspot.com",
    messagingSenderId: "214349148957",
    appId: "1:214349148957:web:2f849d411d33d350af67f4",
    measurementId: "G-ZLDXKVGG2X"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Define a variable to keep track of the onAuthStateChanged listener
let authStateChangedListener;

// Function to set up the image gallery and add the onAuthStateChanged listener
function initializeApp() {
  authStateChangedListener = auth.onAuthStateChanged((user) => {
    if (user) {
      setupImageGallery(user.uid);
    } else {
      window.location.href = 'index.html';
    }
  });
}

// Function to remove the onAuthStateChanged listener
function removeAuthStateChangedListener() {
  if (authStateChangedListener) {
    authStateChangedListener(); // Calling the listener as a function removes it
  }
}

function setupImageGallery(userId) {
    const imageGallery = document.getElementById('imageGallery');
    const username = document.getElementById("Username");
    const name_user = document.getElementById("name_user");

// ${user.name}
    db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const user = doc.data();
                username.innerHTML = `User: ${user.username}`;
                name_user.innerHTML = `Hello, ${user.name}`;

            }
        })
        .catch((error) => {
            console.log('Error fetching user information:', error);
    });

    db.collection('users').doc(userId).collection('images').get()
        .then((querySnapshot) => {
            // Clear the gallery before updating it with new images
            imageGallery.innerHTML = '';

            querySnapshot.forEach((doc) => {
                const image = doc.data();
                const imageContainer = document.createElement('div');
                imageContainer.className = 'gallery';
                const img = document.createElement('img');
                img.src = image.url;
                img.className = 'uploaded-image';
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerText = 'X';
                deleteButton.addEventListener('click', () => deleteImage(userId, doc.id));

                imageContainer.appendChild(img);
                imageContainer.appendChild(deleteButton);
                imageGallery.appendChild(imageContainer);
            });

            const images = document.getElementsByClassName('uploaded-image');
            for (const image of images) {
                image.addEventListener('click', (event) => {
                    // Get the clicked image URL
                    const clickedImageURL = event.target.src;

                    // Show the image in the modal
                    showImageInModal(clickedImageURL);
                });
            }


        })
        .catch((error) => {
            console.log('Error getting images:', error);
        });
}





function showImageInModal(imageURL) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    // Show the modal
    modal.style.display = 'block';
    modalImage.src = imageURL;

    // Add event listener to close the modal when clicking the close button
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Add event listener to close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}




// Function to delete an image from the gallery
function deleteImage(userId, imageId) {
    db.collection('users').doc(userId).collection('images').doc(imageId).delete()
        .then(() => {
            console.log('Image deleted successfully!');
            // Reload the page to see the changes after image deletion
            location.reload();
        })
        .catch((error) => {
            console.log('Error deleting image:', error);
        });
}


// Function to handle image upload
function uploadImage() {
    const uploadLoader = document.getElementById('uploadLoader');
    const userId = auth.currentUser.uid;
    const imageInput = document.getElementById('imageInput');
    const file_err = document.getElementById("file-err");

    uploadLoader.style.display = "block";

    if(imageInput.files.length == 0 ){
        file_err.style = "color:red;font-size:0.8em;";
        file_err.innerHTML = "No files selected";
        uploadLoader.style.display="none";
        return;
    }

    const imageFile = imageInput.files[0];

    // Generate a unique ID for the image
    const imageId = new Date().getTime().toString();

    // Upload image to Firebase Storage
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${userId}/${imageId}`);

    imageRef.put(imageFile)
        .then((snapshot) => {
            // Get the download URL for the uploaded image
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
            // Save the image URL in Firebase Firestore
            return db.collection('users').doc(userId).collection('images').doc(imageId).set({
                url: downloadURL,
            });
        })
        .then(() => {
            file_err.style = "color:green;font-size:0.8em;";
            file_err.innerHTML ="Image uploaded successfully!"

            console.log('Image uploaded successfully!');
            // After image upload, show the changes made by updating the image gallery
            setupImageGallery(userId);
            document.querySelector("#imageInput").value = "";
        })
        .catch((error) => {
            console.log('Error uploading image:', error);
        })
        
     
        // Hide the loader once the image is uploaded (whether successful or not)
        uploadLoader.style.display = "none";
    
}


// Login Form Event Listener
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');
const signupForm = document.getElementById('signupForm');
const signupErrorMessage = document.getElementById('signup-error-message');
if (loginForm && signupForm) {
    // Element not found on the login page, so just return


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Sign in with Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in:', user.email);
            window.location.href = 'dashboard.html'; // Redirect to the dashboard page on successful login
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log('Error:', errorMessage);
            document.getElementById('error-message').innerText = errorMessage;
        });
});

// Signup Form Event Listener


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm.signupEmail.value;
    const password = signupForm.signupPassword.value;
    const name = signupForm.signupName.value; // Get the name input value
    const username = signupForm.signupUsername.value; // Get the username input value


    // Sign up with Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user.email);

            // Save additional user information in Firestore
            db.collection('users').doc(user.uid).set({
                name: name,
                username: username,
            })
            .then(() => {
                console.log('Additional user information saved in Firestore');
            })
            .catch((error) => {
                console.log('Error saving additional user information:', error);
            });        
        })
            
        .catch((error) => {
            const errorMessage = error.message;
            console.log('Error:', errorMessage);
            document.getElementById('signup-error-message').innerText = errorMessage;
        });

});
}




const signin_page = document.querySelector(".login-container");
const signup_page = document.querySelector(".signup-container");
const gallery_page = document.getElementById("gallery-page");
const uploads_page = document.getElementById("upload-page");


function signup() {
    signin_page.style.display = "none";
    signup_page.style.display = "block";
}

function signin() {
    signin_page.style.display = "block";
    signup_page.style.display = "none";
}

function gallery(){
    gallery_page.style.display = 'grid';
    uploads_page.style.display = 'none';
}

function upload(){
    gallery_page.style.display = 'none';
    uploads_page.style.display = 'flex';
}