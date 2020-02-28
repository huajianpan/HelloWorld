<template>
    <div>
        <van-nav-bar
            class="page-nav-bar"
            title="登录"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #left>
                <van-icon name="cross" size="18" @click="this.$router.back()"/>
            </template>
        </van-nav-bar>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="userName"
                    name="用户名"
                    left-icon="manager"
                    placeholder="用户名"
                    :rules="formRules.userName"
                />
                <van-field
                    v-model="userPwd"
                    type="password"
                    name="密码"
                    left-icon="lock"
                    placeholder="密码"
                    :rules="formRules.userPwd"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
// 1 构建请求登录

import { reactive, toRefs } from "vue"
import { login } from '../../api/user';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import router from '../../router';

function useSubmit(user) {
    const store = useStore()
    const onSubmit = async () => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        const res = await login(user)
        if (res.data.code === 0) {
            store.commit('setUser', res.data)
            Toast.success('用户登录成功')
            router.push('/my')
        } else {
            Toast.fail(res.data.message)
        }
    }
    const formRules = {
        userName: [{ required: true, message: '不可为空' }],
        userPwd: [{ required: true, message: '不可为空' }, { pattern: /^\d{6}$/, message: '格式有误' }]
    }

    return {
        formRules,
        onSubmit,
    }
}
// 2 获取用户名和密码发送到服务器
export default {
    setup(props) {
        const user = reactive({
            userName: '',
            userPwd: ''
        })
        return {
            ...toRefs(user),
            ...useSubmit(user)
        }
    }
}
</script>

<style>
</style>
