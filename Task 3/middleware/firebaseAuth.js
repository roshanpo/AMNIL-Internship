// const {GoogleAuthProvider} = require('firebase/auth')
// const { initializeApp } = require('firebase-admin/app');
// const admin = require('firebase-admin');

// const serviceAccount = require('../../serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   apiKey: "AIzaSyDPACb7JbIFEBbnBRtBXMGMpdeJnh3RUPo",
//   authDomain: "amnil-task.firebaseapp.com",
//   projectId: "amnil-task",
//   storageBucket: "amnil-task.appspot.com",
//   messagingSenderId: "188911892709",
//   appId: "1:188911892709:web:fd0f0f87b402659b423c0c",
//   measurementId: "G-ELWXNZJJE8"
//   // Other Firebase configurations
// });
// const idToken = String(loginData.idToken);

// admin
// .auth()
// .verifyIdToken(idToken)
// .then((decodedToken) => {
//   // You can access user information in the `decodedToken` object.
//   console.log('User ID:', decodedToken.uid);
//   console.log('Email:', decodedToken.email);
//   // ... other user properties

//   // The token is valid. You can trust this user.
// })
// .catch((error) => {
//   // Handle the error. Token verification failed.
//   console.error('Token verification error:', error);
// });