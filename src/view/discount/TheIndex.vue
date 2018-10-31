<template>
    <content-wrapper class="" :options="options">
        <common-header>优惠活动</common-header>
        <div class="tab-change">
            <ul class="tab-container">
                <li v-for="(item, index) in gemList" :class="index === active ? 'active' : ''" @click="selectTitle(item.id)" :key="index">{{item.name}}</li>
            </ul>
        </div>
        <scroll-component>
            <div class="discount">
                <div class="list" v-for="(item, index) in gemList[active].list" :key="index">
                    <the-discount-detail :itemData="item"></the-discount-detail>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import TheDiscountDetail from '@/view/discount/children/TheDiscountList.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import {apiRequest} from '@/common/api/base';
export default {
    name: 'the-index',
    data () {
        return {
            gemList: [
                {
                    id: 0,
                    name: '最新优惠',
                    list: []
                },
                {
                    id: 1,
                    name: '电子优惠',
                    list: []
                },
                {
                    id: 2,
                    name: '真人优惠',
                    list: []
                },
                {
                    id: 3,
                    name: '综合优惠',
                    list: []
                },
                {
                    id: 4,
                    name: '已结束',
                    list: []
                }
            ],
            active: 0,
            options: {
                top: 2.7,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        init () {
            apiRequest('getRewardList', {
                service: 'reward',
                data: {}
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'sjyhhd') {
                        val.list.forEach((val, index) => {
                            // console.log(val);
                            this.gemList.forEach((res, index) => {
                                if (val.displayId === res.name) {
                                    res.list.push(val);
                                }
                            });
                        });
                    }
                });

                this.gemList.map(v => {
                    v.list.reverse();
                });
            }).catch((res) => {
                console.log(res);
            });
        },
        selectTitle (id) {
            this.active = id;
        }
    },
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper,
        TheDiscountDetail
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
.tab-change{
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    position: absolute;
    width: 100%;
    left: 0;
    top: 1.5333rem;
    z-index: 10;
    background: #242424;
    .tab-container{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ffa200;
        margin: 0.1rem;
        border-radius: 5px;
        overflow: hidden;
        li{
            font-size: 0.38rem;
            /*width: 25%;*/
            flex: 1;
            text-align: center;
            height: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #ffa200;
            color: #fff;
            cursor: pointer;
            &:last-child{
                border-right: none;
            }
        }
        li.active{
            background-color: #ffa200;
            color: #fff;
        }
    }
}
.discount{
    padding: 0 0.3rem 0.5rem;
    .list {
        font-size: 0;
        margin-top: 0.25rem;
        img{
            width: 100%;
            height: 100%;
        }
        .bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 0.7333rem;
            background-color: rgba(000,000,000, 0.9);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                font-size: 0.4rem;
                color: #fff;
                font-weight: bold;
                padding-left: 0.1rem;
            }
            .right{
                font-size: 0.32rem;
                color: #fff;
                display: flex;
                align-items: center;
                span:nth-child(1) {
                    color: #ffb006;
                    padding-right: 0.3rem;
                }
                span:nth-child(2){
                    background: linear-gradient(to bottom, #f41e1e, #910606);
                    height: 0.6rem;
                    line-height: 0.6rem;
                    width: 1.6rem;
                    text-align: center;
                    margin-right: 0.2rem;
                    border-radius: 5px;
                }
            }
        }
    }
}
    /*ffa200*/
</style>
