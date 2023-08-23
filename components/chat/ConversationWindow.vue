<template>
    <q-list> 
        <div v-for="convo in conversation">
            <q-separator></q-separator>
            <q-item class="q-my-md">
                <q-item-section top avatar>
                    <q-avatar rounded>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
    
                <q-item-section>
                    <q-item-label overline>{{ useUserStore().user?.displayName ?? useUserStore().user?.email?.split('@')[0] }}</q-item-label>
                    <q-item-label> {{ convo.question }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator inset></q-separator>

            <q-item class="q-my-md">
                <q-item-section top avatar>
                    <q-avatar rounded>
                        <img src="https://robohash.org/better-notes">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label overline>Better Notes</q-item-label>
                    <div v-if="convo.answer">
                        <q-item-label> 
                            {{ convo.answer }}
                        </q-item-label>
                        <q-btn no-caps class="q-mt-sm" color="grey-4" text-color="black" label="View Sources" @click="sourceDialog=true"/>
                    </div>
                    <q-item-label v-else="convo.answer"> <q-spinner-dots size="2rem" /></q-item-label>
                </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-dialog v-model="sourceDialog">
                <q-card >
                    <q-card-section>
                    <div class="text-h6">Sources</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-list>
                            <q-expansion-item
                                v-for="source in convo.sources"
                                expand-separator
                                :label="source.content"
                                label-lines="1"
                            >
                                <q-card>
                                <q-card-section>
                                    <p class="text-bold text-h6">Content</p>
                                    <p>{{ source.content }}</p>
                                    <q-btn :href="source.link" target="_blank" label="Document Link" no-caps color="grey-9"/>
                                </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-list>                    
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-list>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const props = defineProps<{
    conversation: any
}>()
const emits = defineEmits(['handleChange'])

const sourceDialog = ref(false)
</script>