<template>
    <content-wrapper class="login">
        <div class="logo">
            <span class="icon"></span>
            <span class="arrow" @click="returnPage"><i></i>返回</span>
        </div>
        <scroll-component>
            <div class="title">
                <span class="icon"></span>
                <span class="text">免费试玩</span>
            </div>
            <div class="container" v-if="!hasTrialData">
                <ul class="list">
                    <li>
                        <div class="username inputstyle">
                            <span class="text">手机号码</span>
                            <input type="text" placeholder="请输入您的手机号码" v-model="phoneNumber" maxlength="11">
                        </div>
                    </li>
                    <li>
                        <div class="invalid inputstyle">
                            <div class="left">
                                <span class="text">验证码</span>
                                <input type="text" placeholder="请输入验证码" v-model="smsCode" @keyup.enter="trialPlay" maxlength="4">
                            </div>
                            <div class="trialcode" @click="getSms">
                                <span>获取验证码</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="btn">
                    <div class="loginbtn btnstyle" @click="trialPlay" >提交</div>
                </div>
            </div>
            <div class="container" v-else>
                <ul class="trialdata">
                    <li><span>您的试玩账号是:</span><span>{{trialName.name}}</span></li>
                    <li><span>您的试玩密码是:</span><span>{{trialName.password}}</span></li>
                </ul>
                <div class="btn">
                    <div class="loginbtn btnstyle" @click="autoLogin" >点击自动登录</div>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {login, captcha, addClientSourceLog} from '@/common/api';
import tool from '@/common/tool';
import {mapMutations} from 'vuex';
import {apiRequest} from '@/common/api/base';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper.vue';
export default {
    name: 'trial-play',
    data () {
        return {
            phoneNumber: null,
            smsCode: null,
            hasTrialData: true,
            trialData: null,
            trialName: {}
        };
    },
    components: {
        ScrollComponent,
        ContentWrapper
    },
    created () {
        this.trialPlay();
    },
    methods: {
        ...mapMutations(['MSGALERT', 'STATEMENT']),
        trialPlay () {
            // if (!this.phoneNumber || !this.smsCode) {
            //     this.MSGALERT({
            //         text: '请输入完整的试玩信息',
            //         status: 'error'
            //     });
            //     return false;
            // }
            apiRequest('createDemoPlayer', {
                service: 'player',
                data: {
                    phoneNumber: this.phoneNumber,
                    smsCode: this.smsCode
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '试玩账号创建成功',
                    status: 'success'
                });
                // this._clickCount('试玩注册', '试玩注册成功');
                this.trialName = res.data.playerData;
                this.trialData = res.data;
                this.hasTrialData = true;
                // this.trialData = res;
            }).catch((res) => {
                console.log(res);
            });
        },
        returnPage () {
            this.$router.back();
        },
        autoLogin () {
            apiRequest('authenticate', {
                service: 'player',
                data: {
                    token: this.trialData.token,
                    playerId: this.trialData.playerData.playerId
                }
            }).then(() => {
                this.STATEMENT({ // 存储用户数据
                    name: 'userInfo',
                    data: {
                        data: this.trialData.playerData,
                        token: this.trialData.token,
                        playerId: this.trialData.playerData.playerId
                    }
                });
                tool.setSessionStore('userInfo', { // 存储用户数据
                    data: this.trialData.playerData,
                    token: this.trialData.token,
                    playerId: this.trialData.playerData.playerId
                });
                this.MSGALERT({
                    text: '登录成功',
                    status: 'success'
                });
                this.$router.replace({name: 'home'});
            });
        },
        getSms () {
            apiRequest('getSMSCode', {
                service: 'player',
                data: {
                    phoneNumber: this.phoneNumber,
                    purpose: 'demoPlayer'
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '验证码已经发送到您的手机，请查收',
                    status: 'success'
                });
            }).catch((res) => {});
        }
    }
};
</script>

