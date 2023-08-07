import { User} from "firebase/auth";

export default interface AppUser{
    uid: string
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    phoneNumber: string | null,
    photoURL: string | null,
    phoneNumberVerified: boolean,
    userSerializer: Function,
}