<template>
    <content-wrapper class="container" :options="options">
        <common-header>手机客户端下载</common-header>
        <scroll-component>
            <div class="account_download_wrapper">
                <div class="ac__banner_img">
                    <img src="@/assets/download_banner.jpg" />
                </div>
                <div class="ad__download_content">
                    <div class="dc__item_container">
                        <span class="iconfont icon-andriod"></span>
                        <p class="title needsclick">安卓 APP</p>
                        <div class="ic__btn_download" @click="download('android')">
                            <span class="iconfont icon-download1"></span>
                        </div>
                    </div>
                    <div class="dc__item_container">
                        <span class="iconfont icon-apple"></span>
                        <p class="title">苹果 APP</p>
                        <div class="ic__btn_download" @click="download('ios')">
                            <span class="iconfont icon-download1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import tool from '@/common/tool';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
export default {
    name: 'AccountDownload',
    data () {
        return {
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    components: {
        // ToggleButton
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        download (item) {
            let isWebView = tool.webViewEnvironment();
            if (item === 'ios') {
                if (isWebView) {
                    location.href = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
                } else {
                    let ow = window.open('');
                    ow.location = 'https://td99-ios.neweb.me/IOS/xindeli_ios/xindeli_official/download.html';
                }
            } else if (item === 'android') {
                if (isWebView) {
                    location.href = 'http://td99.neweb.me/xindeli_telemarketing/m/xindeli128/xindeli128.apk';
                } else {
                    let ow = window.open('');
                    ow.location = 'http://td99.neweb.me/xindeli_telemarketing/m/xindeli128/xindeli128.apk';
                }
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .account_download_wrapper {
        min-height: 100vh;
        background-image: url('../../../assets/blue-black-bg.png');
        background-size: cover;

        .ac__banner_img {
            > img {
                width: 100%;
                vertical-align: top;
            }
        }

        .ad__download_content {
            margin-top: 4rem;
            display: flex;
            justify-content: space-around;

            .dc__item_container {
                position: relative;
                display: flex;
                align-items: center;
                flex-direction: column;

                > span {
                    position: absolute;
                    font-size: 2.5rem;
                    transform: translateY(-100%);

                    &.icon-andriod {
                        top: -.2rem;
                        color: #aac147;
                    }

                    &.icon-apple {
                        top: -.4rem;
                        color: #a7a9ac;
                    }
                }

                > p {
                    margin-bottom: .25rem;
                    color: #fff;
                    font-size: .4rem;
                }

                .ic__btn_download {
                    width: 1rem;
                    height: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #ff9404;
                    border-radius: 50%;

                    > span {
                        position: relative;
                        top: -.09rem;
                        color: #fff;
                        font-size: .7rem;
                    }
                }
            }
        }
    }
</style>
