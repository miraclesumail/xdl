<template>
    <div class="jewel-wrapper">
        <div v-for="(item, index) in expiredList" :key="index">
            <div class="jewel-cards-wrapper">
                <div class="jewel-cards">
                    <div class="jewel-content-wrapper">
                        <div class="jewel-center-border"></div>
                        <div class="jewel-gem-wrapper">
                            <img :src="_cdnLink + expireJewel[item.img]" />
                            <div class="jc-sticky">
                                <img src="https://xdlftp.xindedom.life/images/mobile_image/jewel-sticky-grey.png" />
                                <p>{{item.title}}</p>
                            </div>
                        </div>

                        <div class="jewel-info-wrapper">
                            <div class="js-i-title"><p>可获得{{item.title}}优惠额度</p></div>
                            <div class="js-i-inline"><p>宝石代码：</p><p>{{item.bonusCode}}</p></div>
                            <div class="js-i-inline"><p>流水要求：</p><p>{{item.validBet}}</p></div>
                            <div class="js-i-inline"><p>指定游戏：</p><p>{{item.groupName ? item.groupName : '无'}}</p></div>
                            <div class="js-i-inline"><p>优惠上限：</p><p>{{item.bonusLimit ? item.bonusLimit : '无'}}</p></div>
                            <div class="js-i-inline"><p>使用条件：</p><p v-html="item.condition"></p></div>
                            <div class="js-i-inline"><p>有效日期：</p><p>{{item.expireTime}}</p></div>
                            <div class="js-btn" @click="apply"><p>已过期</p></div>
                        </div>
                    </div>
                </div>
                <div class="jewel-text" v-if="item.tag">
                    <p>{{item.tag}}</p>
                </div>
            </div>
            <div class="jewel-border" v-if="index !== (expiredList.length -1)"></div>
        </div>
        <p class="tip" v-if="expiredList.length === 0">
            当前无已过期的宝石
        </p>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import {mapState, mapMutations} from 'vuex';
import {jewelExpire} from '../../../common/file_source';
import tool from '@/common/tool';
export default {
    name: 'the-expire',
    props: {
        listData: {
            type: Array
        }
    },
    data () {
        return {
            expiredList: [],
            expireJewel: jewelExpire
        };
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        apply () {
            this.MSGALERT({
                text: '该宝石已过期',
                status: 'error'
            });
        },
        init () {
            apiRequest('getPromoCode', {
                service: 'reward',
                data: {}
            }).then((res) => {
                this.expiredList = res.data.expiredList.filter((val, index, arr) => {
                    if (/\d+%/.test(val.title)) {
                        val.img = 1;
                        val.validBet = val.validBet + '倍';
                    } else if (/无/.test(val.condition)) {
                        val.img = 2;
                        val.validBet = val.validBet + '元';
                    } else {
                        val.img = 0;
                        val.validBet = val.validBet + '元';
                    }
                    val.expireTime = tool.timeFormat(val.expireTime, 'YYYY-MM-DD HH:mm:ss');
                    return val;
                });
                this.expiredList = this.expiredList.reverse();
            });
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .jewel-cards-wrapper {
        margin: .2rem .15rem;
        padding: .15rem .1rem;
        position: relative;
        border: 1px solid #fff;
        border-radius: .2rem;

        .jewel-cards {
            font-size: 0;
            background-image: url('https://xdlftp.xindedom.life/images/mobile_image/jewel-bg-text.jpg');
            background-size: cover;
            border-radius: .2rem;
            border: 1px solid #787878;
            overflow: hidden;

            .jewel-content-wrapper {
                width: 35%;
                position: relative;
                display: inline-block;
                vertical-align: top;
                background-image: url('https://xdlftp.xindedom.life/images/mobile_image/jewel-bg-grey.jpg');
                background-size: cover;

                .jewel-center-border {
                    height: 100%;
                    position: absolute;
                    right: -1px;
                    border-right: 2px dashed #000;
                }

                .jewel-gem-wrapper {
                    width: 100%;
                    position: absolute;
                    top: 50%;

                    -webkit-transform: translateY(-50%);
                    -moz-transform: translateY(-50%);
                    transform: translateY(-50%);

                    img { width: 100%; }

                    .jc-sticky {
                        width: 45%;
                        position: absolute;
                        top: .1rem;
                        right: .1rem;
                        text-align: center;

                        p {
                            width: 100%;
                            position: absolute;
                            top: 45%;
                            left: 50%;
                            color: #fff;
                            font-size: .3rem;
                            font-weight: 700;

                            -webkit-transform: translate(-50%, -50%);
                            -moz-transform: translate(-50%, -50%);
                            transform: translate(-50%, -50%);
                        }
                    }
                }

                .jewel-info-wrapper {
                    width: 175%;
                    padding: .2rem 0;
                    padding-left: .2rem;
                    box-sizing: border-box;

                    -webkit-transform: translateX(57%);
                    -moz-transform: translateX(57%);
                    transform: translateX(57%);

                    .js-i-title {
                        margin-bottom: .1rem;
                        padding-bottom: .1rem;
                        color: #d31515;
                        font-size: .39rem;
                        font-weight: 700;
                        border-bottom: 1px solid #d31515;
                    }

                    .js-i-inline {
                        display: flex;
                        align-items: center;
                        color: #3a1401;
                        > p {
                            font-size: .3466rem;
                            display: inline-block;
                            vertical-align: bottom;
                            &:first-child { width: 35%; }
                            &:last-child { width: 65%; }
                        }
                    }

                    .js-btn {
                        margin: .2rem 0 0 1.9rem;
                        color: #fff;
                        font-size: .34rem;
                        display: inline-block;
                        background: #2f2e2e;
                        background: linear-gradient(#737170, #2f2e2e);
                        border-radius: .1rem;

                        > p { padding: .1rem .4rem; }
                    }
                }
            }
        }

        > .jewel-text {
            width: 1.666rem;
            height: 1.666rem;
            position: absolute;
            top: 0;
            right: 0;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/jewel-good.png') no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            p{
                font-size: 0.366rem;
                color: #fff;
                transform: rotate(45deg) translate(0.55rem, 0.1rem);
            }
        }
    }
    .jewel-border {
        width: 95%;
        margin: .25rem auto;
        border-top: 5px dotted #222222;
    }
    .tip {
        color: #fff;
        text-align: center;
        padding: 0.5rem 0;
        font-size: 0.4rem;
    }
</style>
