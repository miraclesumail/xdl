<template>
    <div class="register">
    <!--<content-wrapper class="register" :options="options">-->
        <!--<scroll-component class="register-container">-->
            <div class="logo">
                <span class="icon"></span>
                <span class="arrow" @click="returnPage"><i></i>返回</span>
            </div>
            <div class="title">
                <span class="icon"></span>
                <span class="text">注册</span>
            </div>
            <div class="container">
                <h1 class="secondtitle">注册信息</h1>
                <ul class="list">
                    <li>
                        <div class="username inputstyle">
                            <span class="text">账号</span>
                            <i class="initial">a</i>
                            <input type="text" placeholder="请输入4-11位账号" maxlength="11" v-model.trim="user" @blur="blurInput('user')" @focus="focusInput('user')">
                            <span class="validate" :class="validateUser.status?'validateactive':''" v-show="validateUser.isShow"><i class="iconfont" :class="validateUser.status?'icon-chenggong':'icon-shibai'"></i>{{validateUser.usertext}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="password inputstyle">
                            <span class="text">密码</span>
                            <input type="text" placeholder="最少输入6位密码" v-model.trim="password" ref="passwordEl" @blur="blurInput('password')" >
                            <span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>
                            <!--<span class="showpassword" v-show="validate.name"><i class="iconfont" :class="validate.name?'icon-chenggong':'icon-shibai'"></i></span>-->
                        </div>
                    </li>
                    <li>
                        <div class="confirmpassword inputstyle">
                            <span class="text">确认密码</span>
                            <input type="text" placeholder="请重复输入您的密码" v-model.trim="confirmPassword" ref="passwordConEl" @blur="blurInput('confirmPassword')" >
                            <span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>
                            <!--<span class="showpassword" v-show="validate.name"><i class="iconfont" :class="validate.name?'icon-chenggong':'icon-shibai'"></i></span>-->
                        </div>
                    </li>
                    <li>
                        <div class="confirmpassword inputstyle">
                            <span class="text">推荐人</span>
                            <input type="text" placeholder="请输入您的推荐人的账号" v-model="recommend">
                            <!--<span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>-->
                            <!--<span class="showpassword" v-show="validate.name"><i class="iconfont" :class="validate.name?'icon-chenggong':'icon-shibai'"></i></span>-->
                        </div>
                    </li>
                </ul>
                <h1 class="secondtitle">个人信息</h1>
                <ul class="list">
                    <li>
                        <div class="phone inputstyle">
                            <span class="text">手机号码</span>
                            <input type="tel" placeholder="请输入您的手机号码" maxlength="11" v-model.trim="phone" @blur="blurInput('phone')">
                            <!--<span class="validate" v-show="validate.name"><i class="iconfont" :class="validate.name?'icon-chenggong':'icon-shibai'"></i>1111</span>-->
                        </div>
                    </li>
                    <li>
                        <div class="invalid inputstyle">
                            <div class="left">
                                <span class="text">验证码</span>
                                <input type="tel" placeholder="请输入验证码" maxlength="6" v-model.trim="code" @blur="blurInput('code')">
                                <!--<span class="validate" v-show="validate.code"><i class="iconfont" :class="validate.code?'icon-chenggong':'icon-shibai'"></i>1111</span>-->
                            </div>
                            <div class="code" @click="getPhoneCode">
                                <span>{{codeText}}</span>
                                <!--<img :src="codeUrl" alt="">-->
                            </div>
                            <div class="question" @click="question">
                                收不到?
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="btn" @click="register">
                    确认注册
                </div>
            </div>
        <!--</scroll-component>-->
    <!--</content-wrapper>-->
    </div>
</template>

<script>
// import {create, getSMSCode, isValidUsername, authenticate, addClientSourceLog} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import tool from '@/common/tool';
import {mapMutations, mapState} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper.vue';
export default {
    name: 'the-register',
    data () {
        return {
            user: null,
            password: null,
            confirmPassword: null,
            phone: null,
            code: null,
            showPassword: true,
            codeText: '获取验证码',
            validate: { // 用于注册的最终验证
                userName: false,
                password: false,
                confirmPassword: false,
                phone: false,
                code: false
            },
            validateUser: { // 用于注册的基础验证
                usertext: null,
                status: false,
                isShow: false
            },
            goBack: null,
            timer: null,
            isReceptionSms: true,
            errorMessage: '验证码已经发送到您的手机了请查收',
            recommend: null,
            partnerId: null,
            options: {
                top: 0,
                bottom: 1.7333
            },
            deviceData: {
                id: null,
                device: null
            }
        };
    },
    methods: {
        ...mapMutations(['MSGALERT', 'MSGMODAL', 'STATEMENT']),
        register () {
            // for (let i in this.validate) {
            //     if (!this.validate[i]) {
            //         this.MSGALERT({
            //             status: 'error',
            //             text: '填写信息不正确'
            //         });
            //     }
            //     return;
            // }

            if (!this.user) {
                this.MSGALERT({
                    status: 'error',
                    text: '账号不能为空'
                });
                return;
            }
            if (!(this.user.length >= 4)) {
                this.MSGALERT({
                    status: 'error',
                    text: '账号长度是5-11位'
                });
                return;
            }
            if (!(this.password.length >= 6)) {
                this.MSGALERT({
                    status: 'error',
                    text: '密码最少6位'
                });
                return;
            }
            if ((this.password !== this.confirmPassword)) {
                this.MSGALERT({
                    status: 'error',
                    text: '密码和确认密码不一致'
                });
                return;
            }
            if (!this.code) {
                this.MSGALERT({
                    status: 'error',
                    text: '验证码不能为空'
                });
                return;
            }
            if (!this.validateUser.status) {
                this.MSGALERT({
                    status: 'error',
                    text: '该用户名已经被使用'
                });
                return;
            }
            this.user = tool.trimTransfer(this.user);
            this.password = tool.trimTransfer(this.password);
            this.confirmPassword = tool.trimTransfer(this.confirmPassword);
            this.phone = tool.trimTransfer(this.phone);
            this.code = tool.trimTransfer(this.code);
            apiRequest('create', {
                service: 'player',
                data: {
                    name: 'a' + this.user,
                    password: this.password,
                    phoneNumber: this.phone,
                    smsCode: this.code,
                    referral: this.recommend,
                    domain: location.hostname.substring(4), // 注册用户的域名
                    sourceUrl: document.referrer, // 获取来源的链接
                    partnerId: this.partnerId,
                    deviceId: this.deviceData.id
                }
            }).then((res) => {
                console.log(res);
                this.MSGMODAL({
                    text: `恭喜您注册成功，您的账号是${res.data.name}`,
                    status: true
                });
                if (!this.userInfo) { // 如果用户是已经登录的了,那就不能再次登录,如果没有登录那就执行登录
                    apiRequest('authenticate', {
                        service: 'player',
                        data: {
                            token: res.token,
                            playerId: res.data.playerId
                        }
                    }).then(() => {
                        this.STATEMENT({ // 存储用户数据
                            name: 'userInfo',
                            data: {
                                data: res.data,
                                token: res.token,
                                playerId: res.data.playerId
                            }
                        });
                        apiRequest('addClientSourceLog', {
                            service: 'player',
                            data: {
                                sourceUrl: location.hostname,
                                playerName: res.data.name,
                                clientType: 'h5',
                                accessType: 'register'
                            }
                        });
                        tool.setSessionStore('userInfo', { // 存储用户数据
                            data: res.data,
                            token: res.token,
                            playerId: res.data.playerId
                        });
                        this.$router.replace({name: 'home'});
                    });
                } else {
                    this.$router.push({name: 'home'});
                }
            });
        },
        getPhoneCode () { // 获取手机注册码
            if (!this.user || !this.password) {
                this.MSGALERT({
                    status: 'error',
                    text: '请先输入完整账号信息'
                });
                return;
            }
            if ((this.password !== this.confirmPassword)) {
                this.MSGALERT({
                    status: 'error',
                    text: '密码和确认密码不一致'
                });
                return;
            }
            if (!this.phone) {
                this.MSGALERT({
                    status: 'error',
                    text: '请输入手机号码'
                });
                return;
            }
            if (!this.validateUser.status) {
                this.MSGALERT({
                    status: 'error',
                    text: '该用户名已经被使用'
                });
                return;
            }
            if (this.phone.length === 11) {
                if (this.isReceptionSms) {
                    apiRequest('getSMSCode', {
                        service: 'player',
                        data: {
                            phoneNumber: this.phone,
                            purpose: 'registration',
                            name: 'a' + this.user,
                            _isModal: true
                        }
                    }).then((res) => {
                        this.errorMessage = '验证码已经发送到您的手机了请查收';
                        this.MSGALERT({
                            status: 'success',
                            text: this.errorMessage
                        });
                        this.codeText = 60;
                        clearInterval(this.timer);
                        this.isReceptionSms = false;
                        this.timer = setInterval(() => {
                            this.codeText--;
                            if (this.codeText === 0) {
                                clearInterval(this.timer);
                                this.isReceptionSms = true;
                                this.codeText = '获取验证码';
                            }
                        }, 1000);
                    }).catch((res) => {
                        this.MSGMODAL({
                            status: 'error',
                            text: res.errorMessage
                        });
                        this.errorMessage = res.errorMessage;
                        this.codeText = 30;
                        clearInterval(this.timer);
                        this.isReceptionSms = false;
                        this.timer = setInterval(() => {
                            this.codeText--;
                            if (this.codeText === 0) {
                                clearInterval(this.timer);
                                this.isReceptionSms = true;
                                this.codeText = '获取验证码';
                            }
                        }, 1000);
                    });
                } else {
                    this.MSGALERT({
                        status: 'error',
                        text: this.errorMessage
                    });
                    return false;
                }
            } else {
                this.MSGALERT({
                    status: 'error',
                    text: '手机号码格式不正确'
                });
            }
        },
        blurInput (name) {
            switch (name) {
            case 'user' :
                if (!this.user) {
                    // this.MSGALERT({
                    //     status: 'error',
                    //     text: '请输入4-10位账号'
                    // });
                    // this.validate.userName = false;
                } else {
                    if (this.user.length >= 4 && this.user.length <= 11) {
                        this.validateUser.isShow = true;
                        apiRequest('isValidUsername', {
                            service: 'player',
                            data: {
                                name: 'a' + this.user,
                                _isModal: true,
                                _isLoading: true
                            }
                        }).then((res) => {
                            this.validateUser.usertext = '该用户名可用';
                            this.validateUser.status = true;
                            this.validate.userName = true;
                        }).catch((res) => {
                            this.validateUser.usertext = '该用户名已存在';
                            this.validateUser.status = false;
                            this.validate.userName = false;
                        });
                    } else {
                        // this.MSGALERT({
                        //     status: 'error',
                        //     text: '您输入的是' + this.user.length + '位账号，不符合格式要求'
                        // });
                        // this.validate.userName = false;
                    }
                }
                break;
            case 'password':
                // if (!this.password) {
                //     this.MSGALERT({
                //         status: 'error',
                //         text: '最少输入6位密码'
                //     });
                //     this.validate.password = false;
                // } else {
                //     if (this.password.length < 6) {
                //         this.MSGALERT({
                //             status: 'error',
                //             text: '最少输入6位密码'
                //         });
                //         this.validate.password = false;
                //     } else {
                //         this.validate.password = true;
                //     }
                // }
                break;
            case 'confirmPassword':
                if (!this.confirmPassword) {
                    // this.MSGALERT({
                    //     status: 'error',
                    //     text: '重复输入密码不能为空'
                    // });
                    this.validate.confirmPassword = false;
                } else {
                    if (this.password === this.confirmPassword) {
                        this.validate.confirmPassword = true;
                    } else {
                        this.MSGALERT({
                            status: 'error',
                            text: '确认密码和密码不一样'
                        });
                        this.validate.confirmPassword = false;
                    }
                }
                break;
            case 'phone':
                if (!this.phone) {
                    // this.MSGALERT({
                    //     status: 'error',
                    //     text: '请输入您的手机号码'
                    // });
                    this.validate.phone = false;
                } else {
                    if (this.phone.length !== 11) {
                    //     this.MSGALERT({
                    //         status: 'error',
                    //         text: '您输入的手机号码格式不正确'
                    //     });
                    //     this.validate.phone = false;
                    } else {
                        this.validate.phone = true;
                    }
                }
                break;
            case 'code':
                if (!this.code) {
                    // this.MSGALERT({
                    //     status: 'error',
                    //     text: '请输入验证码'
                    // });
                    this.validate.code = false;
                } else {
                    if (this.code.length !== 4) {
                        // this.MSGALERT({
                        //     status: 'error',
                        //     text: '验证码是4位'
                        // });
                        this.validate.code = false;
                    } else {
                        this.validate.code = true;
                    }
                }
                break;
            }
        },
        focusInput (name) {
            switch (name) {
            case 'user' :
                this.validateUser.usertext = null;
                this.validateUser.status = false;
                this.validateUser.isShow = false;
            }
        },
        showEye () { // 查看密码
            this.showPassword = !this.showPassword;
            this.showPassword ? this.$refs.passwordEl.setAttribute('type', 'text') : this.$refs.passwordEl.setAttribute('type', 'password');
            this.showPassword ? this.$refs.passwordConEl.setAttribute('type', 'text') : this.$refs.passwordConEl.setAttribute('type', 'password');
        },
        question () { // 收不到验证码找客服
            window.open('https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1');
        },
        returnPage () {
            this.$router.go(-1);
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     if (from.name) {
    //         tool.setSessionStore('returnPage', from.name);
    //     }
    //     next(vm => {
    //         vm.goBack = from.name;
    //     });
    // },
    computed: {
        ...mapState(['userInfo'])
    },
    created () {},
    components: {
        ScrollComponent,
        ContentWrapper
    },
    mounted () {
        this.partnerId = tool.getSessionStore('partnerId') !== null ? tool.getSessionStore('partnerId') : null;
        this.deviceData = tool.getDeviceNumber();
    },
    destroyed () {
        // this.STATEMENT({
        //     name: 'header',
        //     data: true
        // });
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
    $images: '../../assets';
    .register {
        background: linear-gradient(to bottom, #242424, #000);
        height: 100%;
        overflow: scroll;
        .register-container{
            /*background: linear-gradient(to bottom, #242424, #000);*/
        }
        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            height:1.5333rem;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/header-bg.png') repeat-x;
            background-size: 0.64rem 1.7066rem;
            position: relative;
            /*top: 0;*/
            /*left: 0;*/
            /*width: 100%;*/
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
                background: url('https://xdlftp.xindedom.life/images/mobile_image/register.png') no-repeat;
                width:0.5066rem;
                height: 0.5866rem;
                background-size: 100% 100%;
                background-position: 0 0;
            }
            .text {
                font-size: 0.4rem;
                font-weight: 600;
                color: #ffa200;
                padding-left: 0.15rem;
            }
        }
        .container {
            padding: 0 0.6rem;
            margin-bottom: 1.9rem;
            .secondtitle {
                font-size: 0.4rem;
                font-weight: 600;
                color: #ffa200;
                height:1.4rem;
                line-height: 1.4rem;
            }
            .list {
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
                    }
                    .initial{
                        color: #fff;
                        font-size: 0.4rem;
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
                        right: 0.1rem;
                        top: 50%;
                        transform: translate(0, -50%);
                        font-size: 0.3466rem;
                        color: #ff383c;
                    }
                    .validateactive {
                        color: #3fb838;
                    }
                    .icon-chenggong {
                        color: #3fb838;
                    }
                    .icon-shibai {
                        color: #ff383c;
                    }
                    .showpassword {
                        font-size: 0.5rem;
                        color: #fff;
                        height: 100%;
                        line-height: 1rem;
                    }
                }
                .invalid {
                    background-color: transparent;
                    border: none;
                    display: flex;
                    align-items: center;
                    height: 1rem;
                    .left{
                        display: flex;
                        width: 55%;
                        align-items: center;
                        border: 1px solid #929191;
                        border-radius: 5px;
                        height: 100%;
                        background: #121212;
                        position: relative;
                        .text {
                            font-size: 0.4rem;
                            color: #fff;
                            padding-left: 0.2rem;
                            width: 2.133rem;
                        }
                        input{
                            width: 2.5rem;
                        }
                    }
                    .code {
                        width: 2rem;
                        height: 1rem;
                        line-height:1rem;
                        font-size: 0.3466rem;
                        background:linear-gradient(to bottom, #626062, #262526);
                        border-radius: 5px;
                        text-align: center;
                        color: #fff;
                        margin-left: 0.2rem;
                        font-weight: 600;
                    }
                    .question {
                        color: #fff;
                        font-size: 0.3466rem;
                        margin-left: 0.3rem;
                        height: 1rem;
                        line-height:1rem;
                    }
                    .showpassword {
                        font-size: 0.5rem;
                        color: #fff;
                        height: 100%;
                        line-height: 1rem;
                    }
                }
            }
            .btn {
                font-size: 0.4rem;
                color: #fff;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                margin-top: 0.5rem;
                background: linear-gradient(to bottom, #ed7d00, #c62700);
                border-radius: 4px;
            }
        }
        ::-webkit-input-placeholder {
            color: #383838;
            font-size:0.38rem;
        }
    }
</style>
