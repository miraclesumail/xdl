<template>
    <div class="salarycontent">
        <culb-header></culb-header>
        <div class="detail">
            <div class="title">
                <span>爵位</span>
                <span>条件</span>
                <span>俸禄金</span>
            </div>
            <div class="list" :class="index === list.length - 1 ? 'last' : ''" v-for="(item, index) in list" :key="index">
                <span>{{item.name}}</span>
                <span>保级15天以上</span>
                <span>每日{{item.money}}元</span>
            </div>
        </div>
        <p class="tip">
            四星伯爵以上会员，保级15天以上后，可以获得每天50元的俸禄金，俸禄金不需任何流水限制，可以立即提款，每周一派发。
        </p>
    </div>
</template>

<script>
import CulbHeader from '@/view/club/children/CulbHeader.vue';
export default {
    name: 'salary',
    data () {
        return {
            list: [
                {
                    name: '四星伯爵',
                    money: '50'
                },
                {
                    name: '五星侯爵',
                    money: '100'
                },
                {
                    name: '六星公爵',
                    money: '300'
                },
                {
                    name: '新得利王爵',
                    money: '600'
                }
            ]
        };
    },
    components: {
        CulbHeader
    }
};
</script>

<style scoped lang="scss">
    .salarycontent{
        padding: 0.2rem;
    }
    .detail{
        padding-top: 0.5rem;
        .title{
            display: flex;
            align-items: center;
            font-size: 0.4rem;
            color: #000;
            height: 0.666rem;
            background-color: #ca8515;
            border: 1px solid #ca8515;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            span{
                width: 33.33%;
                text-align: center;
                /*font-weight: 600;*/
            }
        }
        .list {
            display: flex;
            align-items: center;
            font-size: 0.4rem;
            color: #fff;
            height: 0.666rem;
            border: 1px solid #fff;
            border-top: none;
            span{
                width: 33.33%;
                text-align: center;
                /*font-weight: 0;*/
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                border-left: 1px solid #fff;
            }
            span:nth-child(1) {
                border-left: none;
            }
        }
        .last {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
        }
    }
    .tip{
        padding-top: 0.4rem;
        padding-bottom: 0.5rem;
        font-size: 0.32rem;
        color: #14970b;
    }
</style>
