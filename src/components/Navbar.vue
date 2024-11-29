<template>
    <nav class="flex items-center justify-between p-4 w-full border-b dark:border-surface-700 border-surface-200">
        <Menubar class="w-full m-0 border-none" :model="items">
            <template #start>
                <RouterLink to="/" class="text-2xl font-bold select-none cursor-pointer">Logo</RouterLink>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                            item.shortcut }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <Button v-if="mode === 'dark'" icon="pi pi-sun" severity="secondary" @click="next()">

                    </Button>
                    <Button v-if="mode === 'light'" icon="pi pi-moon" severity="secondary" @click="next()"></Button>
                    <Button v-if="mode === 'auto'" icon="pi pi-desktop" severity="secondary" @click="next()"></Button>


                    <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                     <Avatar @click="togglePopover" v-if="isAuthenticated" :image="user?.user_metadata?.avatar_url" shape="circle" />
                    <Popover ref="op">
                       <Button @click="logout()">Logout</Button>
                    </Popover>

                    <Button label="Login" v-if="!isAuthenticated" @click="login()" />
                </div>
            </template>
        </Menubar>

    </nav>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

const router = useRouter();

import { ref } from "vue";
const op = ref();
const togglePopover = (event:any) => {
    op.value.toggle(event);
}
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    },
    {
        label: 'Quiz',
        icon: 'pi pi-search',
        badge: 3,
        items: [
            {
                label: 'Play',
                icon: 'pi pi-bolt',
                shortcut: '⌘+S'
            },
            {
                label: 'Create',
                icon: 'pi pi-server',
                shortcut: '⌘+B'
            },
            {
                separator: true
            },
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                shortcut: '⌘+U'
            }
        ]
    }
]);


const authStore = useAuthStore();
const { login, logout } = authStore;
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