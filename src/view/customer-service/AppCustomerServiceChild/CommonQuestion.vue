<template>
    <div class="common_question_wrapper">
        <div v-for="(v, i) in itemList" :key="i" class="cq__item_content">
            <div class="ic__cirle_logo" @click="openQuestion(v)">
                <span :class="'iconfont icon-' + v.icon"></span>
            </div>
            <p class="ic__item_name">{{ v.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'common-question',
    data () {
        return {
            itemList: [
                {
                    icon: 'Menu_Staffregister',
                    name: '如何注册',
                    path: 'howtoregister'
                },
                {
                    icon: 'recharge',
                    name: '如何充值',
                    path: 'howtorecharge'
                },
                {
                    icon: 'withdrawals',
                    name: '如何提款',
                    path: 'howtowithdraw'
                },
                {
                    icon: 'upload-demo',
                    name: '如何下载',
                    path: 'howtodownload'
                },
                {
                    icon: 'gamepad',
                    name: '游戏问题',
                    path: 'gameproblem'
                },
                {
                    icon: 'maintenance',
                    name: '维护时间',
                    path: 'maintenancetime'
                }
            ]
        };
    },
    methods: {
        openQuestion (e) {
            this.$router.push({ name: e.path, params: { title: e.name } });
        }
    }
};
</script>

<style lang="scss" scoped>
    .common_question_wrapper {
        display: flex;
        flex-wrap: wrap;

        .cq__item_content {
            width: 50%;
            margin-bottom: .6rem;
            display: flex;
            align-items: center;
            flex-direction: column;

            .ic__cirle_logo {
                width: 2.8rem;
                height: 2.8rem;
                margin-bottom: .3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #e28722;
                border-radius: 50%;

                > span {
                    color: #fff;
                    font-size: 1rem;
                }
            }

            .ic__item_name {
                color: #fff;
                font-size: .4rem;
            }
        }
    }
</style>
