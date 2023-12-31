import { useUserStore } from "~/store/user"
import { Notify } from 'quasar'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("triggered",useUserStore().isAuthenticated)
    const publicPages = ['/public']
    const authPages = ["/auth/login", "/auth/signup"]; 
    //check if the "to" path is a public page or not
    const authNotRequired = authPages.includes(to.path); 
    //The conditional is false, then send the user to the right place
    if (useUserStore().isAuthenticated && authNotRequired){
        return navigateTo('/')
    }
    if (!authNotRequired && useUserStore().isAuthenticated === false) {
        return navigateTo('/auth/login')
    }
})