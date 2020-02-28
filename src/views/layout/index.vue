<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">{{ userState ? '我的' : '未登录' }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore()
        const userState = computed(() => store.state.user)
        const active = ref(0);
        return { active, userState };
    },
};
</script>

<style>
</style>