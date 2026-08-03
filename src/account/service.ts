import { Control } from "./control";
import { State, type Doc } from "./state";
import * as firebase from "../firebase";

const { auth, db } = firebase.initApp();

const {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} = firebase.firestore;

const {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} = firebase.auth;

let offAuthStateChanged: (() => void) | null = null;

export function initAuthListener() {
  if (offAuthStateChanged) offAuthStateChanged();
  offAuthStateChanged = onAuthStateChanged(auth, function (user) {
    if (user) {
      if (!user.emailVerified) {
        Service.sendEmailVerification().then(() => {
          alert("Check your mailbox to verify your e-mail.");
          State.signupMode.pub(false);
          auth.signOut();
        });
      } else {
        State.userEmail.pub(user.email || "");
        State.isLogged.pub(true);
        listDocs();
      }
    } else {
      State.isLogged.pub(false);
    }
  });
}

export function initConfig() {
  getDoc(doc(db, "config", "feature_flags"))
    .then((snap) => {
      const data = snap.data() || {};
      if (data.authLock) {
        State.authLock.pub(true);
      } else {
        State.authLock.pub(false);
      }
    })
    .catch((err) => {
      console.error("Failed to load config:", err);
    });
}

function listDocs() {
  const filter = query(
    collection(db, "ownerships"),
    where("owner", "==", (auth.currentUser || {}).uid),
  );
  State.message.pub("Loading...");
  return getDocs(filter)
    .then(function (res) {
      Promise.all(
        res.docs.map((item) => {
          return Service.getDoc(item.id);
        }),
      )
        .then((docs) => {
          return docs.forEach(Control.addDoc);
        })
        .then(() => res.docs.length && State.message.pub(""));
      if (!res.docs.length)
        State.message.pub("You have not claimed any notes yet.");
      Control.checkUrlParams();
    })
    .catch(function (err) {
      console.error(err);
    });
}

export class Service {
  static createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  static sendEmailVerification() {
    if (!auth.currentUser) throw new Error("no user");
    return sendEmailVerification(auth.currentUser);
  }

  static login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      alert(err.message);
      throw err;
    });
  }

  static logout() {
    return signOut(auth).then(() => Control.clear());
  }

  static claim(docId) {
    return setDoc(doc(db, "ownerships", docId), {
      owner: (auth.currentUser || {}).uid,
    })
      .then(() => Service.getDoc(docId))
      .then((doc) => Control.addDoc(doc));
  }

  static drop(docId) {
    return deleteDoc(doc(db, "ownerships", docId));
  }

  static resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  static getDoc(id: string): Promise<Doc> {
    return getDoc(doc(db, "docs", id)).then((snap) => ({
      ...(snap.data() as Omit<Doc, "id">),
      id,
    }));
  }

  static update(docum, obj) {
    return updateDoc(doc(db, "docs", docum), obj).then(() => {
      State.docs.forEach(async ({ id }, i, a) => {
        if (id !== docum) return;
        a[i] = await Service.getDoc(docum);
      });
    });
  }

  static setProtected(doc, value = true) {
    if (value) {
      return Service.update(doc, {
        protected: (auth.currentUser || {}).uid,
      });
    } else {
      return Service.update(doc, {
        public: deleteField(),
      }).then(() =>
        Service.update(doc, {
          protected: deleteField(),
        }),
      );
    }
  }

  static setPublic(doc, value = true) {
    if (value) {
      return Service.update(doc, { public: true });
    } else {
      return Service.update(doc, { public: deleteField() });
    }
  }
}
