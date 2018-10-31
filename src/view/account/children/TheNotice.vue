<template>
    <content-wrapper class="container" :options="options">
        <common-header>设置短信通知</common-header>
        <scroll-component>
            <div class="content">
                <!--{{noticeArr}}-->
                <ul class="list">
                    <li v-for="(item, index) in smsList" :key="index">
                        <div class="item">
                            <div class="left">
                                {{item.smsName}}
                            </div>
                            <div class="right">
                                <toggle-button :labels="options.labels" :value="item.status ? true : false" @change="isOpen(item.status, item.smsId)"></toggle-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {getSmsStatus, setSmsStatus} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
Vue.use(ToggleButton);
// import {tool} from '@/common/tool';
// import {mapState, mapMutations} from 'vuex';
export default {
    name: 'the-notice',
    data () {
        return {
            noticeArr: [],
            deposit: false,
            withdraw: false,
            discount: false,
            changeBank: false,
            washCode: false,
            editPassword: false,
            checked: false,
            select: [],
            smsList: null,
            options: {
                labels: {checked: '打开', unchecked: '关闭'},
                value: false,
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    components: {
        // ToggleButton
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        init () {
            apiRequest('getSmsStatus', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.smsList = res.data;
                this.smsList.map((res, val, arr) => {
                    if (res.status === 1) {
                        this.noticeArr.push(res.smsId);
                    }
                });
            });
        },
        onChangeEventHandler (id) {
            console.log(id);
            console.log(event);
        },
        isOpen (status, id) {
            let open = null;
            if (status === 1) {
                open = 0;
            } else {
                open = 1;
            }
            console.log(open);
            apiRequest('setSmsStatus', {
                service: 'player',
                data: {
                    status: id + ':' + open,
                    _isLoading: true
                }
            }).then((res) => {
                this.init();
                // this.smsList = res.data.smsSetting;
            });
        }
    },
    mounted () {},
    created () {
        this.init();
    },
    watch: {
        // noticeArr () {}
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.content {
    .list {
        padding: 0.4rem;
        li {
            margin-top: 0.3rem;
            border: 1px solid #fff;
            border-radius: 4px;
            height: 1.2rem;
            overflow: hidden;
            .item {
                display: flex;
                align-items: center;
                /*height: 100%;*/
                height: 1.2rem;
                justify-content: space-between;
                background: url('https://xdlftp.xindedom.life/images/mobile_image/header-bg.png') repeat-x;
                background-size: 0.5866rem 1.066rem;
                padding: 0 0.3rem;
                .left {
                    font-size: 0.4rem;
                    font-weight: 600;
                    color: #fff;
                    height: 0.5rem;
                }
                .right {
                    display: flex;
                    align-items: center;
                    /*height: 2rem;*/
                    /*.ios7CBox{
                        margin:0;
                        border:none;
                        width:1.36rem;
                        height:0.75rem;
                        position:relative;
                        color:#fff;
                        background:none;
                        -webkit-appearance: none;
                        overflow: hidden;
                        border-radius: 33px;
                    }
                    .ios7CBox:before,
                    .ios7CBox:after{
                        position: absolute;
                        left:0;
                        top:0;
                        content:'';
                    }
                    .ios7CBox:before{
                        transition: all 0.4s;
                        position:absolute;
                        top:0;right:0;bottom:0;left:0;
                        border-radius: 33px;
                        background:#fff;
                        border:3px solid #E5E5E5;
                    }
                    .ios7CBox:after{
                        top: 50%;
                        left: 0;
                        transform:translate(-0.01rem, -50%);
                        transition: all 0.2s;
                        border-radius: 50%;
                        width:0.56rem;
                        height:0.56rem;
                        background:#fff;
                        box-shadow:0px 4px 8px rgba(0,0,0,0.3),0px 0px 2px rgba(0,0,0,0.3);
                        -webkit-animation: ios7CBox_after 0.4s;-webkit-animation-fill-mode:both;
                        -moz-animation: ios7CBox_after 0.4s;-moz-animation-fill-mode:both;
                    }
                    .ios7CBox:hover:after{
                        box-shadow:0px 4px 8px rgba(0,0,0,0.4),0px 0px 2px rgba(0,0,0,0.3);
                    }
                    .ios7CBox:focus:before{
                        border:3px solid #C6C6C6;
                    }
                    .ios7CBox:focus{
                        outline: none;
                    }
                    .ios7CBox:checked:before{
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        border-style:solid;
                        border-color:#4CD864;
                        border-width: 0.38rem 0.41rem 0.41rem 0.38rem;
                    }
                    .ios7CBox:checked:after{
                        -webkit-animation: ios7CBox_after_checked 0.4s;-webkit-animation-fill-mode:both;
                        -moz-animation: ios7CBox_after_checked 0.4s;-moz-animation-fill-mode:both;
                    }
                    .ios7CBox:active:after{
                        !*width:64px;*!
                    }
                    .ios7CBox:active:checked:after{
                        !*width:64px;*!
                        !*margin-left:-8px;*!
                    }
                    @-webkit-keyframes ios7CBox_after {
                        0% {left:0.72rem;}
                        70% {left:1px;}
                        100% {left:4px;}
                    }
                    !*@-moz-keyframes ios7CBox_after {*!
                        !*0% {left:1.16rem;}*!
                        !*70% {left:1px;}*!
                        !*100% {left:4px;}*!
                    !*}*!
                    @-webkit-keyframes ios7CBox_after_checked {
                        0% {left:4px;}
                        70% {left:0.8rem;}
                        100% {left:0.72rem;}
                    }*/
                    /*@-moz-keyframes ios7CBox_after_checked {*/
                        /*0% {left:4px;}*/
                        /*70% {left:47px;}*/
                        /*100% {left:1.16rem;}*/
                    /*}*/
                    /*display: flex;
                    align-items: center;
                    .btnbg {
                        display: block;
                        background: #424242;
                        width:1.36rem;
                        height:0.69333rem;
                        border-radius: 20px;
                        position: relative;
                        transition: 0.5s all;
                        .noselect {
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            left: 0.1rem;
                            top: 50%;
                            transform: translate(0, -50%);
                            z-index: 0;
                            background: #b98d0b;
                            border-radius: 50%;
                        }
                    }
                    input {
                       display: none;
                    }*/
                }
            }
        }
    }
}
</style>
