<template>
    <q-card class="q-pa-md shadow-2 my-box-shadow" style="max-width: 400px; width:100%" bordered>
        <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
        </q-card-section>
        <q-card-section>
            <q-input dense outlined v-model="email" label="Email Address"></q-input>
            <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
        </q-card-section>
        <q-card-section>
            <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" @click="signInWithEmail()"></q-btn>
        </q-card-section>
        <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">Don't have an account yet?
                <NuxtLink to="/auth/signup" class="text-dark text-weight-bold" style="text-decoration: none">
                    Signup.
                </NuxtLink>
            </div>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

const email = ref<string>("")
const password = ref<string>("")
const userStore = useUserStore()

function signInWithEmail(){
    if (email.value && password.value){
        // TODO: add checks
        userStore.signInWithEmail(email.value, password.value)        
    }
}
</script>

<style scoped>
.my-box-shadow {
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>