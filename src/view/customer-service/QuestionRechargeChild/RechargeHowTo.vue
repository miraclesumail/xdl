<template>
    <div class="question_how_to_wrapper">
        <p class="qht__is_header">微信/支付宝 转账银行卡：</p>
        <p>第一步：获取 微信/支付宝 转账的银行卡信息</p>
        <p>1.登录新得利网站，选择微信/支付宝转银行卡存款</p>
        <div class="qht__has_img"><img src="@/assets/faq/withdraw-guide.jpg" /></div>
        <p>2.提交存款订单，获得支付金额和转账银行卡信息</p>
        <div class="qht__has_img"><img src="@/assets/faq/success-alipay.jpg" /></div>
        <div class="qht__has_img"><img src="@/assets/faq/success-wechat.jpg" /></div>
        <p>第二步：使用 微信/支付宝 APP转账到银行卡（使用步骤请查看【微信教程】【支付宝教程】）</p>
    </div>
</template>

<script>
export default {
    name: 'RechargeHowTo'
};
</script>

<style scoped lang="scss">
    .question_how_to_wrapper {
        font-size: .4rem;

        > p {
            margin-bottom: .25rem;
            color: #fff;
        }

        .qht__is_header {
            color: #ffa200;
            font-size: .45rem;
            font-weight: 700;
        }

        .qht__has_img {
            width: 90%;
            margin: 0 auto .25rem;
            border: 1px solid #ffa200;

            > img {
                width: 100%;
            }
        }
    }
</style>
