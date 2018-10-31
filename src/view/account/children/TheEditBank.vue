<template>
    <content-wrapper class="container" :options="options">
        <common-header>编辑银行卡资料</common-header>
        <scroll-component>
            <div class="bank">
                <ul>
                    <li>
                        <div class="left">收款人</div>
                        <div class="right">
                            <input type="text" v-model="bankName" placeholder="收款人姓名一经绑定不可更改" ref="bankUserName">
                        </div>
                    </li>
                    <li>
                        <div class="left">银行卡号</div>
                        <div class="right">
                            <input type="text" maxlength="19" v-model="bankAccount" placeholder="请输入银行卡号">
                        </div>
                    </li>
                    <li>
                        <div class="left">银行名称</div>
                        <div class="right" @click="showPicker(0)" ref="select0">
                            <span>{{bankSelectName}}</span>
                            <!--<select name="" v-model="bankAccountName">-->
                            <!--<option value="">请选择银行名称</option>-->
                            <!--<option :value="item.fullName" v-for="(item, index) in defaultBank" :key="index"> {{item.fullName}}</option>-->
                            <!--</select>-->
                            <!--<input type="text" v-model="bankAccountName" placeholder="请输入银行名称">-->
                        </div>
                    </li>
                    <li>
                        <div class="left">账户性质</div>
                        <div class="right" @click="showPicker(1)" ref="select1">
                            <span>{{bankSelectType}}</span>
                            <!--<select name="" v-model="bankAccountType">-->
                            <!--<option value="" disabled>请选择账户性质</option>-->
                            <!--<option value="1">信用卡</option>-->
                            <!--<option value="2">借记卡</option>-->
                            <!--</select>-->
                        </div>
                    </li>
                    <li>
                        <div class="left">开户省份</div>
                        <div class="right" @click="showPicker(2)" ref="select2">
                            <span>{{bankSelectProvince}}</span>
                            <!--<select name="" v-model="bankAccountProvince">-->
                            <!--<option value="" disabled>请选择开户省份</option>-->
                            <!--<option :value="item.id" v-for="(item, index) in provinceList" :key="index">{{item.name}}</option>-->
                            <!--</select>-->
                        </div>
                    </li>
                    <li>
                        <div class="left">开户城市</div>
                        <div class="right" @click="showPicker(3)" ref="select3">
                            <span>{{bankSelectCity}}</span>
                            <!--<select name="" v-model="bankAccountCity">-->
                            <!--<option value="" disabled>请选择开户城市</option>-->
                            <!--<option :value="item.id" v-for="(item, index) in cityList" :key="index">{{item.name}}</option>-->
                            <!--</select>-->
                        </div>
                    </li>
                    <li v-if="districtList.length > 0">
                        <div class="left">开户地区</div>
                        <div class="right" @click="showPicker(4)" ref="select4">
                            <span>{{bankSelectDistrict}}</span>
                            <!--<select name="" v-model="bankAccountDistrict">-->
                            <!--<option value="" disabled>请选择开户地区</option>-->
                            <!--<option :value="item.id" v-for="(item, index) in districtList" :key="index">{{item.name}}</option>-->
                            <!--</select>-->
                        </div>
                    </li>
                    <li>
                        <div class="left">开户分行</div>
                        <div class="right">
                            <input type="text" v-model="bankAddress" placeholder="请输入完整的开户分行地址" ref="bankAddress" @focus="focusInput('bankAddress')">
                        </div>
                    </li>
                    <li class="smscode">
                        <div class="left">验证码</div>
                        <div class="right">
                            <input type="text" class="codeinput" placeholder="请输入验证码" v-model="smsCode" ref="smsCode" @focus="focusInput('smsCode')">
                            <span @click="getSms">{{smsValue}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="btn" @click="submit">
                            <span>提交</span>
                        </div>
                    </li>
                </ul>
                <picker @select="handleSelect(0,arguments)" :selected-index="arrIndex" :data="defaultBank" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[0]" ref="picker0"></picker>
                <picker @select="handleSelect(1,arguments)" :selected-index="arrIndex" :data="defaultBankType" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[1]" ref="picker1"></picker>
                <picker @select="handleSelect(2,arguments)" :selected-index="arrIndex" :data="provinceList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[2]" ref="picker2"></picker>
                <picker @select="handleSelect(3,arguments)" :selected-index="arrIndex" :data="cityList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[3]" ref="picker3"></picker>
                <picker @select="handleSelect(4,arguments)" :selected-index="arrIndex" :data="districtList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[4]" ref="picker4"></picker>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
// import {updatePaymentInfo, getCityList, getDistrictList, getProvinceList, getSMSCode, get, getBankTypeList} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {paymentApiRequest} from '@/common/api/payment';
import {mapMutations, mapState} from 'vuex';
import tool from '@/common/tool';
import Picker from '@/components/scroll-component/picker';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
export default {
    name: 'the-edit-bank',
    data () {
        return {
            bankList: null,
            bankName: null,
            bankAccount: null,
            bankAccountName: '',
            bankAccountType: '',
            bankAccountProvince: '',
            bankAccountCity: '',
            bankAccountDistrict: '',
            bankAddress: null,
            smsCode: null,
            provinceList: [],
            cityList: [],
            districtList: [],
            smsPhone: null,
            userName: null,
            defaultBank: [],
            defaultBankType: [[{text: '借记卡', value: 2}, {text: '信用卡', value: 1}]],
            arrIndex: [[0]],
            cancelTxt: '取消',
            confirmTxt: '确定',
            title: ['银行名称', '账户性质', '开户省份', '开户城市', '开户地区', '开户分行'],
            bankSelectName: '请选择银行名称',
            bankSelectType: '请选择账户性质',
            bankSelectProvince: '请选择开户省份',
            bankSelectCity: '请选择开户城市',
            bankSelectDistrict: '请选择开户地区',
            smsValue: '获取验证码',
            timer: null,
            isReceptionSms: true
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        Picker,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    mounted () {
    },
    created () {
        this.init();
    },
    methods: {
        ...mapMutations(['MSGALERT', 'MSGMODAL']),
        submit () {
            // console.log(tool.tirmTransfer(this.bankName));
            if (!/^[\u4E00-\u9FFF]+$/.test(this.bankName)) {
                this.MSGALERT({
                    text: '收款人姓名只能为中文',
                    status: 'error'
                });
                return false;
            }
            if (!this.bankName || !this.bankAccount || !this.bankAccountName || !this.bankAccountType || !this.bankAccountProvince || !this.bankAccountCity || !this.bankAddress) {
                this.MSGALERT({
                    text: '银行卡信息输入不完整',
                    status: 'error'
                });
                return false;
            }
            if (!/^[\u4E00-\u9FFF]+$/.test(this.bankAddress)) {
                this.MSGALERT({
                    text: '开户分行只能为中文',
                    status: 'error'
                });
                return false;
            }
            if (!this.smsCode) {
                this.MSGALERT({
                    text: '请输入验证码',
                    status: 'error'
                });
                return false;
            }
            paymentApiRequest('updatePaymentInfo', {
                service: 'player',
                data: {
                    bankAccountName: this.bankName,
                    bankName: this.bankAccountName.toString(),
                    bankAccount: this.bankAccount,
                    bankAccountType: this.bankAccountType.toString(),
                    bankAccountProvince: this.bankAccountProvince.toString(),
                    bankAccountCity: this.bankAccountCity,
                    bankAccountDistrict: this.bankAccountDistrict,
                    bankAddress: this.bankAddress,
                    smsCode: this.smsCode
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '银行卡绑定成功',
                    status: 'success'
                });
                this.$router.back();
            });
        },
        getSms () {
            if (this.isReceptionSms) {
                apiRequest('sendSMSCodeToPlayer', {
                    service: 'player',
                    data: {
                        purpose: 'updateBankInfo'
                    }
                }).then((res) => {
                    this.smsValue = 60;
                    this.isReceptionSms = false;
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.smsValue--;
                        if (this.smsValue === 0) {
                            this.isReceptionSms = true;
                            this.smsValue = '获取验证码';
                            clearInterval(this.timer);
                        }
                    }, 1000);
                    this.MSGALERT({
                        text: '验证码已发送',
                        status: 'success'
                    });
                }).catch((res) => {
                    this.smsValue = 30;
                    this.isReceptionSms = false;
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.smsValue--;
                        if (this.smsValue === 0) {
                            this.isReceptionSms = true;
                            this.smsValue = '获取验证码';
                            clearInterval(this.timer);
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
        showPicker (index) {
            let picker = this.$refs['picker' + index];
            picker.show();
        },
        handleSelect (index, args) {
            // console.log(index);
            // console.log(args);
            // this.selectedText.splice(index, 1, args[2].join('，'));
            switch (index) {
            case 0:
                this.bankSelectName = args[2][0];
                this.bankAccountName = args[0][0];
                break;
            case 1:
                this.bankSelectType = args[2][0];
                this.bankAccountType = args[0][0];
                break;
            case 2:
                this.bankSelectProvince = args[2][0];
                this.bankAccountProvince = args[0][0];
                break;
            case 3:
                this.bankSelectCity = args[2][0];
                this.bankAccountCity = args[0][0];
                break;
            case 4:
                this.bankSelectDistrict = args[2][0];
                this.bankAccountDistrict = args[0][0];
                break;
            }
        },
        init () {
            paymentApiRequest('getBankTypeList', {
                service: 'payment',
                data: {}
            }).then((res) => {
                let bankList = [];
                res.data.forEach((val, index, arr) => {
                    // console.log(val);
                    val.text = val.name;
                    val.value = val.bankTypeId;
                    bankList.push(val);
                });
                // console.log(res);
                this.defaultBank.push(bankList);
            });
            apiRequest('get', {
                service: 'player',
                data: {
                    _isLoading: true
                }
            }).then((res) => {
                if (res.data.realName) {
                    this.bankName = res.data.realName;
                    this.$refs.bankUserName.setAttribute('disabled', 'disabled');
                    // this.bankAccount = res.data.bankAccount;
                }
                this.smsPhone = res.data.fullPhoneNumber;
                // console.log(this.smsPhone);
                this.userName = res.data.name;
            });
            let province = tool.getLocalStore('province'); // get china province
            if (province) {
                let arrProvince = [];
                province.forEach((val, index, arr) => {
                    val.text = val.name;
                    val.value = val.id;
                    arrProvince.push(val);
                });
                this.provinceList.push(arrProvince);
            } else {
                paymentApiRequest('getProvinceList', {
                    service: 'payment',
                    data: {}
                }).then((res) => {
                    tool.setLocalStore('province', res.data);
                    let arrProvince = [];
                    res.data.forEach((val, index, arr) => {
                        val.text = val.name;
                        val.value = val.id;
                        arrProvince.push(val);
                    });
                    this.provinceList.push(arrProvince);
                });
            }
        },
        focusInput (node) {
            switch (node) {
            case 'bankAddress':
                this.$refs.bankAddress.scrollIntoView({behavior: 'auto', block: 'start'});
                break;
            case 'smsCode':
                this.$refs.smsCode.scrollIntoView({behavior: 'auto', block: 'start'});
                break;
            default:
            }
        }
    },
    watch: {
        bankAccountProvince () {
            this.cityList = [];
            this.bankAccountCity = '';
            paymentApiRequest('getCityList', {
                service: 'payment',
                data: {
                    provinceId: this.bankAccountProvince
                }
            }).then((res) => {
                console.log(res);
                let arrCity = [];
                res.data.forEach((val, index, arr) => {
                    val.text = val.name;
                    val.value = val.id;
                    arrCity.push(val);
                });
                this.cityList.push(arrCity);
            });
        },
        bankAccountCity () {
            this.districtList = [];
            this.bankAccountDistrict = '';
            paymentApiRequest('getDistrictList', {
                service: 'payment',
                data: {
                    provinceId: this.bankAccountProvince,
                    cityId: this.bankAccountCity
                }
            }).then((res) => {
                if (res.data.length > 0) {
                    let arrDistrict = [];
                    res.data.forEach((val, index, arr) => {
                        val.text = val.name;
                        val.value = val.id;
                        arrDistrict.push(val);
                    });
                    this.districtList.push(arrDistrict);
                }
                // console.log(this.districtList);
            });
        }
    },
    destroyed () {
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.bank {
    padding-top:1.54rem;
    background: #000;
    ul{
        border: 1px solid #fea100;
        margin: 0.1rem 0.2rem;
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
                overflow: hidden;
                input{
                    outline: none;
                    background: transparent;
                    font-size: 0.4rem;
                    color: #ffa200;
                    border: none;
                    padding-left: 0.2rem;
                    width: 100%;
                }
                select{
                    outline: none;
                    border: none;
                    background: none;
                    color: #ffa200;
                    font-size: 0.4rem;
                    width: 100%;
                }
                span{
                    color: #ffa200;
                    font-size: 0.4rem;
                    width: 100%;
                    padding-left: 0.2rem;
                }
            }
            .btn {
                margin: 0.2rem auto 0;
                width: 50%;
                height:0.8rem;
                background: linear-gradient(to bottom, #ee7e00, #c72700);
                font-size: 0.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                border-radius: 5px;
            }
        }
        .smscode {
            .right{
                border: none;
                height: 0.75rem;
                background: none;
                display: flex;
                align-items: center;
                padding-right: 0.06rem;
                input{
                    outline: none;
                    background:linear-gradient(to bottom, #0b0b0b, #161616);
                    font-size: 0.4rem;
                    color: #ffa200;
                    border: 1px solid #fff;
                    padding-left: 0.2rem;
                    height: 0.6666rem;
                    width: 40%;
                    border-radius: 5px;
                }
                span{
                    font-size: 0.32rem;
                    color: #fff;
                    height: 0.7rem;
                    width: 2rem;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to bottom, #ee7e00, #c72700);
                    margin-left: 0.2rem;
                    padding: 0;
                }
            }
        }
    }
}
</style>
