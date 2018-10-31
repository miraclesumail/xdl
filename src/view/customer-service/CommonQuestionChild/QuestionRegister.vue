<template>
    <div class="question_register_wapper">
        <p class="qr__is_header">目前我们有两种开户方式：</p>
        <p>一、在线开户：可直接于网站首页请点击"我要开户"，详细输入注册信息，获取手机验证码后，按照流程操作即可注册成为新得利国际会员。（详细步骤可参考在线开户帮助页面）。</p>
        <div class="qr__has_img"><img src="@/assets/faq/register.jpg" /></div>
        <p>二、客服协助开户：联系在线客服、QQ客服或是拨打400客服热线后，提供您的开户信息，客服人员即可在3分钟内为您手工开通游戏账号。</p>
    </div>
</template>

<script>
export default {
    name: 'QuestionRegister'
};
</script>

<style scoped lang="scss">
    .question_register_wapper {
        padding: 0.3rem 0.2rem 0.5rem;
        font-size: .4rem;

        > p {
            margin-bottom: .25rem;
            color: #fff;
        }

        .qr__is_header {
            color: #ffa200;
            font-size: .45rem;
            font-weight: 700;
        }

        .qr__has_img {
            width: 90%;
            margin: 0 auto .25rem;
            border: 1px solid #ffa200;

            > img {
                width: 100%;
            }
        }
    }
</style>
