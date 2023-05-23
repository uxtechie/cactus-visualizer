import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDb = getFirestore(firebaseApp)
