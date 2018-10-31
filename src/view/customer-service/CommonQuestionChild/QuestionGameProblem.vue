<template>
    <div class="question_game_problem_wapper">
        <p class="qgp__is_header">游戏视频不流畅？</p>
        <p>我们推荐您使用火狐、谷歌进行游戏。若觉得真人游戏视频线路不顺畅，是因为玩家的网络到游戏视频伺服器的网络延时太大或者网络丢包严重等原因，您可以在视频区切换不同频道，然后选择合适您的游戏伺服器投注。</p>
        <p class="qgp__is_header">忘记账号密码怎么办？</p>
        <p>会员忘记登入信息时，可联系网站在线客服、QQ客服、电话客服、微信客服，通过客服人员核对会员资料，信息无误后，将会为用户提供正确帐号并重置用户密码。</p>
        <p class="qgp__is_header">等级越高有什么好处</p>
        <p>越高级别的会员可在特定节日或优惠中获取较多的奖励/奖金，提款到帐时间更快速。另拥有专属VIP客服服务。</p>
        <p class="qgp__is_header">是否有第三人可以进入我的账户呢？</p>
        <p>系统是通过密码保护的，手机登入易博app更可使用指纹、手势认证。每位玩家每次进入账户时，或是交易前，都会认证玩家身份。只有会员本人才可以进入账户。温馨提醒您：千万不要向任何人透漏您的用户名或者密码等相关信息。</p>
    </div>
</template>

<script>
export default {
    name: 'QuestionGameProblem'
};
</script>

<style scoped lang="scss">
    .question_game_problem_wapper {
        padding: 0.3rem 0.2rem 0.5rem;
        font-size: .4rem;

        > p {
            margin-bottom: .25rem;
            color: #fff;
        }

        .qgp__is_header {
            color: #ffa200;
            font-size: .45rem;
            font-weight: 700;
        }
    }
</style>
