<template>
    <div class="list">
        <van-pull-refresh
            v-model="state.isRefreshing"
            @refresh="refresh"
            :success-text="state.refreshTip"
            success-duration="1000"
        >
            <van-list
                v-model:loading="state.loading"
                :finished="state.finished"
                v-model:error="state.error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="loadArticles"
            >
                <article-item v-for="item in state.list" :key="item.id" :article="item"></article-item>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { getArticles } from '../../../api/articles';
import ArticleItem from '../../../components/article-item/index.vue';
// 未复用组件放在对应.vue 的目录下的components文件夹下
function useRefresh(state, props) {
    const refresh = async () => {
        try {
            // 模拟出错
            if (Math.random() > 0.65) JSON.parse('')
            // 1 请求
            const params = {
                channel_id: props.channel.id,
                pageNumber: 1,
                refresh: true
            }
            const { data } = await getArticles(params)
            // 2 填充数据
            state.list.unshift(...data.list)
            // 3 加载状态结束
            state.isRefreshing = false
            state.refreshTip = `刷新成功，更新${data.list.length}条数据`
        } catch (error) {
            state.isRefreshing = false
            state.refreshTip = '刷新失败'
        }
    }
    return {
        refresh
    }
}

function useArticles(props) {
    const state = reactive({
        list: [],
        error: false,
        loading: false,
        finished: false,
        pageNumber: 1,
        refreshTip: '刷新成功',
        isRefreshing: false,
    })
    const loadArticles = async () => {
        try {
            // 模拟出错
            if (Math.random() > 0.65) JSON.parse('')

            // 1 请求
            const params = {
                channel_id: props.channel.id,
                pageNumber: state.pageNumber,
            }
            const { data } = await getArticles(params)
            // 2 填充数据
            state.list.push(...data.list)
            // 3 加载状态结束
            state.loading = false
            // 4 判断加载完毕
            if (data.list.length > 0) {
                state.pageNumber = data.p_num // p_num 下一页的页码值
            } else {
                state.finished = true
            }
        } catch (error) {
            state.error = true
            state.loading = false
        }
    }
    return {
        state,
        loadArticles
    }
}

export default {
    components: {
        ArticleItem
    },
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { state, loadArticles } = useArticles(props)

        return {
            state,
            loadArticles,
            ...useRefresh(state, props)
        };
    },
}
</script>

<style scoped>
.list {
    margin-bottom: var(--van-tabbar-height);
    /* 把几个栏目滚动相互间的影响消除掉，各自设置一个滚动容器，而不是滚动公共的body */
    height: calc(
        100vh - var(--van-nav-bar-height) - var(--van-tabs-line-height) -
            var(--van-tabbar-height)
    );
    overflow-y: auto;
}
</style>
