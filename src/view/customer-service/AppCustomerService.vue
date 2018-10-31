<template>
    <content-wrapper class="cs" :options="options">
        <!--<scroll-component>-->
        <div class="cs-bg">
            <div class="tab-change">
                <ul class="tab-container">
                    <li v-for="(item, index) in changeTab" :class="index === active ? 'active' : ''" @click="selectTitle(item.id)" :key="index">{{item.name}}</li>
                </ul>
            </div>
            <div class="list">
                <component :is="componentList[active]"></component>
            </div>
        </div>
        <!--</scroll-component>-->
    </content-wrapper>
</template>
<script>
import {mapMutations} from 'vuex';
import ContentWrapper from '@/components/scroll-component/ContentWrapper.vue';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import CsList from './AppCustomerServiceChild/CsList';
import CommonQuestion from './AppCustomerServiceChild/CommonQuestion';
export default {
    name: 'app-customer-service',
    data () {
        return {
            active: 0,
            changeTab: [
                {
                    id: 0,
                    list: [],
                    name: '联系客服'
                },
                {
                    id: 1,
                    list: [],
                    name: '常见问题'
                }
            ],
            options: {
                top: 1.703,
                bottom: 0
            },
            componentList: ['CsList', 'CommonQuestion']
            // isShow: true
        };
    },
    components: {
        ContentWrapper,
        ScrollComponent,
        CsList,
        CommonQuestion
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        selectTitle (id) {
            // if (id === 1) {
            //     this.MSGALERT({
            //         text: '即将上线',
            //         status: 'success'
            //     });
            //     return false;
            // }
            this.active = id;
        }
    }
};
</script>

<style scoped lang="scss">
.cs-bg{
    background: url("../../assets/blue-black-bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0;
    height: 100%;
}
.tab-change{
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    /*position: absolute;*/
    width: 100%;
    /*left: 0;*/
    /*top: 1.703rem;*/
    z-index: 10;
    /*background: #242424;*/
    display: flex;
    align-items: center;
    justify-content: center;
    .tab-container{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ffa200;
        margin: 0.1rem;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        li{
            font-size: 0.38rem;
            flex: 1;
            text-align: center;
            height: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #ffa200;
            color: #fff;
            cursor: pointer;
            /*padding: 0 0.5rem;*/
            &:last-child{
                border-right: none;
            }
        }
        li.active{
            background-color: #ffa200;
            color: #000;
            font-weight: bold;
        }
    }
}
.list{
    /*background: url("../../assets/cs-bg.png") no-repeat;*/
    /*background-size: 100% 100%;*/
    /*font-size: 0;*/
    /*height: 120%;*/
}
/*$images: '../../assets';
.cs{
    .cover {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(000,000,000,0.7);
        z-index: 20;
    }
    .container {
        .listitem{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1.7333rem;
            !*top: 0;*!
            display: flex;
            align-items: center;
            justify-content: space-around;
            z-index: 31;
            height: 3.4666rem;
            background-color: #000;
            padding:0 0.9rem;
            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .icon{
                    width: 2.24rem;
                    height: 2.3066rem;
                    margin-bottom: 0.2rem;
                }
                .text {
                    font-size: 0.4rem;
                    color: #fff;
                }
                .wechat{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/wechat_cs.png') no-repeat;
                    background-size: 100% 100%;
                }
                .onlinecs{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/online_cs.png') no-repeat;
                    background-size: 100% 100%;
                }
                .phone{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/call_phone_cs.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .qr-code {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: 6.4rem;
        z-index: 35;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            width: 4rem;
            height: 4rem;
        }
        p{
            font-size: 0.4rem;
            color: #fff;
            margin-top: 0.1rem;
        }
        button{
            outline: none;
            background: linear-gradient(to bottom, #ed7b00, #c82a00);
            width: 4rem;
            height: 1rem;
            color: #fff;
            !*padding: 0.4rem 0;*!
            !*margin: 0 auto;*!
            text-align: center;
            font-size: 0.4rem;
            border: none;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.2rem;
        }
        span{
            position: absolute;
            right: -0.5rem;
            top: -0.5rem;
            color: #fff;
            font-size: 0.8rem;
        }
    }
}*/
</style>
