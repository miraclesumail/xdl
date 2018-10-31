<template>
    <content-wrapper class="container" :options="options">
        <common-header>编辑联系方式</common-header>
        <scroll-component>
            <div class="edit">
                <p class="title">修改个人资料</p>
                <ul>
                    <li>
                        <div class="left">会员账号</div>
                        <div class="right">
                            <input type="text" disabled v-model="userName">
                        </div>
                    </li>
                    <li>
                        <div class="left">真实姓名</div>
                        <div class="right">
                            <input type="text" v-model="realName" disabled>
                        </div>
                    </li>
                    <li>
                        <div class="left">微信号码</div>
                        <div class="right">
                            <input type="text" v-model="weChat" ref="weChat" placeholder="微信绑定后不能修改">
                        </div>
                    </li>
                    <li>
                        <div class="left">QQ/邮箱</div>
                        <div class="right">
                            <input type="text" v-model="qq" ref="qq" placeholder="QQ绑定后不能修改">
                        </div>
                    </li>
                    <li>
                        <div class="btn" @click="submit">
                            <span>提交</span>
                        </div>
                    </li>
                </ul>
                <p class="title">修改手机号码</p>
                <ul>
                    <li>
                        <div class="left">旧手机号码</div>
                        <div class="right">
                            <input type="text" v-model="editOldPhoneNumber" maxlength="11" placeholder="请输入旧的手机号码">
                        </div>
                    </li>
                    <li>
                        <div class="left">新手机号码</div>
                        <div class="right">
                            <input type="text" v-model="editNewPhoneNumber" maxlength="11" placeholder="请输入新的手机号码">
                        </div>
                    </li>
                    <li>
                        <div class="left">手机验证码</div>
                        <div class="right smscode">
                            <input class="" type="text" maxlength="4" placeholder="请输入验证码" v-model="phoneCode">
                            <span @click="getSms">{{smsValue}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="btn" @click="changePhone">
                            <span>提交</span>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import AccountHeader from './AccountHeader';
// import tool from '@/common/tool';
// import {get, updatePlayerWeChat, updatePlayerQQ, updatePhoneNumberWithSMS, getSMSCode} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
import {mapMutations} from 'vuex';
export default {
    name: 'the-edit-contact',
    data () {
        return {
            userName: '*****',
            realName: '*****',
            phoneNumber: '',
            editOldPhoneNumber: '',
            editNewPhoneNumber: '',
            isChangePhone: null,
            weChat: '待完善',
            qq: '待完善',
            birthday: '1970-08-26',
            smsValue: '获取验证码',
            timer: null,
            isShowSMS: false,
            phoneCode: null,
            isFirst: {
                qq: true,
                weChat: true
            },
            isReceptionSms: true,
            options: {
                top: 1.533,
                bottom: 1.7333
            }
        };
    },
    components: {
        // AccountHeader
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        submit () {
            if (!this.weChat && this.isFirst.weChat) {
                this.MSGALERT({
                    text: '微信号码不能为空',
                    status: 'error'
                });
                return false;
            } else if (/^[\u4e00-\u9fa5]{0,}$/.test(this.weChat) && this.isFirst.weChat) {
                this.MSGALERT({
                    text: '微信号码格式不正确',
                    status: 'error'
                });
                return false;
            }
            if (!this.qq && this.isFirst.qq) {
                this.MSGALERT({
                    text: 'qq号码不能为空',
                    status: 'error'
                });
                return false;
            } else if (!/^[0-9]*$/.test(this.qq) && this.isFirst.weChat) {
                this.MSGALERT({
                    text: 'qq号码格式不正确',
                    status: 'error'
                });
                return false;
            }
            if (this.qq && this.isFirst.qq) {
                apiRequest('updatePlayerQQ', {
                    service: 'player',
                    data: {
                        qq: this.qq
                    }
                }).then((res) => {
                    setTimeout(() => {
                        this.MSGALERT({
                            text: 'qq绑定已提交审核',
                            status: 'success'
                        });
                    }, 1000);
                });
            }
            if (this.weChat && this.isFirst.weChat) {
                apiRequest('updatePlayerWeChat', {
                    service: 'player',
                    data: {
                        wechat: this.weChat
                    }
                }).then((res) => {
                    this.MSGALERT({
                        text: '微信绑定已提交审核',
                        status: 'success'
                    });
                });
            }
            this.$router.back();
        },
        getSms () {
            if (this.isReceptionSms) {
                if (!this.editNewPhoneNumber || !this.editOldPhoneNumber) {
                    this.MSGALERT({
                        text: '请输入完整信息',
                        status: 'error'
                    });
                    return false;
                } else if (!/^[0-9]*$/.test(this.editNewPhoneNumber || this.editOldPhoneNumber)) {
                    this.MSGALERT({
                        text: '电话号码格式不正确',
                        status: 'error'
                    });
                    return false;
                }
                apiRequest('getSMSCode', {
                    service: 'player',
                    data: {
                        phoneNumber: this.editNewPhoneNumber,
                        oldPhoneNumber: this.editOldPhoneNumber,
                        purpose: 'newPhoneNumber'
                    }
                }).then((res) => {
                    this.MSGALERT({
                        text: '验证码已发送',
                        status: 'success'
                    });
                    this.smsValue = 60;
                    this.isReceptionSms = false;
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.smsValue--;
                        if (this.smsValue === 0) {
                            this.isReceptionSms = true;
                            clearInterval(this.timer);
                            this.smsValue = '获取验证码';
                        }
                    }, 1000);
                }).catch((res) => {
                    this.smsValue = 30;
                    clearInterval(this.timer);
                    this.isReceptionSms = false;
                    this.timer = setInterval(() => {
                        this.smsValue--;
                        if (this.smsValue === 0) {
                            this.isReceptionSms = true;
                            clearInterval(this.timer);
                            this.smsValue = '获取验证码';
                        }
                    }, 1000);
                });
            } else {
                this.MSGALERT({
                    text: '验证码已发送，请稍后再试',
                    status: 'success'
                });
            }
        },
        changePhone () {
            if (!this.editNewPhoneNumber || !this.editOldPhoneNumber) {
                this.MSGALERT({
                    text: '请输入完整信息',
                    status: 'error'
                });
                return false;
            } else if (!/^[0-9]*$/.test(this.editNewPhoneNumber || this.editOldPhoneNumber)) {
                this.MSGALERT({
                    text: '电话号码格式不正确',
                    status: 'error'
                });
                return false;
            }
            apiRequest('updatePhoneNumberWithSMS', {
                service: 'player',
                data: {
                    // newPhoneNumber: this.editNewPhoneNumber,
                    smsCode: this.phoneCode
                }
            }).then((res) => {
                setTimeout(() => {
                    this.MSGALERT({
                        text: '手机号修改成功',
                        status: 'success'
                    });
                }, 1500);
            });
        },
        init () {
            apiRequest('get', {
                service: 'player',
                data: {}
            }).then((res) => {
                this.userName = res.data.name;
                this.phoneNumber = res.data.phoneNumber;
                this.isChangePhone = res.data.phoneNumber;
                this.qq = res.data.qq;
                this.weChat = res.data.wechat;
                this.realName = res.data.bankAccountName ? res.data.bankAccountName : '待完善';
                if (this.qq) {
                    this.$refs.qq.setAttribute('disabled', 'disabled');
                    this.isFirst.qq = false;
                }
                if (this.weChat) {
                    this.$refs.weChat.setAttribute('disabled', 'disabled');
                    this.isFirst.weChat = false;
                }
                // this.birthday = res.data
            });
        }
    },
    created () {
        this.init();
        // console.log(this.$route.params);
    },
    destroyed () {
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.edit {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    overflow: scroll;
    height: 18rem;
    .title{
        font-size: 0.466rem;
        color: #ffffff;
        text-align: center;
    }
    ul{
        border: 1px solid #fea100;
        margin: 0.1rem 0.2rem 0.5rem;
        padding: 0.46666rem;
        background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat;
        background-size:0.58666rem 1.0666rem;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.4rem;
            .left{
                font-size: 0.4rem;
                color: #fff;
                font-weight: 600;
            }
            .right{
                height:0.6666rem;
                border: 1px solid #fff;
                width: 6.5066rem;
                background:linear-gradient(to bottom, #0b0b0b, #161616);
                border-radius: 5px;
                display: flex;
                align-items: center;
                input{
                    outline: none;
                    background: transparent;
                    font-size: 0.4rem;
                    color: #ffa200;
                    border: none;
                    padding-left: 0.2rem;
                }
            }
            .smscode{
                border: none;
                background: none;
                input {
                    border: 1px solid #fff;
                    height:0.6666rem;
                    border-radius: 5px;
                    width: 3rem;
                    background:linear-gradient(to bottom, #0b0b0b, #161616);
                }
                span{
                    /*margin: 0.2rem auto 0;*/
                    margin-left: 0.4rem;
                    width: 2rem;
                    height:0.7rem;
                    background: linear-gradient(to bottom, #ee7e00, #c72700);
                    font-size: 0.3466rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    border-radius: 5px;
                }
            }
            .btn {
                margin: 0.2rem auto 0;
                width: 50%;
                height:0.9rem;
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
