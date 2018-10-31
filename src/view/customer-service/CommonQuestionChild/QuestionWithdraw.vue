<template>
    <div class="question_withdraw_wapper">
        <p class="qw__is_header">首次提款时，需绑定提款银行资料。</p>
        <p>当账户额度完成所需流水才可进行提款。</p>
        <p>提款最低限额100元，单笔上限20万元，单日上限100万元。</p>
        <p>新得利国际提供了最方便、快捷、简单的提款方式，无需支付任何手续费用，且7*24小时不间段服务，可以随时申请提款。</p>
        <div class="qw__has_img"><img src="@/assets/faq/withdraw.jpg" /></div>
    </div>
</template>

<script>
export default {
    name: 'QuestionWithdraw'
};
</script>

<style scoped lang="scss">
    .question_withdraw_wapper {
        padding: 0.3rem 0.2rem 0.5rem;
        font-size: .4rem;

        > p {
            margin-bottom: .25rem;
            color: #fff;
        }

        .qw__is_header {
            color: #ffa200;
            font-size: .45rem;
            font-weight: 700;
        }

        .qw__has_img {
            width: 90%;
            margin: 0 auto .25rem;
            border: 1px solid #ffa200;

            > img {
                width: 100%;
            }
        }
    }
</style>
