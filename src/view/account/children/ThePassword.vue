<template>
    <content-wrapper class="container" :options="options">
        <common-header>修改密码</common-header>
        <scroll-component>
            <div class="password">
                <ul>
                    <li>
                        <div class="left">旧密码</div>
                        <div class="right">
                            <input type="text" placeholder="请输入您的旧密码" v-model="oldPassword" ref="passwordOldEl">
                            <span class="showpassword iconfont" :class="showOldPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showOldEye"></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">新密码</div>
                        <div class="right">
                            <input type="text" placeholder="请输入您的新密码" v-model="newPassword" ref="passwordNewEl">
                            <span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>
                        </div>
                    </li>
                    <li>
                        <div class="left">确认新密码</div>
                        <div class="right">
                            <input type="text" placeholder="请再次输入您的新密码" v-model="confirmPassword" ref="passwordEl">
                            <span class="showpassword iconfont" :class="showPassword? 'icon-yanjing-zheng': 'icon-yanjing-bi'" @click="showEye"></span>
                        </div>
                    </li>
                    <!--<li>-->
                    <!--<div class="left code">验证码</div>-->
                    <!--<div class="right coderight">-->
                    <!--<input type="number" class="codeinput" placeholder="请输入手机验证码" v-model="code">-->
                    <!--<div class="codebtn" @click="getCode">获取验证码</div>-->
                    <!--</div>-->
                    <!--</li>-->
                    <li>
                        <div class="btn" @click="apply">
                            <span>提交</span>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {updatePassword, getSMSCode} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapState, mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
export default {
    name: 'the-password',
    data () {
        return {
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
            code: null,
            showOldPassword: true,
            showPassword: true,
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    computed: {
        ...mapState(['userInfo', 'msgAlert'])
    },
    components: {
        // ToggleButton
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        ...mapMutations(['MSGALERT', 'MSGMODAL']),
        apply () {
            if (this.msgAlert.length) return
            if (!this.oldPassword) {
                this.MSGALERT({
                    text: '旧密码不能为空',
                    status: 'error'
                });
                return false;
            }
            if (!this.newPassword) {
                this.MSGALERT({
                    text: '新密码不能为空',
                    status: 'error'
                });
                return false;
            }
            if (!this.confirmPassword) {
                this.MSGALERT({
                    text: '确认新密码不能为空',
                    status: 'error'
                });
                return false;
            }
            // if (!this.code) {
            //     this.MSGALERT({
            //         text: '验证码不能为空',
            //         status: 'error'
            //     });
            //     return false;
            // }
            if (this.confirmPassword !== this.newPassword) {
                this.MSGALERT({
                    text: '新密码和确认新密码不一致',
                    status: 'error'
                });
                return false;
            }
            apiRequest('updatePassword', {
                service: 'player',
                data: {
                    playerId: this.userInfo.playerId,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }
            }).then((res) => {
                this.MSGMODAL({
                    text: '密码修改成功，请牢记您的密码',
                    status: true,
                    confirmFn: () => {
                        this.$router.push({name: 'account'});
                    },
                    cancelFn: () => {
                        this.$router.push({name: 'account'});
                    }
                });
            });
        },
        showOldEye () {
            this.showOldPassword = !this.showOldPassword;
            this.showOldPassword ? this.$refs.passwordOldEl.setAttribute('type', 'text') : this.$refs.passwordOldEl.setAttribute('type', 'password');
        },
        showEye () {
            this.showPassword = !this.showPassword;
            this.showPassword ? this.$refs.passwordNewEl.setAttribute('type', 'text') : this.$refs.passwordNewEl.setAttribute('type', 'password');
            this.showPassword ? this.$refs.passwordEl.setAttribute('type', 'text') : this.$refs.passwordEl.setAttribute('type', 'password');
        },
        getCode () {
            apiRequest('getSMSCode', {
                service: 'player',
                data: {
                    purpose: 'updatePassword',
                    phoneNumber: this.userInfo.data.fullPhoneNumber,
                    name: this.userInfo.data.name
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '验证码已经发送',
                    status: 'success'
                });
            });
        }
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .password {
        padding-top: 0.1rem;
        margin: 0 0.2rem;
        ul {
            margin-top: 0.1rem;
            border: 1px solid #fea100;
            padding: 0.46666rem;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat;
            background-size: 0.58666rem 1.0666rem;
            height: 6rem;
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.4rem;
                .left {
                    font-size: 0.4rem;
                    color: #fff;
                    font-weight: 600;
                }
                .right {
                    height: 0.8rem;
                    border: 1px solid #fff;
                    width: 6.5066rem;
                    background: linear-gradient(to bottom, #0b0b0b, #161616);
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    input {
                        outline: none;
                        background: transparent;
                        font-size: 0.4rem;
                        color: #fff;
                        border: none;
                        padding-left: 0.2rem;
                    }
                    .showpassword {
                        position: absolute;
                        color: #fff;
                        right: 0.1rem;
                    }
                }
                .coderight {
                    border: none;
                    display: flex;
                    align-items: center;
                    background: none;
                    padding-right:0.08rem;
                    .codeinput {
                        width: 3.5rem;
                        height: 0.8rem;
                        border: 1px solid #fff;
                        border-radius: 5px;
                        background: linear-gradient(to bottom, #0b0b0b, #161616);
                    }
                    .codebtn {
                        font-size: 0.3466rem;
                        color: #fff;
                        margin-left: 0.2rem;
                        height: 0.8rem;
                        line-height: 0.8rem;
                        /*border: 1px solid #fff;*/
                        padding: 0rem 0.2rem;
                        border-radius: 5px;
                        background: linear-gradient(to bottom, #706e70, #4a494a, #232223);
                    }
                }
                .btn {
                    margin: 0.7rem auto 0;
                    width: 70%;
                    height: 1rem;
                    background: linear-gradient(to bottom, #ee7e00, #c72700);
                    font-size: 0.4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    border-radius: 5px;
                }
            }
        }
    }
</style>
