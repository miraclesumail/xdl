<template>
    <div class="spend-task-wrapper">
        <span v-if="taskData.status" :class="'task-status points-sprite i-spend-' + taskData.status"></span>
        <div class="spend-text-img" :style="{background: `url(${taskData.imageUrl})`, backgroundSize: '80% 80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}" @click="lookBigImg(taskData.imageUrl, taskData.name)">
            <p>{{ taskData.detail.displayTitle }} {{ taskData.detail.displayTextContent}}元 {{ taskData.detail.requestBetTimes}}</p>

        </div>
        <div class="spend-bottom-wrapper">
            <p class="points-text">{{ taskData.detail.displayId }}<br/>积分</p>
            <div class="spend-btn">
                <div class="btn-helper" @click="triggeredBtn(taskData.detail, taskData.name)">
                    <p>立即兑换</p>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'spend-task',
    props: {
        /*
        ** title: String
        ** points: String
        ** status: hot, new, null
        */
        taskData: {
            type: Object,
            required: true
        }
    },
    methods: {
        triggeredBtn (item, type) {
            console.log(item);
            if (type === 'gift') {
                this.$emit('applyGift', item.displayId, item.displayTitle);
            } else if (type === 'money') {
                this.$emit('applyMoney', item.displayId);
            }
        },
        lookBigImg (url, type) {
            if (type === 'gift') {
                this.$emit('lookBigImg', url);
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .i-spend-hot {
        width: .866rem;
        height: 1.226rem;
        background-position: -4.04rem -1.133rem;
    }

    .i-spend-new {
        width: .933rem;
        height: .933rem;
        background-position: -4.946rem -1.133rem;
    }

    .spend-task-wrapper {
        width: 4.08rem;
        height: 5.1rem;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .task-status {
            position: absolute;
            top: -.2rem;
            right: -.133rem;
        }

        .spend-text-img {
            width: 100%;
            height: 3.746rem;
            display: flex;
            /*flex-direction: column;*/
            align-items: center;
            justify-content: flex-end;
            position: relative;
            > p {
                width: 100%;
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                font-size: .4rem;
                color: #00bbff;
                font-weight: bold;
                text-align: center;
            }
        }

        .spend-bottom-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-top: 20px;
            .points-text {
                width: 100%;
                color: #fff;
                font-size: .38rem;
                font-weight: 700;
                text-align: center;
            }

            .spend-btn {
                width: 2.373rem;
                height: .813rem;
                background-color: #ab5906;
                border-radius: .133rem;

                .btn-helper {
                    width: 2.373rem;
                    height: .72rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(#f9d03e, #ff7f00);
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
        }
    }
</style>
