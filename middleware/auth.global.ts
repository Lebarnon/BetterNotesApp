import { useUserStore } from "~/store/user"
import { Notify } from 'quasar'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const publicPages = ['/public']
    const authPages = ["/auth/login", "/auth/signup"]; 
    //check if the "to" path is a public page or not
    const authNotRequired = authPages.includes(to.path); 
    //The conditional is false, then send the user to the right place
    if (!authNotRequired && useUserStore().isAuthenticated === false) {
        return navigateTo('/auth/login')
    }
})