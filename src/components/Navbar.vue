<template>
    <nav class="flex items-center justify-between p-4">
        <RouterLink to="/" class="text-2xl font-bold select-none cursor-pointer">Logo</RouterLink>

        <div class="flex items-center justify-between gap-2">
            <Button variant="outlined" @click="next()">
                <SunDim :size="20" v-if="mode === 'dark'" />
                <Moon :size="20" v-if="mode === 'light'" />
                <MonitorDot :size="20" v-if="mode === 'auto'" />{{ mode }}
            </Button>
            <RouterLink to="/about">
                <Button>About</Button>
            </RouterLink>

            <Button v-if="!isAuthenticated" @click="login()">Login</Button>  
            <div v-else class="flex items-center">
                <img :src="user?.user_metadata?.avatar_url" class="w-8 h-8 rounded-full mr-2" v-if="user?.user_metadata?.avatar_url !== ''" :alt="user?.user_metadata?.full_name" />
            </div>  
            
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'
import { Button } from 'primevue';
import { watchEffect } from 'vue'
import { SunDim, Moon, MonitorDot } from 'lucide-vue-next';
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore();
const { login } = authStore;
const { user, isAuthenticated } = storeToRefs(authStore); // State

const mode = useColorMode({
    emitAuto: true,
    modes: {
        contrast: 'dark contrast',
        cafe: 'cafe',
    },
})

const { state, next } = useCycleList(['dark', 'light', 'auto'] as const, { initialValue: mode })

watchEffect(() => mode.value = state.value)
</script>