import { defineStore } from 'pinia'
import { User } from '@/types/types'
import { UserCredential, UserInfo, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | User,
    isLoading: false as Boolean,
  }),
  actions: {
    async initAuth() {
      return 
    },
    async setUser(user: UserInfo) {         
      if (user) {
        console.log('User Store: user signed in...')
        // get user info from firestore
        const docRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          this.user = {id: snapshot.id, ...snapshot.data()}
        } else {
          console.log("This user should not exist", id);
          this.user = {...user}
        }
      } else {
        console.log('User Store: user not logged in or created yet')
        this.user = null
      }
    },
    async signInWithEmail (email, password) {
      signInWithEmailAndPassword(auth, email, password).then(() => {
        useSnackbarStore().display("Successfully Signed in!", "green-darken-2")
        router.push("/")
      })
      .catch((error) => {
        useSnackbarStore().display("Login Failed: " + error.code, "red-darken-2")
        return error.code
      })
      return true
    },
    async signUp(userInfo){
      const {email, password, ...otherInfo} = userInfo
      otherInfo.ownListingIds = []
      otherInfo.favListingIds = []
      createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
          await setDoc(doc(db, "users", userCredential.user.uid), {email, ...otherInfo})
      }).catch((err) => {
        useSnackbarStore().display(err.code, "red-darken-2")
        return err.code
      })
      router.push("/")
      return true

    },
    async signOut() {
      try {
        await auth.signOut()
        router.push("/")
      } catch (err) {
        console.error(err)
      }
    },
    async resetPassword(email){
      if(email.trim() == ""){
        useSnackbarStore().display("Please enter an email!", "red-darken-2")
        return
      }
      sendPasswordResetEmail(auth, email)
      .then(() => {
        useSnackbarStore().display("Password reset email sent!", "green-darken-2")
      })
      .catch((error) => {
        useSnackbarStore().display(error.code, "red-darken-2")
      });
    },
    async signUpWithEmailAndPassword(email: string, password: string){
      const {$auth} = useNuxtApp()
      createUserWithEmailAndPassword($auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }
})