<style scoped lang="scss">
    $images: '../../assets';
    .login {
        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            height:1.5333rem;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/header-bg.png') repeat-x;
            background-size: 0.64rem 1.7066rem;
            position: relative;
            z-index: 10;
            .icon{
                background: url('https://xdlftp.xindedom.life/images/mobile_image/logo.png');
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
                width: 2.0133rem;
                height: 1.2133rem;
            }
            .arrow {
                position: absolute;
                left: 0.3733rem;
                top: 0.5066rem;
                font-size: 0.4rem;
                color: #fff;
                font-weight: 600;
                display: flex;
                align-items: center;
                i{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/left-arrow.png') no-repeat;
                    background-size: 100% 100%;
                    width: 0.32rem;
                    height: 0.5466rem;
                    display: inline-block;
                    margin-right: 2px;
                }
            }
        }
        .title {
            height:1.066rem;
            background: linear-gradient(to bottom, #272727,#111111);
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                background: url(#{$images}/trial-dice.png) no-repeat;
                width: 0.8rem;
                height: 0.8rem;
                background-size: 100% 100%;
            }
            .text {
                font-size: 0.4rem;
                font-weight: 600;
                color: #ffa200;
                padding-left: 0.15rem;
            }
        }
        .container{
            /*padding-bottom: 80%;*/
            .list{
                padding: 0.4rem 0.6rem 0;
                .inputstyle{
                    display: flex;
                    align-items: center;
                    border: 1px solid #929191;
                    background: #121212;
                    border-radius: 5px;
                    height:1rem;
                    margin-bottom: 0.34rem;
                    position: relative;
                    .text {
                        font-size: 0.4rem;
                        color: #fff;
                        padding-left: 0.2rem;
                        width: 2.133rem;
                        font-weight: 600;
                    }
                    input {
                        color: #fff;
                        border: none;
                        background: transparent;
                        font-size: 0.4rem;
                        height: 1rem;
                    }
                    .validate {
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 0.266rem;
                        color: #ff0000;
                    }
                    .showpassword {
                        font-size: 0.5rem;
                        color: #fff;
                        height: 100%;
                        line-height: 1rem;
                    }
                }
                .invalid {
                    /*width: 6.733rem;*/
                    /*width: 4rem;*/
                    background-color: transparent;
                    border: none;
                    display: flex;
                    align-items: center;
                    height: 1rem;
                    .left{
                        display: flex;
                        width: 6rem;
                        align-items: center;
                        border: 1px solid #929191;
                        border-radius: 5px;
                        height: 100%;
                        background: #121212;
                        position: relative;
                        .text {}
                        input{
                            width: 3rem;
                        }
                    }
                    .trialcode{
                        width: 3rem;
                        height:100%;
                        margin-left: 0.2rem;
                        overflow: hidden;
                        font-size: 0.38rem;
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        background: linear-gradient(to bottom, #ed7d00, #c62700);
                        border-radius: 5px;
                        justify-content: center;
                    }
                }
            }
            .trialdata{
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 0 0.4rem;
                li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 1.5rem;
                    span:nth-child(1) {
                        color: #ffffff;
                        font-size: 0.46rem;
                    }
                    span:nth-child(2) {
                        color: #ffa200;
                        font-size: 0.46rem;
                    }
                }
            }
            .btn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                /*flex-direction: column;*/
                flex-wrap: wrap;
                padding: 0.5rem 0.6rem 0;
                .btnstyle {
                    width: 100%;
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    color: #fff;
                    font-size: 0.4rem;
                    border-radius: 5px;
                    margin-bottom: 0.4rem;
                }
                .loginbtn {
                    background: linear-gradient(to bottom, #ed7d00, #c62700);
                }
                .forgotbtn {
                    width: 48%;
                    background: linear-gradient(to bottom, #706e70, #4a494a, #232223);
                }
                .registerbtn{
                    width: 48%;
                    background: linear-gradient(to bottom, #8fd40f, #2e7705);
                }
            }
        }
        ::-webkit-input-placeholder {
            color: #383838;
            font-size:0.3466rem;
        }
    }
</style>
