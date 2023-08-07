import { defineStore } from 'pinia'
import { AppUser } from '@/types/types'
import { UserCredential, User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import userfactory from '@/utils/factory/userfactory'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | AppUser,
    isLoading: false as Boolean,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    async initAuth() { 
      const { $auth } = useNuxtApp()

      return new Promise(resolve => {
        // this adds a hook for the initial auth-change event
        onAuthStateChanged($auth, (user) => {
          useUserStore().setUser(user).then(() => {
            console.log("user initialised")
            resolve(user)
          })
        })
      })
    },
    // used by onauthstatechange to change the user state
    async setUser(user: User | null) {     
      const { $firestore } = useNuxtApp()
      if (user) {
        console.log('User Store: user signed in...')
        // get user info from firestore
        const docRef = doc($firestore, "users", user.uid);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          this.user =  userfactory.fromFirestore(snapshot.data())
        } else {
          const newAppUser = userfactory.fromFirebaseUser(user)
          await setDoc(doc($firestore, "users", user.uid), newAppUser.userSerializer())
        }
        useRouter().replace('/')
      } else {
        console.log('User Store: user not logged in or created yet')
        this.user = null
      }
    },
    // sign in user with email
    async signInWithEmail (email: string, password: string) {
      const { $auth, $firestore } = useNuxtApp()

      signInWithEmailAndPassword($auth, email, password).then(() => {
        Notify.create({ message: "Successfully Signed in!", color: 'positive' })
        useRouter().push("/")
      })
      .catch((error) => {
        console.log(error)
        Notify.create({ message: "Login Failed: " + error.code, color: 'negative' })
      })
    },
    async signUpWithEmail(email: string, password: string){
      const { $auth, $firestore } = useNuxtApp()
      createUserWithEmailAndPassword($auth, email, password).then(async (userCredential) => {
      }).catch((error) => {
        console.error(error)
        Notify.create({ message: "Sign Up Failed: " + error.code, color: 'negative' })
        return
      })
      useRouter().push("/")
    },
    async signOut() {
      const { $auth, $firestore } = useNuxtApp()
      try {
        await $auth.signOut()
        useRouter().push("/auth/login")
      } catch (error) {
        console.error("Sign out failed")
        Notify.create({ message: "Sign Out Failed: " + error, color: 'negative' })
      }
    },
    // async resetPassword(email: string){
    //   const { $auth, $firestore } = useNuxtApp()
    //   if(email.trim() == ""){
    //     useSnackbarStore().display("Please enter an email!", "red-darken-2")
    //     return
    //   }
    //   sendPasswordResetEmail($auth, email)
    //   .then(() => {
    //     useSnackbarStore().display("Password reset email sent!", "green-darken-2")
    //   })
    //   .catch((error) => {
    //     useSnackbarStore().display(error.code, "red-darken-2")
    //   });
    // },
  }
})
