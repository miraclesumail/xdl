<template>
<div class="container" @touchmove.prevent.stop="">
    <div class="box">
        <span class="iconfont icon-weixin"></span>
        <div class="text">xindeli_888</div>
        <a href="javascript:;" class="btn" @click="openApp">打开微信客户端</a>
    </div>
    <div class="iconfont icon-guanbi" @click="close"></div>
</div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    name: 'qq-pop',
    methods: {
        ...mapMutations(['MSGALERT']),
        close () {
            this.$emit('close');
        },
        openApp () {
            let ow = window.location;
            ow.href = 'weixin://';
            if (ow.href !== 'weixin://') {
                this.MSGALERT({
                    text: '打开失败，请检查微信是否已经安装',
                    status: 'error'
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
.container{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(000,000,000, 0.9);
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .icon-guanbi{
        position: absolute;
        right: 0.5rem;
        top: 2rem;
        font-size: 0.6rem;
        color: #ffffff;
    }
    .icon-weixin{
        font-size: 1rem;
        color: #fff;
        background-color: #52c41a;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-bottom: 0.2rem;
    }
    .text{
        font-size: 0.6rem;
        color: #ffffff;
    }
    .btn{
        background-color: #db7b1c;
        margin-top: 0.4rem;
        width: 3.5rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 5px;
        font-size: 0.4rem;
        color: #ffffff;
    }
}
</style>
