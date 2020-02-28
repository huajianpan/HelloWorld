<template>
    <div class="my-container">
        <!-- 未登录布局 -->
        <div v-if="!userState" class="header not-login">
            <div class="login-btn" @click="this.$router.push('/login')">
                <img
                    src="https://p3.ssl.qhimgs0.com/dr/200_200_60/t0136d10d9810f54365.jpg"
                    alt
                    class="mobile-img"
                />
                <span class="text">注册 / 登录</span>
            </div>
        </div>
        <!-- 已登录布局 -->
        <div v-else class="header not-login">
            <van-row align="center" justify="center">
                <van-col span="10">
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        fit="cover"
                        :src="host + userInfo.photo"
                    />
                </van-col>
                <van-col span="7">{{ userInfo.userName }}</van-col>
                <van-col span="7">编辑资料</van-col>
            </van-row>
            <!-- <div class="login-btn" @click="this.$router.push('/login')">
                <van-image
                    round
                    width="3rem"
                    height="3rem"
                    fit="cover"
                    :src="userInfo.photo"
                />
                <span class="text">{{ userInfo.userName }}</span>
            </div>-->
        </div>
        <!-- 统计 -->
        <van-row>
            <van-col span="6">
                <van-row justify="center">{{ userInfo.art_count }}</van-row>
                <van-row justify="center">头条</van-row>
            </van-col>
            <van-col span="6">
                <van-row justify="center">{{ userInfo.follow_count }}</van-row>
                <van-row justify="center">关注</van-row>
            </van-col>
            <van-col span="6">
                <van-row justify="center">{{ userInfo.fans_count }}</van-row>
                <van-row justify="center">粉丝</van-row>
            </van-col>
            <van-col span="6">
                <van-row justify="center">{{ userInfo.like_count }}</van-row>
                <van-row justify="center">收藏</van-row>
            </van-col>
        </van-row>
        <!-- 导航 -->
        <van-grid :column-num="2" clickable>
            <van-grid-item icon="star-o" text="收藏" />
            <van-grid-item icon="clock-o" text="历史" />
        </van-grid>
        <!-- 消息通知与退出登录 -->
        <van-cell-group>
            <van-cell title="消息通知" is-link />
            <van-cell title="小智同学" is-link />
            <van-cell title="退出登录" title-class="logout-cell" v-if="userState" @click="onLogout" />
        </van-cell-group>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive, onMounted, toRefs } from 'vue';
import { Dialog } from 'vant';
import { getUserInfo } from '../../api/user';

function userLogout(store) {
    const onLogout = () => {
        Dialog.confirm({
            title: '确认退出吗',
        })
            .then(() => {
                store.commit('setUser', null)
                // on confirm
            })
            .catch(() => {
                // on cancel
            });
    }
    return {
        onLogout
    }
}
function useLoadUserInfo() {
    const state = reactive({
        userInfo: {
            userName: '',
            art_count: 0,
            follow_count: 0,
            fans_count: 0,
            like_count: 0,
            photo: '',
        }
    })
    const store = useStore()
    const userState = computed(() => store.state.user)
    // 读取.env环境变量的值
    const host = import.meta.env.VITE_APP_URL
    const loadUserInfo = () => {
        if (userState.value !== null) {
            getUserInfo(userState.value.data.id).then(res => {
                state.userInfo = res.data
            })
        }
    }
    onMounted(() => {
        loadUserInfo()
    })
    return {
        store,
        userState,
        state,
        host
    }
}
export default {
    setup() {
        const { store, userState, state, host } = useLoadUserInfo()
        return {
            ...toRefs(state),
            userState,
            host,
            ...userLogout(store)
        }
    },
}
</script>

<style>
.logout-cell {
    text-align: center;
    color: #d86262;
    height: 120px;
    margin-top: 9px;
}
</style>