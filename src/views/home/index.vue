<template>
    <div class="box">
        <van-nav-bar class="page-nav-bar" fixed>
            <template #right>
                <van-button type="info" size="small" round icon="search" class="search-button">搜索</van-button>
            </template>
        </van-nav-bar>
        <van-tabs v-model:active="active" class="tabs">
            <van-tab
                v-for="channel in channels"
                :title="channel.name"
                :key="channel.id"
            >
                <article-list class="list" :channel="channel"></article-list>
            </van-tab>

            <template #nav-right>
                <i style="width: 46px;height: 33px;flex-shrink: 0;"></i>
                <van-icon @click="showChannelsEdit = true" name="wap-nav" style="position: fixed; right: 0"></van-icon>
            </template>
        </van-tabs>
        <van-popup v-model:show="showChannelsEdit" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
            <!-- 3、事件监听   @channel-selected 、 @update:active => :active.sync（Vue2写法） => v-model:active（Vue3写法） -->
            <channel-edit :mychannels="channels" @channel-selected="channelSelected" v-model:active="active"></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { getUserChannels } from '../../api/user';
import ArticleList from './components/article-list.vue';
import ChannelEdit from './components/channel-edit.vue';
import { useStore } from 'vuex';
import { getItem } from '../../utils/storage';
function useChannels(tabs) {
    const state = reactive({
        channels: [],
        showChannelsEdit: false
    })
    const store = useStore()
    const getChannels = async () => {
        // 登录 请求用户数据
        if (store.state.user) {
            const { data } = await getUserChannels(store.state.user.data.id)
            state.channels = data
        } 
        // 未登录
        else {
            // 问题：此处未登录时从缓存获取可能会出现van-tabs 底部线条位置错误bug
            // 修复
            // 方式 1 ： const localChannels =  getItem('TOUTIAO_CHANNELS')  // 横条最开始有一小段移动效果
            // 方式 2 ： <van-tabs v-if="channels.length"> // 横条最开始无移动效果
            // 方式 3 ：  setTimeout(() => { state.channels = localChannels }, 0); // 横条最开始有一小段移动效果

            const localChannels = await getItem('TOUTIAO_CHANNELS')
            // 本地有数据
            if (localChannels) {
                state.channels = localChannels
            }
            // 本地无数据，请求默认数据
            else {
                const { data } = await getUserChannels()
                state.channels = data
            }
        }
    }
    onMounted(() => {
        getChannels()
    })
    return {
        state
    }
}
function useChannelSelected(state) {
    const channelSelected = (channel, index) => {
        state.showChannelsEdit = false
    }
    return {
        channelSelected
    }
}
export default {
    components: {
        ArticleList,
        ChannelEdit,
    },
    setup() {
        const active = ref(0);
        const { state } = useChannels();
        return { active, ...toRefs(state), ...useChannelSelected(state) };
    },
};
</script>

<style>
.search-button {
    width: 300px;
    height: 30px;
    background-color: #5babfb;
    border: none;
    font-size: 18;
    color: #fff;
}
.tabs .van-tabs__wrap {
    position: fixed;
    top: var(--van-nav-bar-height);
    left: 0;
    right: 0;
    overflow-x: auto;
    z-index: 1;
}
.tabs .van-tab {
    min-width: 120px;
}
.tabs .list {
    margin-top: calc(var(--van-tabs-line-height) + var(--van-nav-bar-height));
}
</style>