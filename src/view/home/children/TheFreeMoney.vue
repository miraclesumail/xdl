<template>
<div class="container" v-if="redpack">
    <div class="bg-money">
        <img src="https://xdlftp.xindedom.life/images/mobile_all_promo/mobile_discount/redpack/get_red_pack.png" alt="" ref="getFree" @click="register">
        <span class="iconfont icon-guanbi" @click="close"></span>
    </div>
    <div class="bg-cover"></div>
</div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import tool from '@/common/tool';
export default {
    name: 'the-free-money',
    data () {
        return {
            redpack: false
        };
    },
    methods: {
        register () {
            this._clickCount('首页', '开户', true);
            this.$router.push({name: 'register'});
            this.redpack = false;
            tool.setSessionStore('redpack', false);
        },
        close () {
            this.redpack = false;
            tool.setSessionStore('redpack', false);
        },
        setOpenAnimations () {
            this.$refs.getFree.setAttribute('class', 'bounceIn');
        },
        getFreeMoneyDiscount () {
            if (tool.getSessionStore('redpack') !== false) {
                apiRequest('getRewardList', {
                    service: 'reward',
                    data: {}
                }).then((res) => {
                    res.data.forEach((val, index) => {
                        if (val.code === 'sccj10') {
                            this.redpack = true;
                            this.$nextTick(() => {
                                this.setOpenAnimations();
                            });
                        }
                    });
                }).catch((res) => {
                    console.log(res);
                });
            }
        },
        closeRedPack () {}
    },
    mounted () {},
    created () {
        this.getFreeMoneyDiscount();
    }
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
