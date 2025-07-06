// import admin from 'firebase-admin';
// import serviceAccount from '../../../service.json';


// let _adminApp = null;

// function getAdminApp() {
//   if (_adminApp) return _adminApp;

//    _adminApp = admin.apps.length
//     ? admin.app()
//     : admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//       });

//   return _adminApp;
// }


// const adminDb = getAdminApp().firestore();
// const adminAuth = getAdminApp().auth();

// export { adminDb, adminAuth, admin };

import admin from 'firebase-admin';

const serviceAccount = {
  type: process.env.GCP_TYPE,
  project_id: process.env.GCP_PROJECT_ID,
  private_key_id: process.env.GCP_PRIVATE_KEY_ID,
  private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GCP_CLIENT_EMAIL,
  client_id: process.env.GCP_CLIENT_ID,
  auth_uri: process.env.GCP_AUTH_URI,
  token_uri: process.env.GCP_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GCP_UNIVERSE_DOMAIN,
};

let _adminApp = null;

function getAdminApp() {
  if (_adminApp) return _adminApp;

  _adminApp = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

  return _adminApp;
}

const adminDb = getAdminApp().firestore();
const adminAuth = getAdminApp().auth();

export { adminDb, adminAuth, admin };
