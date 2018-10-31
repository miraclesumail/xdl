<template>
    <div class="jewel-details-wrapper">
        <p>什么是得利宝石？</p>
        <p>真钱玩家在获得相关宝石之后，可以当做优惠使用，『输入宝石对应四位数字』或『立即使用』之后可以获得该优惠金额。</p>
        <p>如何查询我的宝石？</p>
        <p>会员可在登入帐号后，查看『站内信息』或是点击首页『得利宝石』图标查看优惠详情。</p>
        <p>如何获得宝石优惠？</p>
        <p>每天由系统随机抽选，只要您持续存款投注游戏，每天都有机会可以获得众多宝石优惠进行使用，千万不要错过了喔。</p>
        <p>得利宝石的有效期是多久？</p>
        <p>每一个宝石都有不同的使用期限，请把握享受优惠时间。</p>
        <p>如何使用宝石优惠？</p>
        <p>查询宝石介绍以及详情之后，完成领取条件，点击立即领取或是『输入宝石对应四位数字』即可获得。</p>
    </div>
</template>

<script>
export default {
    name: 'the-info'
};
</script>

<style scoped lang="scss">
    .jewel-details-wrapper {
        padding: .7rem .5rem;
        color: #e2e2e2;
        font-size: .4rem;

        p:nth-child(odd) {
            margin: .5rem 0;
            color: #fea100;

            &:first-child { margin-top: 0; }
        }
    }
</style>
