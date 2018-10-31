<template>
<div class="container" v-if="this.freeMoney.isShow">
    <div class="bg-money">
        <img class="bounceIn" src="../../assets/redpack/open-red-pack.png" ref="openFree" alt="" @click="closeRedPack">
        <span class="iconfont icon-guanbi" @click="close"></span>
        <span class="number">{{this.freeMoney.money}}</span>
    </div>
    <div class="bg-cover"></div>
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'the-free-money',
    data () {
        return {
            redpack: false
        };
    },
    computed: {
        ...mapState(['freeMoney'])
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        close () {
            this.STATEMENT({
                name: 'freeMoney',
                type: 'isShow',
                data: false
            });
            this.redpack = false;
        },
        getOpenAnimations () {
            // this.$refs.openFree.setAttribute('class', 'bounceIn');
        },
        closeRedPack () {
            this.STATEMENT({
                name: 'freeMoney',
                type: 'isShow',
                data: false
            });
            this.redpack = false;
        }
    },
    mounted () {
    },
    created () {}
};
</script>

<style scoped lang="scss">
.container{
    position: absolute;
    left: 0;
    top: 0;
    .bg-money{
        position: fixed;
        width: 80%;
        left: 50%;
        top: 50%;
        z-index: 10;
        transform: translate3d(-50%, -50%, 0);
        img{
            width: 100%;
        }
        .icon-guanbi {
            position: absolute;
            right: -0.5rem;
            top: 0;
            font-size: 0.6rem;
            color: #fff;
        }
        .number {
            font-size: 1.4rem;
            color: #fff33f;
            position: absolute;
            /*text-align: center;*/
            width: 2.4rem;
            top: 51%;
            left: 45%;
            text-align: center;
            font-weight: 600;
        }
    }
    .bg-cover{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(000, 000, 000, 0.6);
    }
}
@keyframes bounceIn {
    from,
    20%,
    40%,
    60%,
    80%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        -webkit-transform: scale3d(0.97, 0.97, 0.97);
        transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}
.bounceIn {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
    animation-fill-mode: both;
    /*animation-iteration-count: infinite;*/
}
</style>
