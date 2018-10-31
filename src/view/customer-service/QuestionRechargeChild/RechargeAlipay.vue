<template>
    <div class="recharge_alipay_wrapper">
        <div class="ra__header_title">
            <span class="iconfont icon-ziyuan"></span>
            <p>支付宝转账银行卡</p>
        </div>
        <div class="ra__steps_item">
            <div class="si__img"><img src="@/assets/faq/alipay1.png" /></div>
            <p class="si__label">第一步</p>
            <p class="si__desc">打开手机支付宝，点击<span>转账</span></p>
        </div>
        <div class="ra__steps_item">
            <div class="si__img"><img src="@/assets/faq/alipay2.png" /></div>
            <p class="si__label">第二步</p>
            <p class="si__desc">点击<span>转账到银行卡</span></p>
        </div>
        <div class="ra__steps_item">
            <div class="si__img"><img src="@/assets/faq/alipay3.png" /></div>
            <p class="si__label">第三步</p>
            <p class="si__desc">输入您在公司看到的<span>银行卡号</span></p>
        </div>
        <div class="ra__steps_item">
            <div class="si__img"><img src="@/assets/faq/alipay4.png" /></div>
            <p class="si__label">第四步</p>
            <p class="si__desc">备注：填写<span>会员帐号</span>，确认信息<br />点击<span>确认</span>转账即可到账</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RechargeAlipay'
};
</script>

<style scoped lang="scss">
    .recharge_alipay_wrapper {
        color: #fff;
        font-size: .4rem;
        text-align: center;

        > div {
            margin-bottom: .5rem;
        }

        .ra__header_title {
            display: flex;
            align-items: center;
            justify-content: center;

            > * {
                color: #0882db;
                font-size: .55rem;
                line-height: .55rem;
            }

            > p {
                margin-left: .2rem;
                font-weight: 700;
            }
        }

        .ra__steps_item {
            .si__label {
                color: #ffa200;
                font-size: .45rem;
                font-weight: 700;
            }

            .si__desc {
                margin-top: .15rem;

                > span {
                    color: #ffa200;
                }
            }
        }
    }
</style>
