<template>
    <van-cell class="article-item">
        <template #title>
            <span class="van-multi-ellipsis--l2">{{ article.title }}</span>
        </template>
        <template #label>
            <van-row v-if="article.imgs.length == 3">
                <van-col span="8" v-for="(img, i) in article.imgs" :key="i">
                    <van-image width="100" height="100" :src="img"></van-image>
                </van-col>
            </van-row>
            <span>{{ article.aut_name }}</span>&nbsp;
            <span>{{ article.comm_count }}</span>&nbsp;
            <span>{{ dayjs().to(dayjs(article.pub_date)) }}</span>
        </template>
        <template #right-icon>
            <van-image
                v-if="article.imgs.length == 1"
                width="100"
                height="100"
                :src="article.imgs[0]"
            ></van-image>
        </template>
    </van-cell>
</template>

<script>
import dayjs from '../../utils/day';
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return {
            dayjs
        }
    }
}
</script>

<style>
</style>
