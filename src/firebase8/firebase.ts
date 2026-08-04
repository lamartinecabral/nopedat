import { firebaseConfig } from "../firebase/config";
import type { default as Firebase } from "../../dist/assets/firebase@8.2.4";
import type { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";

const firebase = window.firebase as unknown as typeof Firebase;

export const initApp = (name) => {
  const app = firebase.initializeApp(firebaseConfig, name);
  return {
    get db() {
      return app.firestore();
    },
    get auth() {
      return app.auth();
    },
  };
};

export const firestore = {
  collection: (db: Firebase.firestore.Firestore, ...path) =>
    db.collection(path.join("/")),
  deleteDoc: (docRef: Firebase.firestore.DocumentReference) => docRef.delete(),
  deleteField: () => firebase.firestore.FieldValue.delete(),
  doc: (db: Firebase.firestore.Firestore, ...path) => db.doc(path.join("/")),
  getDoc: (docRef: Firebase.firestore.DocumentReference, options) =>
    docRef.get(options).then(mapDoc),
  onSnapshot: (
    ref: Firebase.firestore.DocumentReference | Firebase.firestore.Query,
    onNext: (snapshot: DocumentSnapshot | QuerySnapshot) => void,
    onError?: (error: Firebase.firestore.FirestoreError) => void,
    onCompletion?: () => void,
  ) => {
    if ("id" in ref)
      return ref.onSnapshot(
        // @ts-ignore
        (doc) => onNext(mapDoc(doc)),
        onError,
        onCompletion,
      );
    else
      return ref.onSnapshot(
        // @ts-ignore
        (query) => onNext(mapQuery(query)),
        onError,
        onCompletion,
      );
  },
  setDoc: (docRef: Firebase.firestore.DocumentReference, data) =>
    docRef.set(data),
  updateDoc: (docRef: Firebase.firestore.DocumentReference, data) =>
    docRef.update(data),
  getDocs: (query: Firebase.firestore.Query, options) => query.get(options),
  query: (
    colRef: Firebase.firestore.CollectionReference,
    where: [
      string | Firebase.firestore.FieldPath,
      Firebase.firestore.WhereFilterOp,
      any,
    ],
  ) => colRef.where(...where),
  where: (
    fieldPath: string | Firebase.firestore.FieldPath,
    opStr: Firebase.firestore.WhereFilterOp,
    value,
  ): [
    string | Firebase.firestore.FieldPath,
    Firebase.firestore.WhereFilterOp,
    any,
  ] => [fieldPath, opStr, value],
};
export const auth = {
  createUserWithEmailAndPassword: (auth: Firebase.auth.Auth, email, password) =>
    auth.signInWithEmailAndPassword(email, password),
  /**
   * */
  onAuthStateChanged: (
    auth: Firebase.auth.Auth,
    nextOrObserver: Parameters<Firebase.auth.Auth["onAuthStateChanged"]>[0],
    error?: Parameters<Firebase.auth.Auth["onAuthStateChanged"]>[1],
  ) => auth.onAuthStateChanged(nextOrObserver, error),
  sendEmailVerification: (user: Firebase.User) => user.sendEmailVerification(),
  sendPasswordResetEmail: (auth: Firebase.auth.Auth, email) =>
    auth.sendPasswordResetEmail(email),
  signInWithEmailAndPassword: (auth: Firebase.auth.Auth, email, password) =>
    auth.signInWithEmailAndPassword(email, password),
  signOut: (auth: Firebase.auth.Auth) => auth.signOut(),
};

const mapDoc = (
  doc: Firebase.firestore.DocumentSnapshot,
): DocumentSnapshot => ({
  data: () => (doc.exists ? doc.data() : undefined),
  // @ts-ignore
  exists: () => {
    return doc.exists;
  },
  get id() {
    return doc.id;
  },
  get metadata() {
    return doc.metadata;
  },
});

const mapQuery = (query: Firebase.firestore.QuerySnapshot): QuerySnapshot => ({
  // @ts-ignore
  get docs() {
    return query.docs.map(mapDoc);
  },
  get size() {
    return query.size;
  },
  get empty() {
    return query.empty;
  },
  metadata: query.metadata,
  // @ts-ignore
  docChanges: undefined,
  // @ts-ignore
  forEach: undefined,
  // @ts-ignore
  query: undefined,
});
