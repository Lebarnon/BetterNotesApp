import { User } from 'firebase/auth'
import userSerializer from '~/utils/serializer/userSerializer'
import { AppUser } from '~/types/types'

// create a BNUser object from 
const serializer = userSerializer()
const fromFirestore = function (userFirestoreData: any){
    const appuser: AppUser = {
        ...userFirestoreData,
    }
    appuser.userSerializer = serializer(appuser)
    return appuser
}
// used when new user is created... init AppUser object with additional params and default values
const fromFirebaseUser = function (user: User){
    const appuser: AppUser = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        phoneNumberVerified: false,
        userSerializer: () => {}
    }
    appuser.userSerializer = serializer(appuser)
    return appuser
    }
const userfactory = {
    fromFirestore,
    fromFirebaseUser,
}
export default userfactory