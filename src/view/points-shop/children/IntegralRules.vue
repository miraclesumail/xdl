<template>
    <div class="integral-rules-wrapper">
        <div class="rules-header">
            <span class="points-sprite i-colored-border"></span>
            <p>积分规则</p>
            <span class="points-sprite i-colored-border rotate-me"></span>
        </div>
        <div class="rules-body">
            <ol class="rules-wrapper">
                <li>
                    <p>玩家通过登录、存款、游戏均可获得积分。</p>
                </li>
                <li>
                    <p>积分任务会发布在积分商城，完成即可领取积分。</p>
                </li>
                <li>
                    <p>日任务的时间周期为每天0点到隔天0点。</p>
                </li>
                <li>
                    <p>周任务的时间周期为每周一0点到次周一0点</p>
                </li>
                <li>
                    <p>签到积分若是当日客户没有自助进行签到，隔日则无法进行补签。</p>
                </li>
                <li>
                    <p>当完成任务后即可一键领取该条件可获得积分。</p>
                </li>
                <li>
                    <p>积分兑换现金礼包根据不同等级有不同兑换比例，只需要完成优惠金额的5倍即可出款。</p>
                    <ul>
                        <li>爵士：15:1</li>
                        <li>男爵：15:1</li>
                        <li>子爵：12:1</li>
                        <li>伯爵：10:1</li>
                        <li>侯爵：10:1</li>
                        <li>公爵：10:1</li>
                        <li>王爵：8:1</li>
                        <li>举例：假如玩家是爵士等级，则积分兑换真钱比例为：15积分兑换1真钱。</li>
                    </ul>
                </li>
                <li>
                    <p>兑换真实礼品的积分为全网站会员享受一致的兑换比例。</p>
                </li>
                <li>
                    <p>兑换真实礼品后，请确认网站绑定联系电话可以与您进行联系，或是主动联系客服人员登记收货地址。</p>
                </li>
                <li>
                    <p>有任何想要兑换的礼品也可以跟客服人员进行反馈，网站将会每月更新全新礼品，敬请期待唷。</p>
                </li>
                <li>
                    <p>积分到期日为2019年1月1日 0点，到期后未兑换的积分系统将会自动扣除，请留意积分累积时间唷～</p>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: 'integral-rules'
};
</script>

<style scoped lang="scss">
    .i-colored-border {
        width: 5.506rem;
        height: .173rem;
        background-position: 0 -.92rem;
    }

    .integral-rules-wrapper {
        .rules-header {
            padding: .466rem 0;
            display: flex;
            align-items: center;
            flex-direction: column;

            > p {
                color: #fff;
                font-size: .6rem;
            }

            .rotate-me {
                transform: rotateX(180deg)
            }
        }

        .rules-body {
            color: #fff;
            font-size: .346rem;
            display: flex;
            align-items: center;
            flex-direction: column;

            .rules-wrapper {
                padding: 0 .3rem 0 .7rem;

                > li {
                    margin-bottom: .2rem;
                    list-style: decimal;
                }
            }
        }
    }
</style>
