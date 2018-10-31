<template>
    <div class="load">
        <div class="load_cover" v-if="msgLoad"></div>
        <div class="load_container" v-if="msgLoad">
            <i class="iconfont icon-loading"></i>
            <p class="load_title">拼命加载中</p>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'loading',
    data () {
        return {};
    },
    methods: {},
    computed: {
        ...mapState(['msgLoad'])
    }
};
</script>

<style scoped lang="scss">
    .load {
        .load_cover {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(000, 000, 000, 0.7);
            z-index: 50;
        }
        .load_container {
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 55;
            text-align: center;
            transform: translate(-50%, -50%);
            .icon-loading {
                font-size: 1rem;
                color: #ffffff;
                /*animation: loadRotate 2s linear infinite both;*/
                animation: loading-rotate 1.5s linear infinite both;
                display: block;
                /*width: 1rem;*/
                /*height: 1rem;*/
                /*line-height: 1rem;*/
                /*margin: 0 auto;*/
            }
            .load_title {
                color: #ffffff;
                font-size: 0.4rem;
            }
        }
    }

    @keyframes loading-rotate {
        0% {
            transform: rotate(0deg);
            /*transform-origin: 50% 50%;*/
        }
        100% {
            transform: rotate(360deg);
            /*transform-origin: 50% 50%;*/
        }
    }
</style>
