<template>
    <div class="toast_container" :class="msgShow ? 'fade-in': ''" :key="msgIndex" v-if="msgStatus" ref="toast">
        <div class="toast_pop"><span
            class="iconfont" :class="msgSelect"></span><span>{{msgText}}</span></div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'toast-children',
    data () {
        return {
            msgText: this.msg.msgText,
            msgStatus: true,
            msgShow: false,
            msgIndex: this.msg.msgIdx
        };
    },
    methods: {...mapMutations(['CLEARMSGALERT']),},
    props: {
        msg: {
            type: Object,
            required: true
        }
    },
    components: {},
    computed: {
        ...mapState(['msgAlert']),
        msgSelect () {
            switch (this.msg.msgIcon) {
            case 'success':
                return 'icon-chenggong';
            case 'error' :
                return 'icon-shibai';
            case 'warn' :
                return 'icon-wuuiconsuotanhao';
            }
        }
    },
    mounted () {
        // console.log(this.idx);
        // console.log(this.msgIndex);
        setTimeout(() => {
            this.msgShow = true;
        }, 100);
        setTimeout(() => {
            this.msgShow = false;
            this.$refs.toast.addEventListener('transitionend', () => {
                this.msgStatus = false;
            });
            this.CLEARMSGALERT()
        }, 2000, false);
    }
};
</script>

<style scoped lang="scss">
    .toast {
        .toast_container {
            position: fixed;
            left: 50%;
            top: -50px;
            z-index: 50;
            transform: translate(-50%, 0);
            transition: 0.5s all;
            opacity: 0;
            .toast_pop {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                /*width: 8.6rem;*/
                background: linear-gradient(to bottom, #232323, #111111);
                /*height: 1.24rem;*/
                min-height: 0.8rem;
                /*border: 1px solid #fff;*/
                box-shadow: 0 0 2px #ccc;
                /*min-width: 1rem;*/
                /*min-height: 0.8rem;*/
                /*background-color: #111111;*/
                span:nth-child(2) {
                    text-align: center;
                    /*width: 90%;*/
                    font-size: 0.4rem;
                    padding: 0.2rem 0.3rem;
                    color: #ffffff;
                }
            }
        }
        .icon-chenggong {
            color: #19be6b;
            font-size: 0.5rem;
            padding-left: 0.3rem;
        }
        .icon-shibai {
            color: #ed3f14;
            font-size: 0.5rem;
            padding-left: 0.3rem;
        }
        .icon-wuuiconsuotanhao {
            color: #ff9900;
            font-size: 0.4rem;
            padding-left: 0.3rem;
        }
        .fade-in {
            top: 30px;
            opacity: 1;
        }
    }
</style>
