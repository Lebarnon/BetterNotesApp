import { User } from "firebase/auth"
import AppUser from "types/AppUser"

export default function userSerializer(){
    return (appUser: AppUser) => function(){
        const {userSerializer, ...otherInfo} = appUser
        return {...otherInfo}
    }
}