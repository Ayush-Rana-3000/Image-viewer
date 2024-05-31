# Image-viewer
The provided code comprises a web application leveraging HTML, CSS, JavaScript, and Firebase services to enable user authentication, image management, and interaction within a digital gallery setting. Featuring a login page for authentication and signup, users are seamlessly directed to a dashboard upon successful login. The dashboard hosts an intuitive navigation bar facilitating access to key functionalities like browsing the image gallery, uploading new images, and logging out. Powered by Firebase Authentication for user management, Firestore for data storage, and Firebase Storage for image storage, the application ensures a smooth user experience. Users can effortlessly upload, view, and manage their image collections within the gallery, integrating modern design principles with robust backend infrastructure for a compelling digital gallery platform.
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


