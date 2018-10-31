<template>
    <div class="recharge_wechat_wrapper">
        <div class="rw__header_title">
            <span class="iconfont icon-wechat-pay"></span>
            <p>微信转账到银行卡</p>
        </div>
        <div class="rw__steps_item">
            <div class="si__img"><img src="@/assets/faq/wechat1.png" /></div>
            <p class="si__label">第一步</p>
            <p class="si__desc">打开手机微信，点击右上角<span>+号，</span><br />再点击<span>收付款</span></p>
        </div>
        <div class="rw__steps_item">
            <div class="si__img"><img src="@/assets/faq/wechat2.png" /></div>
            <p class="si__label">第二步</p>
            <p class="si__desc">点击<span>转账到银行卡</span></p>
        </div>
        <div class="rw__steps_item">
            <div class="si__img"><img src="@/assets/faq/wechat3.png" /></div>
            <p class="si__label">第三步</p>
            <p class="si__desc">输入您在公司看到的<br /><span>银行卡信息</span>，点击<span>下一步</span></p>
        </div>
        <div class="rw__steps_item">
            <div class="si__img"><img src="@/assets/faq/wechat4.png" /></div>
            <p class="si__label">第四步</p>
            <p class="si__desc">输入您的<span>转账金额</span>，点击<span>转账</span></p>
        </div>
        <div class="rw__steps_item">
            <div class="si__img"><img src="@/assets/faq/wechat5.png" /></div>
            <p class="si__label">第五步</p>
            <p class="si__desc">付款成功，等待到账，点击<span>完成</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RechargeWechat'
};
</script>

<style scoped lang="scss">
    .recharge_wechat_wrapper {
        color: #fff;
        font-size: .4rem;
        text-align: center;

        > div {
            margin-bottom: .5rem;
        }

        .rw__header_title {
            display: flex;
            align-items: center;
            justify-content: center;

            > * {
                color: #35c75a;
                font-size: .55rem;
                line-height: .55rem;
            }

            > p {
                margin-left: .2rem;
                font-weight: 700;
            }
        }

        .rw__steps_item {
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
