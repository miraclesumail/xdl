<template>
    <div class="question_recharge_wrapper">
        <ul class="qr__list_wrapper">
            <li v-for="v in contentList" :key="v.id" :class="'lw__btn_nav' + (v.id === activeComponent ? ' lw__active' : '')" @click="changeContent(v.id)">
                <p>{{ v.name }}</p>
            </li>
        </ul>
        <component :is="componentList[activeComponent]"></component>
    </div>
</template>

<script>
import RechargeHowTo from './../QuestionRechargeChild/RechargeHowTo';
import RechargeWechat from './../QuestionRechargeChild/RechargeWechat';
import RechargeAlipay from './../QuestionRechargeChild/RechargeAlipay';

export default {
    name: 'QuestionRecharge',
    data () {
        return {
            contentList: [
                {
                    id: 0,
                    name: '如何充值'
                },
                {
                    id: 1,
                    name: '微信教程'
                },
                {
                    id: 2,
                    name: '支付宝教程'
                }
            ],
            componentList: [
                RechargeHowTo,
                RechargeWechat,
                RechargeAlipay
            ],
            activeComponent: 0
        };
    },
    components: {
        RechargeHowTo
    },
    methods: {
        changeContent (id) {
            this.activeComponent = id;
        }
    }
};
</script>

<style scoped lang="scss">
    .question_recharge_wrapper {
        padding: 0.3rem 0.2rem 0.5rem;

        .qr__list_wrapper {
            margin-bottom: .5rem;
            display: flex;
            justify-content: center;
            border: 1px solid #ffa200;
            border-radius: 5px;
            overflow: hidden;

            .lw__btn_nav {
                height: 0.8rem;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                &.lw__active {
                    background-color: #ffa200;

                    > p {
                        color: #000;
                        font-weight: bold;
                    }
                }

                > p {
                    color: #fff;
                    font-size: .4rem;
                    line-height: .4rem;
                }
            }
        }
    }
</style>
