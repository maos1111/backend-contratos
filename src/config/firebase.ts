import admin from 'firebase-admin';
import serviceAccount from '../../contratos-mdw-firebase-adminsdk-fbsvc-78f5c86ea2.json';

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();
export default admin;
