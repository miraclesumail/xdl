<template>
    <content-wrapper class="login" :options="options">
        <div class="logo">
            <span class="icon"></span>
            <span class="arrow" @click="returnPage"><i></i>返回</span>
        </div>
        <scroll-component>
            <div class="title">
                <span class="icon"></span>
                <span class="text">登录</span>
            </div>
            <div class="container">
                <ul class="list">
                    <li>
                        <div class="username inputstyle">
                            <span class="text">用户名</span>
                            <input type="text" placeholder="请输入您的用户名(4-10位)" v-model="username" @blur="validateDate('username')" @focus="focusInput('name')" @change="changeInput('name')" @keydown="keyInput('name')" @keyup.enter="login" ref="username">
                            <!--<span class="validate" v-show="validate.name"><i class="iconfont" :class="validate.name?'icon-chenggong':'icon-shibai'"></i>1111</span>-->
                        </div>
                    </li>
                    <li>
                        <div class="password inputstyle">
                            <span class="text">密码</span>
                            <input type="password" placeholder="请输入您的密码" v-model="password" @blur="validateDate('password')" ref="passwordEl" @focus="focusInput('password')" @keyup.enter="login">
                            <!--<span class="validate" v-show="validate.password">1111</span>-->
                            <span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>
                        </div>
                    </li>
                    <li>
                        <div class="invalid inputstyle">
                            <div class="left">
                                <span class="text">验证码</span>
                                <input type="text" placeholder="请输入验证码" v-model="code" @blur="validateDate('code')" @focus="focusInput('code')" @keyup.enter="login">
                                <!--<span class="validate" v-show="validate.code"><i class="iconfont" :class="validate.code?'icon-chenggong':'icon-shibai'"></i>1111</span>-->
                            </div>
                            <div class="code" @click="changeCode">
                                <img :src="codeUrl" alt="">
                            </div>
                        </div>

                    </li>
                </ul>
                <div class="btn">
                    <div class="loginbtn btnstyle" @click="login" >登入</div>
                    <div class="forgotbtn btnstyle" @click="forgot">忘记密码</div>
                    <div class="registerbtn btnstyle" @click="register">注册</div>
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import tool from '@/common/tool';
import {mapMutations, mapState} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper.vue';
export default {
    name: 'the-login',
    data () {
        return {
            username: null,
            password: null,
            code: null,
            isCode: 0,
            isShowCode: false,
            codeUrl: null,
            showPassword: false,
            goBack: null,
            validate: {
                name: true,
                password: false,
                code: false
            },
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
    components: {
        ScrollComponent,
        ContentWrapper
    },
    computed: {
        ...mapState(['loginDate'])
    },
    mounted () {
        // this.STATEMENT({
        //     name: 'header',
        //     data: false
        // });
        this.changeCode();
        this.$nextTick(() => {
            if (this.loginDate.isCode >= 3) {
                this.isShowCode = true;
                this.changeCode();
            }
        });
        this.deviceData = tool.getDeviceNumber();
        // window.addEventListener('resize', () => {
        //     this.$nextTick(() => {
        //         document.querySelector('input').scrollIntoView(true);
        //         console.log(document.querySelector('input'));
        //     });
        // });
    },
    created () {

    },
    methods: {
        ...mapMutations(['MSGALERT', 'STATEMENT']),
        login () {
            // TODO 现在是基础验证,后期会加入更多验证
            if (this.username) {
                if (this.username.length > 1) {
                } else {
                    this.MSGALERT({
                        text: '账号是5-14位',
                        status: 'error'
                    });
                    return;
                }
            } else {
                this.MSGALERT({
                    text: '请输入账号5-14位)',
                    status: 'error'
                });
                return;
            }
            if (!this.password) {
                this.MSGALERT({
                    text: '请输入密码',
                    status: 'error'
                });
                return;
            }
            if (!this.code) {
                this.MSGALERT({
                    text: '请输入验证码',
                    status: 'error'
                });
                return;
            }
            if (this.code.length !== 4) {
                this.MSGALERT({
                    text: '验证码必须是4位',
                    status: 'error'
                });
                return;
            }
            /* if (this.isShowCode) {} */
            apiRequest('login', {
                service: 'player',
                data: {
                    name: this.username,
                    password: this.password,
                    captcha: this.code,
                    _isLoading: false,
                    _isModal: true,
                    clientDomain: location.hostname,
                    deviceId: this.deviceData.id
                }
            }).then((res) => {
                if (res.status === 200) {
                    this.STATEMENT({ // 存储用户数据
                        name: 'userInfo',
                        data: {
                            data: res.data,
                            token: res.token,
                            playerId: res.data.playerId
                        }
                    });
                    tool.setSessionStore('userInfo', {
                        data: res.data,
                        token: res.token,
                        playerId: res.data.playerId
                    });
                    apiRequest('addClientSourceLog', {
                        service: 'player',
                        data: {
                            sourceUrl: location.hostname,
                            playerName: res.data.name,
                            clientType: 'h5',
                            accessType: 'login'
                        }
                    });
                    this.$router.replace({name: 'home'});
                    this.MSGALERT({
                        status: 'success',
                        text: '登录成功'
                    });
                }
            }).catch((res) => {
                this.changeCode();
                if (res.status === 430) {
                    this.MSGALERT({
                        status: 'error',
                        text: '用户没有发现'
                    });
                } else if (res.status === 401) {
                    this.MSGALERT({
                        status: 'error',
                        text: '密码输入有误'
                    });
                } else if (res.status === 432) {
                    this.MSGALERT({
                        status: 'error',
                        text: '用户名输入有误'
                    });
                } else {
                    this.MSGALERT({
                        status: 'error',
                        text: res.errorMessage
                    });
                }
                // this.isCode++;
                // this.STATEMENT({
                //     name: 'loginDate',
                //     type: 'isCode',
                //     data: this.isCode
                // });
                // if (this.loginDate.isCode > 3) {
                //     this.isShowCode = true;
                //     this.changeCode();
                // }
            });
        },
        forgot () {
            window.open('https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1');
        },
        register () {
            this.$router.push({name: 'register'});
        },
        showEye () { // 查看密码
            this.showPassword = !this.showPassword;
            this.showPassword ? this.$refs.passwordEl.setAttribute('type', 'text') : this.$refs.passwordEl.setAttribute('type', 'password');
        },
        changeCode () { // 改变验证码
            apiRequest('captcha', {
                service: 'player',
                data: {
                    _isLoading: true,
                    _isModal: true
                }
            }).then((res) => {
                this.codeUrl = tool.baseString(res.data.data);
            });
        },
        changeInput (name) {
            // console.log(name);
            // console.log(event);
        },
        keyInput (name) {

        },
        focusInput (name) {
            // TODO 修复软键盘弹出遮挡的问题
            switch (name) {
            case 'name' :
                break;
            case 'password' :
                break;
            case 'code' :
                break;
            }
        },
        /* 验证输入问题 */
        validateDate (name) {
            // TODO 各种验证的问题,必须要做的
            switch (name) {
            case 'username':
                // if (this.username) {
                //     if (this.username.length > 1) {
                //         console.log(true);
                //     } else {
                //         console.log(false);
                //     }
                // } else {
                //     this.MSGALERT({
                //         text: '请输入您的账号',
                //         status: 'error'
                //     });
                // }
                break;
            case 'password':
                // if (this.password) {
                // } else {
                //     this.MSGALERT({
                //         text: '请输入您的密码',
                //         status: 'error'
                //     });
                // }
                break;
            case 'code':
                // if (this.isCode) {
                //     if (this.code) {
                //     } else {
                //         this.MSGALERT({
                //             text: '请输入验证码',
                //             status: 'error'
                //         });
                //     }
                // }
                break;
            }
        },
        returnPage () {
            this.$router.go(-1);
        }
    }
    // beforeRouteEnter (to, from, next) {
    //     // console.log(from);
    //     if (from.name) {
    //         tool.setSessionStore('returnPage', from.name);
    //     }
    //     next(vm => {
    //         vm.goBack = from.name;
    //     });
    // }
    // beforeDestroy () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: true
    //     });
    // }
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
        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/header-bg.png') repeat-x;
        background-size: 0.64rem 1.7066rem;
        position: relative;
        z-index: 10;
        .icon{
            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/logo.png');
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
                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/left-arrow.png') no-repeat;
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
            background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/login.png') no-repeat;
            width:0.5066rem;
            height: 0.5866rem;
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
                    .text {

                    }
                    input{
                        width: 3rem;
                    }
                }
                .code{
                    width: 3rem;
                    height:100%;
                    margin-left: 0.2rem;
                    overflow: hidden;
                    img{
                        border: none;
                        outline: none;
                        vertical-align:top;
                        width: 100%;
                        height: 100%;
                        line-height: 0.7rem;
                        color: #fff;
                        font-size: 0.3466rem;
                    }
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
