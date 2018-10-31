<template>
    <div class="modal_wrapper">
        <div class="modal_cover" v-if="msgModal.modalStatus"></div>
        <transition name="modal">
            <div class="modal_container" v-if="msgModal.modalStatus">
                <div class="modal_header">
                    <span>{{msgModal.modalTitle? msgModal.modalTitle : '提示'}}</span>
                    <span @click="close"></span>
                </div>
                <div class="modal_text" v-html="msgModal.modalText">
                </div>
                <div class="modal_btn">
                    <button @click="cancel(msgModal.modalCancelFun)">{{msgModal.cancelName? msgModal.cancelName : '取消'}}</button>
                    <button @click="confirm(msgModal.modalConfirmFun)">{{msgModal.confirmName? msgModal.confirmName : '确定'}}</button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex';
export default {
    name: 'modal',
    data () {
        return {};
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        cancel (Fun) {
            this.STATEMENT({
                name: 'msgModal',
                type: 'modalStatus',
                data: false
            });
            Fun && Fun();
        },
        confirm (Fun) {
            this.STATEMENT({
                name: 'msgModal',
                type: 'modalStatus',
                data: false
            });
            Fun && Fun();
        },
        close () {
            this.STATEMENT({
                name: 'msgModal',
                type: 'modalStatus',
                data: false
            });
        }
    },
    computed: {
        ...mapState(['msgModal'])
    }
};
</script>
<style scoped lang="scss">
    $images:'../../assets';
    .modal_wrapper {
        .modal_cover {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 21;
            background-color: rgba(000, 000, 000, 0.7);
            width: 100%;
            height: 100%;
        }
        .modal_container {
            position: fixed;
            z-index: 50;
            left: 50%;
            top: 50%;
            width: 8.6666rem;
            margin-left: -4.3333rem;
            margin-top: -25%;
            background:linear-gradient(to bottom, #1d1d1d, #111111);
            border-radius: 8px;
            border: 1px solid #da5908;
            overflow: hidden;
            height: 4.9rem;
            .modal_header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: url('https://xdlftp.xindedom.life/images/mobile_image/modal-bg.png') no-repeat;
                background-size: 100% 100%;
                /*border-top-left-radius: 8px;*/
                /*border-top-right-radius: 8px;*/
                height: 0.8666rem;
                padding: 0 0.266rem;
                span:nth-child(1) {
                    font-size: 0.5rem;
                    /*padding: 0.2rem 0.2rem 0.2rem 0.2rem;*/
                    color: #000;
                    font-weight: bold;
                }
                span:nth-child(2) {
                    width: 0.48rem;
                    height: 0.48rem;
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/modal-close.png');
                    background-size: 100% 100%;
                    margin-right: 0;
                }
            }
            .modal_text {
                font-size: 0.4rem;
                text-align: center;
                font-weight: normal;
                padding: 0.4rem 0;
                height: 1.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
            .modal_btn {
                display: flex;
                align-items: center;
                justify-content: center;
                /*padding: 0.24rem 0.4rem;*/
                padding-bottom: 0.8rem;
                button {
                    outline: none;
                    border: none;
                    border-radius: 6px;
                    width: 2.8666rem;
                    height: 0.9rem;
                    font-size: 0.4rem;
                    color: #fff;
                }
                button:nth-child(1) {
                    /*border: 1px solid #dcdfe6;*/
                    /*background-color: #fff;*/
                    background: linear-gradient(to bottom, #ed7c00, #c72800);
                    padding: 0.16rem 0.5rem;
                    margin-right: 0.666rem;

                }
                button:nth-child(2) {
                    /*color: #fff;*/
                    /*background-color: #409eff;*/
                    /*border: 1px solid #409eff;*/
                    background: linear-gradient(to bottom, #8fd40f, #2e7705);
                    padding: 0.16rem 0.5rem;
                }
            }
        }
    }

    .modal-enter {
        transform: translate3d(0, -30px, 0);
        opacity: 0;
    }

    .modal-enter-active, .modal-leave-active {
        transition: 0.5s all;
    }

    .modal-enter-to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }

    .modal-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }

    .modal-leave-to {
        opacity: 0;
        transform: translate3d(0, -50px, 0);
    }
</style>
