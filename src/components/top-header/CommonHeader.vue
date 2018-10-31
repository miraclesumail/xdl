<template>
    <div class="header">
        <div class="content">
            <div class="return" @click="returnPage">
                <span class="icon"></span>
                <span class="text">返回</span>
            </div>
            <div class="title">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account-header',
    methods: {
        returnPage () {
            this.$router.back();
        }
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .header {
        .content {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to bottom, #414141, #000);
            height: 1.5333rem;
            line-height: 1.5333rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #7d2f00;
            z-index: 20;
            .return {
                position: absolute;
                left: 0.4rem;
                top: 50%;
                transform: translate(0, -50%);
                display: flex;
                align-items: center;
                .icon {
                    background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/left-arrow.png') no-repeat;
                    width: 0.32rem;
                    height: 0.5466rem;
                    background-size: 100% 100%;
                }
                .text {
                    padding-left: 0.15rem;
                    color: #ffffff;
                    font-size: 0.4rem;
                    font-weight: 600;
                }
            }
            .title {
                text-align: center;
                font-size: 0.50666rem;
                color: #ffffff;
                font-weight: 600;
            }
        }
    }
</style>
