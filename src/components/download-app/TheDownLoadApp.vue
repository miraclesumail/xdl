<template>
    <transition name="downloadapp">
        <div class="download" v-if="isDownLoad">
            <div class="app-logo">
                <img src="@/assets/app-logo.png" alt="">
            </div>
            <div class="app-text">
                <p class="title">新得利APP</p>
                <p class="text">简单下载 轻松游戏</p>
            </div>
            <div class="app-btn" @click="download">
                立即下载
            </div>
            <div class="app-close iconfont icon-msnui-close" @click="close"></div>
        </div>
    </transition>
</template>

<script>
import tool from '@/common/tool';
import {mapMutations, mapState} from 'vuex';
export default {
    name: 'the-down-load-app',
    data () {
        return {
            // isShow: true
            isWebView: null
        };
    },
    computed: {
        ...mapState(['isDownLoad'])
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        close () {
            this.STATEMENT({
                name: 'isDownLoad',
                data: false
            });
            tool.setSessionStore('downloadapp', true);
        },
        init () {
            this.isWebView = tool.webViewEnvironment();
            // console.log(this.isWebView);
            if (tool.getSessionStore('downloadapp') === null && this.isWebView === false) {
                this.STATEMENT({
                    name: 'isDownLoad',
                    data: true
                });
            } else {
                this.STATEMENT({
                    name: 'isDownLoad',
                    data: false
                });
            }
        },
        download () {
            let isWebView = tool.webViewEnvironment();
            if (isWebView) {
                location.href = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
            } else {
                let ow = window.open('');
                ow.location = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
            }
        }
    },
    mounted () {},
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
.download{
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    background-color: #fff;
    height: 1.7rem;
    padding: 0 5%;
    z-index: 30;
    top: 0;
    left: 0;
    right: 0;
    .app-logo {
        width: 1.4rem;
        height: 1.4rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .app-text {
        .title{
            font-size: 0.6rem;
            font-weight: bold;
            text-align: center;
            background: linear-gradient(to bottom, #cc8001, #fbc902, #cc7f01);
            -webkit-background-clip: text;
            color: transparent;
        }
        .text{
            font-size: 0.3466rem;
            text-align: center;
        }
    }
    .app-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: linear-gradient(to bottom, #fdd74e, #f1b43b, #e38b23);
        height: 1.2rem;
        line-height: 1.2rem;
        width: 2.8rem;
        font-weight: bold;
        border-radius: 6px;
        font-size: 0.466rem;
        box-shadow:inset -3px -3px 5px #714310;
        margin-right: 0.4rem;
    }
    .app-close {
        position: absolute;
        right: 0.1rem;
        top: 35%;
        /*transform: translate3d(0, -49%, 0);*/
        font-size: 0.6rem;
        width: 0.6rem;
        height: 0.6rem;
        color: #fff;
        background-color: #333;
        border-radius: 50%;
    }
}
.downloadapp-enter{
    transform: translate3d(0, -1.7rem, 0);
}
.downloadapp-enter-to{
    transform: translate3d(0, 0, 0);
}
.downloadapp-enter-active, .downloadapp-leave-active{
    transition: 1s all ease;
}
.downloadapp-leave{
    transform: translate3d(0, 0, 0);
}
.downloadapp-leave-to{
    transform: translate3d(0, -1.7rem, 0);
}
</style>
