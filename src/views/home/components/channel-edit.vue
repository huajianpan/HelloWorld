<template>
    <div class="channel-edit">
        <van-cell title="我的频道">
            <template #value>
                <van-button @click="isEdit = !isEdit" type="danger" round size="small" plain>{{ isEdit ? 'ㅤ保存ㅤ' : 'ㅤ编辑ㅤ' }}</van-button>
            </template>
        </van-cell>
        <van-grid :column-num="4" :gutter="10" class="my-channels">
            <van-grid-item @click="onMyChannelClick(channel, i)" class="grid-item" v-for="(channel, i) in mychannels" :key="channel.id" :icon="isEdit && !fixedChannels.includes(channel.id) ? 'clear' : ''">
                <template #text>
                    <span :class="i == active ? 'grid-item--active' : ''">{{ channel.name }}</span>
                </template>
            </van-grid-item>
        </van-grid>

        <van-cell title="频道推荐" />
        <van-grid :column-num="4" :gutter="10">
            <van-grid-item class="grid-item" v-for="channel in recommand" :key="channel.id" icon="add-o" :text="channel.name" @click="addChannel(channel)" />
        </van-grid>
    </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs } from 'vue';
import { getAllChannels, addUserChannels, removeUserChannels } from '../../../api/channels';
import _ from 'lodash';
import { useStore } from 'vuex';
import { setItem } from '../../../utils/storage';
import { Toast } from 'vant';
function useChannels(props) {
    const state = reactive({
        allChannels: [],
    })
    const getChannels = () => {
        getAllChannels().then(res => {
            console.log(res)
            state.allChannels = res.data
        })
    }
    const recommand = computed(() =>  _.differenceBy(state.allChannels, props.mychannels, 'id'))
    onMounted(getChannels)
    return {
        recommand
    }
}
function useEditChannel({ mychannels, active }, state, emit) {
    const store = useStore()
    // 方式一 可以
    // @click="mychannels.push(channel)" 
    
    // 方式二 报错
    // @click="addChannel(channel)" 
    // const addChannel = mychannels.push
    // Uncaught TypeError: Cannot read property 'apply' of undefined
    // at Proxy.instrumentations.<computed> (reactivity.esm-bundler.js:398)
    // at onClick (channel-edit.vue:16)
    // at callWithErrorHandling (runtime-core.esm-bundler.js:6992)
    // at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:7001)
    // at HTMLDivElement.invoker (runtime-dom.esm-bundler.js:347)
    //     instrumentations.<computed> @ reactivity.esm-bundler.js:398
    //     onClick @ channel-edit.vue:16
    //     callWithErrorHandling @ runtime-core.esm-bundler.js:6992
    //     callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:7001
    //     invoker @ runtime-dom.esm-bundler.js:347

    // 方式三 可以
    // @click="addChannel(channel)" 
    // const addChannel = mychannels.push.bind(mychannels)

    // 方式四 可以
    const addChannel = channel => {
        mychannels.push(channel)
        // 判断是否登录
        if (store.state.user) {
            const body = {
                userId: store.state.user.data.id,
                channel,
            }
            // 请求接口保存操作
            addUserChannels(body).then(res => {
                if (res.data.code !== 0) {
                    Toast.fail(res.data.message)
                }
            })
        } else {
            setItem('TOUTIAO_CHANNELS', mychannels)
        }
    }

    const removeChannel = (channel, index) => {
        if (state.fixedChannels.includes(channel.id)) return
        mychannels.splice(index, 1)
        // 删除频道后，当前激活频道保持不变
        index < active && emit('update:active', --active)
        // 判断是否登录
        if (store.state.user) {
            const body = {
                userId: store.state.user.data.id,
                channel,
            }
            // 请求接口保存操作
            removeUserChannels(body).then(res => {
                if (res.data.code !== 0) {
                    Toast.fail(res.data.message)
                }
            })
        } else {
            setItem('TOUTIAO_CHANNELS', mychannels)
        }
    }

    /**
     * 切换频道
     */
    const shiftChannel = (channel, active) => {
        // 2、事件触发
        emit('update:active', active)
        emit('channel-selected', false)
    }

    const onMyChannelClick = (channel, index) => {
        state.isEdit ? removeChannel(channel, index) : shiftChannel(channel, index)
    }

    return {
        addChannel,
        onMyChannelClick
    }
}
export default {
    props: {
        mychannels: {
            type: Array,
            require: true
        },
        active: {
            type: Number,
            require: true
        }
    },
    emits: ['update:active', 'channel-selected'], // 1、事件声明
    setup(props, { emit }) {
        const state = reactive({
            isEdit: false,
            fixedChannels: [1], // 不可移除的频道
        })
        return {
            ...useChannels(props),
            ...useEditChannel(props, state, emit),
            ...toRefs(state)
        }
    }
}
</script>

<style>
.channel-edit {
    margin-top: 60px;
}
.channel-edit .grid-item {
    background-color: #f0f0f0;
    height: 80px;
    font-size: 16px;
}

.channel-edit .my-channels .van-icon-clear {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%) scale(0.7);
    /* background-color: #f0f0f0; */
    z-index: 2;
}
.channel-edit .grid-item--active {
    color: red;
}
</style>
