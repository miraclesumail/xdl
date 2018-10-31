<template>
    <div class="earn-task-wrapper">
        <div class="img-text-wrapper">
            <p>{{ taskData.contentTtitle }}</p>
            <p v-if="taskData.goal > 1 ? taskData.goal : ''">累计天数：{{ taskData.goal}}天</p>
            <p v-if="taskData.manualTopupType || taskData.onlineTopupType">存款方式：{{depositManualTopupType(taskData.manualTopupType)}}{{depositOnlineTopupType(taskData.onlineTopupType)}}</p>
            <p v-if="taskData.device !== '全选'">平台：{{taskData.device}}</p>
        </div>
        <div class="task-info-wrapper">
            <div class="info-text">
                <p>积分：</p>
                <p> + {{ taskData.points }}</p>
            </div>
            <div class="info-text">
                <p>进度：</p>
                <p>{{taskData.progress.reach}}/{{taskData.progress.target}}</p>
            </div>
            <div class="info-text">
                <p v-if="taskData.periodTitle">周期：</p>
                <p v-if="taskData.periodTitle">{{ taskData.periodTitle }}</p>
                <!--<span class="progress-bar" :style="'width:' + progressPercent + '%'"></span>-->
                <!--<p class="progress-text">{{ progressPercent }}%</p>-->
            </div>
        </div>
        <div class="btn-wrapper">
            <div v-if="taskData.status === 0 || taskData.status === 1" class="btn-earn-points" @click="earnThisPoint(taskData.eventId)">
                <div class="btn-text-wrapper">
                    <p>{{taskData.status === 0 ? '待完成' : '领取'}}</p>
                    <!--<span></span>-->
                </div>
            </div>
            <div v-if="taskData.status === 2" class="btn-earned points-sprite i-border">
                <p>已赚</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'earn-task',
    data () {
        return {
            taskDataList: this.taskData
        };
    },
    props: {
        taskData: {
            /*
            ** active is jugement can be sign in, title is name, eventId is params to backEnd, status is sign in status,
            ** progress is progress bar.
            ** paramsList === >
            ** goal: number
            ** periodTitle: string
            ** active: Boolean
            ** title: String/Html
            ** eventId: Number
            ** points: String
            ** progress: Object {
            **     reach: String/Integer
            **     target: String/Integer
            ** }
            ** status: Number
            */
            type: Object,
            required: true
        }
    },
    computed: {
        progressPercent () {
            return ((parseInt(this.taskData.progress.reach) / parseInt(this.taskData.progress.target)) * 100).toFixed(2);
        }
    },
    methods: {
        earnThisPoint (id) {
            this.$emit('btnClick', id);
        },
        depositManualTopupType (id) {
            switch (id) {
            case 1:
                return '网银转账';
            case 2:
                return 'ATM';
            case 3:
                return '柜台存款';
            case 4:
                return '支付宝转账';
            case 5:
                return '微信转账';
            case 6:
                return '云闪付转账';
            }
        },
        depositOnlineTopupType (id) {
            switch (id) {
            case 1:
                return '网银支付';
            case 2:
                return '微信二维码支付';
            case 3:
                return '支付宝二维码支付';
            case 4:
                return '微信App支付';
            case 5:
                return '支付宝App支付';
            case 6:
                return '网银快捷支付';
            case 7:
                return 'qq扫码支付';
            case 8:
                return '银联扫码支付';
            case 9:
                return '京东钱包扫码支付';
            case 10:
                return '微信wap';
            case 11:
                return '支付宝';
            case 12:
                return 'QQWAP';
            case 14:
                return '京东wap';
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .i-border {
        width: 1.986rem;
        height: .76rem;
        background-position: -4.786rem 0;
    }

    .earn-task-wrapper {
        width: 8.506rem;
        height: 2.026rem;
        display: flex;
        background: linear-gradient(#171717, #252525, #010001);

        .img-text-wrapper {
            width: 3.226rem;
            height: 2.026rem;
            padding: 0 .066rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-image: url('https://xdlftp.xindedom.life/images/mobile_image/points/task-img.jpg?v=201807041101');
            background-size: cover;
            background-position: center center;

            > p {
                color: #fff;
                font-size: .3466rem;
                line-height: .533rem;
                text-align: center;
            }
        }

        .task-info-wrapper {
            margin: 0 .24rem;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .info-text {
                width: 2.533rem;
                padding: .146rem 0;
                font-size: .32rem;
                line-height: .32rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #686868;
                &:first-child {
                    p:nth-child(2) {
                        color: #ff383c;
                        font-weight: bold;
                    }
                }
            }

            .progress-wrapper {
                width: 2.533rem;
                height: .413rem;
                margin-top: .12rem;
                position: relative;
                /*border: 1px solid #fff;*/
                /*border-radius: .066rem;*/
                box-sizing: border-box;
                font-size: 0.3466rem;

                .progress-bar {
                    height: 100%;
                    display: block;
                    background-color: #f20000;
                }

                .progress-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    color: #fff;
                    font-size: .24rem;
                    line-height: .24rem;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .btn-wrapper {
            display: flex;
            align-items: center;

            .btn-earn-points {
                width: 1.933rem;
                height: .786rem;
                background-color: #a65402;
                border-radius: .133rem;
                overflow: hidden;

                .btn-text-wrapper {
                    width: 100%;
                    height: .72rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(#ffd33e, #ff7f01);
                    border-radius: .133rem;

                    > p {
                        margin-right: .133rem;
                        color: #fff;
                        font-size: .373rem;
                        line-height: .373rem;
                    }

                    > span {
                        width: 0;
                        height: 0;
                        border-top: .146rem solid transparent;
                        border-left: .186rem solid #fff;
                        border-bottom: .146rem solid transparent;
                    }
                }
            }

            .btn-earned {
                display: flex;
                align-items: center;
                justify-content: center;
                transform-origin: center center;
                transform: rotate(-15deg);

                > p {
                    color: #ff5b5b;
                    font-size: .4rem;
                    font-weight: 700;
                    line-height: .4rem;
                }
            }
        }
    }
</style>
