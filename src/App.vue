<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// 查看store
import { useStore } from 'vuex';
const store = useStore()
console.log(store.state.user)
</script>

<template>
    <router-view></router-view>
</template>

<style>
</style>
