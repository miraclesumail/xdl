<template>
    <div class="levelcontent">
        <club-header></club-header>
        <div class="discount">
            <div class="discounttitle">
                <span></span>
                <span>优惠特权</span>
                <span></span>
            </div>
            <ul>
                <li v-for="(item, index) in level" :key="index" :class="activeNumber === index? 'active': 'noactive'" @click="lookLevel(index)">
                    <img :src="_cdnLink + item.img" alt="">
                    <span class="text">{{item.name}}</span>
                </li>
            </ul>
            <div class="leveldetail">
                <div class="left">
                    <div class="title">
                        <img :src="level[activeNumber].img" alt="">
                        <span class="text">目前特权</span>
                    </div>
                    <div class="list" v-for="(item, index) in levelDiscount[activeNumber]" :key="index" v-if="activeNumber < 6" v-show="item.money !== levelDiscount[activeNumber+1][index].money">
                        <span v-if="item.money !== levelDiscount[activeNumber+1][index].money">{{item.name}}{{item.money}}</span>
                    </div>
                    <div class="list" v-for="(item, index) in levelDiscount[activeNumber]" :key="index" v-if="activeNumber === 6">
                        <span>{{item.name}}{{item.money}}</span>
                    </div>
                </div>
                <div class="right" v-if="levelDiscount[activeNumber+1]">
                    <div class="title">
                        <img :src="level[activeNumber+1].img" alt="">
                        <span class="text">升级特权</span>
                    </div>
                    <div class="list" v-for="(item, index) in levelDiscount[activeNumber]" :key="index" v-if="item.money !== levelDiscount[activeNumber+1][index].money">
                        <span class="icon"></span>
                        <span v-if="item.money !== levelDiscount[activeNumber+1][index].money">{{levelDiscount[activeNumber+1][index].name}}{{levelDiscount[activeNumber+1][index].money}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {levelImg, levelDiscount} from '@/common/file_source';
// import {getLevel} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapState, mapMutations} from 'vuex';
import ClubHeader from '@/view/club/children/CulbHeader.vue';
export default {
    name: 'level',
    data () {
        return {
            activeNumber: 0,
            level: levelImg,
            levelDiscount: levelDiscount,
            resultList: null
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        lookLevel (index) {
            this.activeNumber = index;
        },
        init () {
            apiRequest('getLevel', {
                service: 'playerLevel',
                data: {}
            }).then((res) => {
                this.activeNumber = res.data.value;
            });
        }
    },
    computed: {
        ...mapState(['levelData', 'userInfo'])
    },
    mounted () {
        // levelDiscount.filter((val, index, arr) => {
        //     console.log(val);
        // });
    },
    components: {
        ClubHeader
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .levelcontent {
        padding: 0.2rem;
        .discount {
            .discounttitle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 0.8rem;
                margin: 0.3rem 0;
                span:nth-child(1) {
                    width: 30%;
                    border-bottom: 1px solid #696969;
                }
                span:nth-child(2) {
                    font-size: 0.4rem;
                    color: #fff;
                }
                span:nth-child(3) {
                    width: 30%;
                    border-bottom: 1px solid #696969;
                }
            }
            ul{
                display: flex;
                align-items: center;
                justify-content: space-between;
                li{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 1.466rem;
                    width: 14.2%;
                    border: 1px solid #1d1d1d;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                    transition: 0.5s all;
                    img{
                        width: 0.8133rem;
                        height: 0.9066rem;
                        margin-bottom: 0.15rem;
                    }
                    .text{
                        font-size: 0.246rem;

                    }
                }
                li.active{
                    background: linear-gradient(to bottom, #ea9400, #874f00, #ac6900);
                    color: #fabe1a;
                }
                li.noactive {
                    background: linear-gradient(to bottom, #111111, #242424);
                    color: #ffffff;
                }
            }
            .leveldetail {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 0.4rem;
                .left {
                    flex: 1;
                    overflow: hidden;
                    border: 1px solid #9e9e9e;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border-bottom: none;
                    .title{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 0.8933rem;
                        background-color: rgba(125,82,8,0.5);
                        img{
                            width: 0.5733rem;
                            height: 0.6266rem;
                        }
                        .text {
                            font-size: 0.4rem;
                            font-weight: bold;
                            color: #fff;
                            padding-left: 0.1rem;
                        }

                    }
                    .list {
                        background: rgba(74,46,7,0.5);
                        height: 0.866rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        font-size: 0.4rem;
                        border-bottom: 1px solid #6d5738;
                        text-align: center;
                        padding-top: 0.2rem;
                        padding-bottom: 0.2rem;
                    }
                }
                .right {
                    flex: 1;
                    overflow: hidden;
                    border: 1px solid #38454a;
                    border-left: none;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border-bottom: none;
                    .title{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 0.8933rem;
                        background-color: #01222e;
                        img{
                            width: 0.5733rem;
                            height: 0.6266rem;
                        }
                        .text {
                            font-size: 0.4rem;
                            font-weight: bold;
                            color: #00bbff;
                            padding-left: 0.1rem;
                        }
                    }
                    .list {
                        background: rgba(8,25,31,1);
                        height: 0.866rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #00bbff;
                        font-size: 0.4rem;
                        border-bottom: 1px solid #38454a;
                        padding-left: 0.1rem;
                        padding-top: 0.2rem;
                        padding-bottom: 0.2rem;
                        text-align: center;
                        /*padding: 0.2rem;*/
                        .icon{
                            width: 0.2666rem;
                            height: 0.2666rem;
                            background: url('https://xdlftp.xindedom.life/images/mobile_image/updataicon-blue.png') no-repeat;
                            background-size: 100% 100%;
                            margin-right: 0.1rem;
                        }
                    }
                }
            }
        }
    }
</style>
