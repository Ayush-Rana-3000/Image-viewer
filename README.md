# Image-viewer
A web application using HTML, CSS, JavaScript, and Firebase services for user authentication and image management. Through a login page and dashboard, users can upload, browse, and manage images, facilitated by Firebase Authentication, Firestore, and Firebase Storage for seamless functionality and data management.


HTML:

There are two HTML files: index.html (Login Page) and dashboard.html (Dashboard Page).
index.html contains login and signup forms.
dashboard.html contains a navigation bar, a gallery section, and an upload section.
The navigation bar includes buttons for Gallery, Upload Image, and LogOut.
The Gallery section displays images uploaded by the user.
The Upload section allows users to upload images.

CSS:

Contains styles for the login and signup containers, form elements, navigation bar, image gallery, upload container, buttons, loader, and modal.

JavaScript:

Initializes Firebase with the provided configuration.
Sets up authentication, Firestore, and storage references.
Provides functions for handling user authentication (login, signup, logout).
Handles image uploads to Firebase Storage and saves image URLs to Firestore.
Retrieves user information and displays it in the dashboard.
Sets up an image gallery and modal for viewing images.
Provides functions for deleting images from the gallery.
Defines event listeners for form submissions and navigation buttons.
Overall, the code integrates Firebase for user authentication, Firestore for data storage, and Firebase Storage for storing images. It allows users to log in, sign up, upload images, view their uploaded images in a gallery, and log out.
