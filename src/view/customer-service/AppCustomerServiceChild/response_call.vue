<template>
    <div class="request-call-wrapper" @touchmove.prevent.stop="">
        <div class="rcw-container">
            <div class="rcw-head">
                <img src="https://xdlftp.xindedom.life/images/mobile_image/cs-image.png" />
                <p>欢迎访问新得利客服回电系统请输入您的联系电话，客服人员会立即致电给您. 点击热线电话可直接联系我们.</p>
            </div>
            <div class="rcw-body">
                <div class="rcw-b-inputs">
                    <p>客服热线</p>
                    <div><a href="tel:4001209065">4001209065</a></div>
                    <p class="notice">(收费)</p>
                </div>
                <div class="rcw-b-inputs">
                    <p>联系电话</p>
                    <div><input v-model="phone" placeholder="请输入手机号码" maxlength="11"/></div>
                    <p class="notice">(免费)</p>
                </div>
                <div class="rcw-b-inputs">
                    <p>验证码</p>
                    <div><input v-model="smsCode" placeholder="验证码"/><img class="rcw-b-i-img" @click="validCode" :src='random' /></div>
                    <p class="notice"></p>
                </div>
                <div class="rcw-b-btns">
                    <div @click="confirm"><p>确定</p></div>
                    <div @click="cancel"><p>取消</p></div>
                </div>
            </div>
        </div>
        <div class="cover"></div>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import {mapMutations} from 'vuex';
export default {
    name: 'response-call',
    data () {
        return {
            code: null,
            phone: null,
            smsCode: null,
            randomNumber: null,
            random: null
        };
    },
    created () {
        this.init();
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        init () {
            this.validCode();
        },
        validCode () {
            apiRequest('getOMCaptcha', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.random = res.data.b64ImgDataUrl;
                this.randomNumber = res.data.randomNumber;
            }).catch((res) => {});
        },
        confirm () {
            if (!this.smsCode || !this.phone) {
                this.MSGALERT({
                    text: '请输入完整信息',
                    status: 'error'
                });
                return false;
            }
            apiRequest('callBackToUser', {
                service: 'player',
                data: {
                    phoneNumber: this.phone,
                    randomNumber: this.randomNumber,
                    captcha: this.smsCode
                }
            }).then((res) => {
                // console.log(res);
                this.MSGALERT({
                    text: '提交成功，客服人员将会给你回电',
                    status: 'success'
                });
            }).catch((res) => {
                console.log(res);
            });
            this.cancel();
        },
        cancel () {
            this.$emit('close');
        }
    }
};
</script>

<style scoped lang="scss">
    .request-call-wrapper {
        .cover{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(000,000,000,0.8);
            z-index: 10;
        }
        .rcw-container{
            width: 7rem;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: .4rem;
            z-index: 30;
        }
        .rcw-head {
            position: relative;
            img {
                position: absolute;
                top: 50%;
                left: -0.5rem;
                width: 3rem;
                height: 3rem;
                -webkit-transform: translateY(-50%);
                -moz-transform: translateY(-50%);
                transform: translateY(-50%);
            }

            p {
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                // margin-left: 1rem;
                padding: .25rem;
                padding-left: 3rem;
                background: #8e0100;
                background: linear-gradient(#fe7d14, #8e0100);
            }
        }
        .rcw-body {
            background: #000000;
            background: linear-gradient(#1c1c1c, #000000);

            > div {
                display: flex;
                align-items: center;
                justify-content: center;
                &.rcw-b-inputs {
                    padding: .1rem 0;
                    &:first-child {
                        padding-top: .4rem;

                        > div p {
                            color: #ffa200;
                            font-size: .5rem;
                        }
                    }
                    > p {
                        width: 25%;
                    }
                    > div {
                        width: 50%;
                        position: relative;
                        a {
                            color: #ffa200;
                            font-size: .5rem;
                        }
                    }
                    input {
                        width: 100%;
                        padding: .15rem;
                        color: #fff;
                        font-size: .4rem;
                        background-color: transparent;
                        box-sizing: border-box;
                        border: 1px solid #fff;
                        border-radius: .15rem;
                    }

                    p.notice {
                        text-align: right;
                        width: 17%;
                        color: #FF3131;
                    }

                    .rcw-b-i-img {
                        width: 40%;
                        position: absolute;
                        top: 50%;
                        right: .1rem;

                        -webkit-transform: translateY(-50%);
                        -moz-transform: translateY(-50%);
                        transform: translateY(-50%);
                    }
                }

                &.rcw-b-btns {
                    padding-top: .2rem;
                    padding-bottom: 0.5rem;

                    > div {
                        margin: 0 .75rem;
                        padding: .2rem .5rem;
                        border-radius: .15rem;

                        &:first-child {
                            background: #2f7805;
                            background: linear-gradient(#8fd40f, #2f7805);
                        }

                        &:last-child {
                            background: #c62600;
                            background: linear-gradient(#ee7f00, #c62600);
                        }
                    }
                }
            }
        }
    }
</style>
