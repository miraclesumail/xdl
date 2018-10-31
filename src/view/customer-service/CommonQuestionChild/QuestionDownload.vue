<template>
    <div class="question_download_wapper">
        <p class="qd__is_header">新得利国际无需下载任何软件即可直接在网站上登录投注。</p>
        <p>为提供更便利的登录方式，新得利有提供不同平台的游戏客户端，可以在网站首页点击「下载专区」选择需要的软件进行安装，如加载过程中有任何问题，欢迎随时咨询。</p>
        <div class="qd__has_img"><img src="@/assets/faq/download.jpg" /></div>
    </div>
</template>

<script>
export default {
    name: 'QuestionDownload'
};
</script>

<style scoped lang="scss">
    .question_download_wapper {
        padding: 0.3rem 0.2rem 0.5rem;
        font-size: .4rem;

        > p {
            margin-bottom: .25rem;
            color: #fff;
        }

        .qd__is_header {
            color: #ffa200;
            font-size: .45rem;
            font-weight: 700;
        }

        .qd__has_img {
            width: 90%;
            margin: 0 auto .25rem;
            border: 1px solid #ffa200;

            > img {
                width: 100%;
            }
        }
    }
</style>
