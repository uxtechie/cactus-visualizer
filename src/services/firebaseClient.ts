import { initializeApp } from 'firebase/app'
import { insecuredFirebaseConfig } from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const insecuredFirebaseApp = initializeApp(insecuredFirebaseConfig)
export const insecuredFirebaseDb = getFirestore(insecuredFirebaseApp)
