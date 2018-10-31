<template>
    <content-wrapper class="account" :options="options">
        <scroll-component>
            <div class="title">
                <span class="icon"></span>
                <p class="text">
                    <span>账户</span>
                    <span>USER ACCOUNT</span>
                </p>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in accountList" :key="index" @click="goto(item.id, item.title, item)">
                        <div class="left">
                            <span :class="'icon iconfont icon-' + accountClassList[index]"></span>
                            <span class="text">{{item.title}}</span>
                        </div>
                        <div class="right">
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import tool from '@/common/tool';
import {mapState, mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
export default {
    name: 'the-index',
    data () {
        return {
            accountList: [
                {
                    id: 1,
                    title: '账户资料',
                    path: 'accountinfo'
                },
                {
                    id: 2,
                    title: '游戏转账',
                    path: 'accounttransfer'
                },
                {
                    id: 3,
                    title: '记录搜索',
                    path: 'accountsearch'
                },
                {
                    id: 4,
                    title: '修改密码',
                    path: 'accountpassword'
                },
                {
                    id: 5,
                    title: '设置短信通知',
                    path: 'accountnotice'
                },
                {
                    id: 6,
                    title: '提前结算洗码',
                    path: 'accountwash'
                },
                {
                    id: 7,
                    title: '存款订单',
                    path: 'accountdeposit'
                },
                {
                    id: 8,
                    title: '手机客户端下载',
                    path: 'accountdownload'
                }
            ],
            accountClassList: ['people', 'lendmoney', 'time', 'lock', 'notice', 'youhui', 'wallet', 'download'],
            options: {
                top: 1.7066,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        goto (id, title, item) {
            if (item.url) {
                window.open(item.url);
                return false;
            }
            this._clickCount('账户', title);
            this.$router.push({name: item.path, params: {title: title}});
            this.STATEMENT({
                name: 'accountTitle',
                data: title
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        ScrollComponent,
        ContentWrapper
    },
    created () {}
};
</script>

<style scoped lang="scss">
    $images: '../../assets';
    .account {
        .title {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.04rem;
            background:linear-gradient(to bottom, #272727, #111111);
            .icon {
                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/account-icon.png') no-repeat;
                background-size: 100% 100%;
                width: 0.6266rem;
                height: 0.733rem;
            }
            .text{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #fff;
                padding-left: 0.2rem;
                span:nth-child(1) {
                    font-size: 0.4rem;
                    font-weight: 600;
                }
                span:nth-child(2) {
                    font-size: 0.16rem;
                    padding-top: 0.1rem;
                }
            }
        }
        .list {
            ul{
                padding: 0 0.2rem 0.2rem;
                li{
                    display: flex;
                    align-items: center;
                    background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/header-bg.png') repeat-x;
                    background-size: 0.5866rem 1.066rem;
                    height: 1.066rem;
                    border: 1px solid #fff;
                    border-radius: 4px;
                    margin-top: 0.3rem;
                    justify-content: space-between;
                    .left{
                        display: flex;
                        align-items: center;
                        padding: 0 0.2666rem;
                        .icon {
                            color: #fff;
                            font-size:0.5rem;
                            // background: url(#{$images}/account-list.png) no-repeat;
                            // background-size:3.28rem 0.54666rem;
                            // background-position: 0 0;
                            // width:0.55rem;
                            // height:0.5466rem;
                        }
                        // .info {
                        //     background-position: 0 0;
                        // }
                        // .transfer {
                        //     background-position: -0.6rem 0;
                        // }
                        // .search {
                        //     background-position: -1.18666rem 0;
                        // }
                        // .edit{
                        //     width:0.4rem;
                        //     margin-left: 0.05rem;
                        //     margin-right: 0.1rem;
                        //     background-position: -1.74666rem 0;
                        // }
                        // .notice {
                        //     background-position: -2.16rem 0;
                        // }
                        // .washcode {
                        //     background-position: -2.72rem 0;
                        // }
                        // .depositorder {
                        //     background: url(#{$images}/deposit/wallet.png) no-repeat;
                        //     background-position: 0 0;
                        //     width:0.56rem;
                        //     height:0.56rem;
                        //     background-size: 100% 100%;
                        // }
                        .text {
                            font-size:0.4rem;
                            color: #fff;
                            font-weight: 600;
                            padding-left: 0.2rem;
                        }
                    }
                    .right {
                        margin-right: 0.2rem;
                        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/left-arrow.png') no-repeat;
                        height:0.48rem;
                        width: 0.3066rem;
                        background-size: 100% 100%;
                        transform: rotate(180deg);
                        display: inline-block;
                        vertical-align:center;
                    }
                }
            }
        }
    }
</style>
