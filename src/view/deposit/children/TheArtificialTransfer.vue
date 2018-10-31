<template>
    <div class="artificial">
        <div class="top">
            <div class="list">
                <div class="left">
                    存款方式
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(0)" ref="select0">{{depositTypeName}}</span>
                    <!--<select name="" v-model="deposit">-->
                        <!--<option value="" disabled>请选择存款方式</option>-->
                        <!--<option :value="item.depositMethod" v-for="(item, index) in canUseMethods" :key="index">{{depositMethodArr[item.depositMethod - 1].name}}</option>-->
                        <!--&lt;!&ndash;<option value="1">网银转账</option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<option value="2">ATM</option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<option value="3">柜台存款</option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<option :value=""></option>&ndash;&gt;-->
                    <!--</select>-->
                </div>
            </div>
            <div class="list">
                <div class="left">
                    收款银行
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(1)" ref="select1">{{bankName}}</span>
                    <!--<select name="" v-model="bank">-->
                        <!--<option value="" disabled>请选择收款银行</option>-->
                        <!--<option :value="item.id" v-for="(item, index) in bankList" :key="index">-->
                            <!--{{item.name}}-->
                        <!--</option>-->
                    <!--</select>-->
                </div>
            </div>
            <div class="list">
                <div class="left">
                    得利宝石
                </div>
                <div class="right">
                    <div class="deligem">
                        <!--<input type="number" v-model="inputGem"-->
                               <!--:placeholder="promoCodeList.length ? promoCodeList.length + '个宝石未使用' : '没有可使用的宝石'">-->
                        <select name="" id="" class="deliselect" v-model="selectGem">
                            <option value="" disabled>
                                {{promoCodeList.length ? promoCodeList.length + '个宝石未使用' : '没有可使用的宝石'}}
                            </option>
                            <option :value="item.bonusCode" v-for="(item, index) in promoCodeList" :key="index">
                                {{item.bonusCode}}
                            </option>
                        </select>
                    </div>
                    <span class="gemurl" @click="opengem"></span>
                </div>
            </div>
            <!--ATM-->
            <div class="list" v-if="depositSelect === 2">
                <div class="left">
                    省份
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(2)" ref="select2">{{provinceName}}</span>
                    <!--<select name="" v-model="province">-->
                        <!--<option value="" disabled>请选择省份</option>-->
                        <!--<option :value="item.id" v-for="(item, index) in provinceList" :key="index">{{item.name}}-->
                        <!--</option>-->
                    <!--</select>-->
                </div>
            </div>
            <div class="list" v-if="depositSelect === 2">
                <div class="left">
                    城市
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(3)" ref="select3">{{cityName}}</span>
                    <!--<select name="" v-model="city">-->
                        <!--<option value="" disabled>请选择城市</option>-->
                        <!--<option :value="item.id" v-for="(item, index) in cityList" :key="index">-->
                            <!--{{item.name}}-->
                        <!--</option>-->
                    <!--</select>-->
                </div>
            </div>
            <div class="list" v-if="districtList.length !== 0 && depositSelect === 2">
                <div class="left">
                    地区
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(4)" ref="select4">{{districtName}}</span>
                    <!--<select name="" v-model="district">-->
                        <!--<option value="" disabled>请选择地区</option>-->
                        <!--<option :value="item.id" v-for="(item, index) in districtList" :key="index">-->
                            <!--{{item.name}}-->
                        <!--</option>-->
                    <!--</select>-->
                </div>
            </div>
            <!--网银转账-->
            <div class="list" v-if="depositSelect === 1">
                <div class="left">
                    付款人姓名
                </div>
                <div class="right">
                    <input type="text" v-model="onlineName" placeholder="请输入真实姓名">
                </div>
            </div>
            <!--柜台转账-->
            <div class="list" v-if="depositSelect === 3">
                <div class="left">
                    转账方式
                </div>
                <div class="right">
                    <span class="text" @click="showPicker(5)" ref="select5">{{transferName}}</span>
                    <!--<select name="" v-model="city">-->
                    <!--<option value="" disabled>请选择城市</option>-->
                    <!--<option :value="item.id" v-for="(item, index) in cityList" :key="index">-->
                    <!--{{item.name}}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>
            </div>
            <!--柜台对应的选择方式-->
            <div class="list" v-if="counterSelect === 1">
                <div class="left">
                    银行卡姓名
                </div>
                <div class="right">
                    <input type="text" v-model="counterTransferName" placeholder="请输入银行卡姓名">
                </div>
            </div>
            <div class="list" v-if="counterSelect === 2">
                <div class="left">
                    转账编号
                </div>
                <div class="right">
                    <input type="text" v-model="transferNumber" disabled>
                </div>
            </div>
            <p class="list countertip" v-if="counterSelect === 2">
                请将上述转账编号告知银行柜台,并请他填写备注。
            </p>
            <div class="list">
                <div class="left">
                    存款金额
                </div>
                <div class="right">
                    <input type="text" v-model="money" placeholder="请输入存款金额">
                </div>
            </div>
            <div class="btn">
                <div class="right" @click="apply">
                    提交
                </div>
            </div>
            <p class="paytip_cs" v-if="!showTip">
                <span>温馨提示：若您的存款10分钟内未到账，请及时联系客服（24小时）。</span>
            </p>
        </div>
        <div class="bottom">
            <p class="title">
                温馨提醒：为了方便您的存款更加快速到帐，请详细阅读以下存款步骤喔！
            </p>
            <ul>
                <li>
                    <div class="number">
                        <span>
                            1
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            提交存款订单
                        </p>
                        <div class="img">
                            <span class="order"></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="number">
                        <span>
                            2
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            获得充值信息
                        </p>
                        <div class="img">
                            <span class="info"></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="number">
                        <span>
                            3
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            充值指定银行
                        </p>
                        <div class="img">
                            <span class="bank"></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="number">
                        <span>
                            4
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            银行扣款成功
                        </p>
                        <div class="img">
                            <span class="charge"></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="number">
                        <span>
                            5
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            款项立即到账
                        </p>
                        <div class="img">
                            <span class="toaccount"></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="number">
                        <span>
                            6
                        </span>
                    </div>
                    <div class="step">
                        <p class="text">
                            进入游戏盈利
                        </p>
                        <div class="img">
                            <span class="earn"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <picker @select="handleSelect(0,arguments)" :selected-index="arrIndex" :data="canUseMethods" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[0]" ref="picker0"></picker>
        <picker @select="handleSelect(1,arguments)" :selected-index="arrIndex" :data="bankList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[1]" ref="picker1"></picker>
        <picker @select="handleSelect(2,arguments)" :selected-index="arrIndex" :data="provinceList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[2]" ref="picker2"></picker>
        <picker @select="handleSelect(3,arguments)" :selected-index="arrIndex" :data="cityList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[3]" ref="picker3"></picker>
        <picker @select="handleSelect(4,arguments)" :selected-index="arrIndex" :data="districtList" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[4]" ref="picker4"></picker>
        <picker @select="handleSelect(5,arguments)" :selected-index="arrIndex" :data="transferMethods" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt" :title="title[5]" ref="picker5"></picker>
    </div>
</template>
<script>
// import {
//     // getBankTypeList,
//     getCityList,
//     getDistrictList,
//     getProvinceList,
//     getManualTopupRequestList,
//     requestManualTopup,
//     // cancelManualTopupRequest,
//     requestBankTypeByUserName
// } from '@/common/api';
import {mapMutations, mapState} from 'vuex';
import {paymentApiRequest} from '@/common/api/payment';
import tool from '@/common/tool';
import Picker from '@/components/scroll-component/picker';
export default {
    name: 'the-artificial-transfer',
    data () {
        return {
            deposit: '',
            bank: '',
            selectGem: '',
            province: '',
            city: '',
            district: '',
            money: '',
            transfer: '',
            provinceList: [],
            cityList: [],
            districtList: [],
            transferMethods: [[
                {
                    text: '银行卡',
                    value: 1
                },
                {
                    text: '现金',
                    value: 2
                }
            ]],
            transferNumber: null,
            bankList: [],
            // inputGem: null,
            promoCodeList: [],
            orderDetail: null,
            timer: null,
            countDown: {
                seconds: 'xxx',
                minutes: 'xxx'
            },
            depositStatus: [
                {
                    name: '待审批',
                    status: 'Pending'
                },
                {
                    name: '审批通过',
                    status: 'Approved'
                },
                {
                    name: '审批拒绝',
                    status: 'Rejected'
                },
                {
                    name: '提案成功',
                    status: 'Success'
                },
                {
                    name: '提案失败',
                    status: 'Fail'
                },
                {
                    name: '系统异常',
                    status: 'PrePending'
                },
                {
                    name: '取消',
                    status: 'Cancel'
                },
                {
                    name: '处理中',
                    status: 'Processing'
                }
            ],
            canUseBankList: null,
            canUseMethods: [],
            depositMethodArr: [[
                {
                    value: 1,
                    text: '网银转账'
                },
                {
                    value: 2,
                    text: 'ATM'
                },
                {
                    value: 3,
                    text: '柜台存款'
                },
                {
                    value: 4,
                    text: '支付宝转银行'
                },
                {
                    value: 5,
                    name: '微信转银行'
                }
            ]],
            arrIndex: [[0]],
            cancelTxt: '取消',
            confirmTxt: '确定',
            title: ['请选择存款方式', '请选择收款银行', '请选择省份', '请选择城市', '请选择地区', '请选择转账方式'],
            depositTypeName: '请选择存款方式',
            bankName: '请选择收款银行',
            provinceName: '请选择省份',
            cityName: '请选择城市',
            districtName: '请选择地区',
            transferName: '请选择转账方式',
            counterTransferName: null,
            onlineName: null,
            depositSelect: 0,
            counterSelect: 0,
            clientTypeSelect: null // this is very important, auto select clientType to request payment;
        };
    },
    computed: {
        ...mapState(['userInfo', 'deliGem', 'depositDetail'])
    },
    components: {
        Picker
    },
    created () {
        if (!this.userInfo.data.isRealPlayer) {
            this.MSGMODAL({
                text: '试玩账号不支持存款，请先注册成为正式玩家。',
                status: true,
                confirmName: '注册去',
                confirmFn: () => {
                    this.$router.push({name: 'register'});
                }
            });
            return false;
        }
        this.init();
    },
    mounted () {},
    methods: {
        ...mapMutations(['STATEMENT', 'MSGMODAL', 'MSGALERT']),
        init () {
            if (this.$route.params.codeId) {
                this.selectGem = this.$route.params.codeId;
            }
            this.autoSelectClientType();
            paymentApiRequest('requestBankTypeByUserName', {
                service: 'payment',
                data: {
                    clientType: this.clientTypeSelect,
                    _isLoading: false,
                    supportMode: 'new'
                }
            }).then((res) => {
                let arrDepositMethod = [];
                this.canUseBankList = res.data.data;
                res.data.data.forEach((val, index, arr) => {
                    if (val.depositMethod === '4' || val.depositMethod === '5') {
                        return false;
                    }
                    if (val.data.length !== 0) {
                        switch (val.depositMethod) {
                        case '1':
                            val.text = '网银转账';
                            val.value = 1;
                            break;
                        case '2':
                            val.text = 'ATM';
                            val.value = 2;
                            break;
                        case '3':
                            val.text = '柜台存款';
                            val.value = 3;
                            break;
                        case '6':
                            val.text = '云闪付';
                            val.value = 6;
                            break;
                        }
                        arrDepositMethod.push(val);
                    }
                });
                this.canUseMethods.push(arrDepositMethod);
                console.log(this.canUseMethods);
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
            this.deliGem.data.forEach((val, index, arr) => {
                this.promoCodeList.push(val);
            });
            this.onlineName = this.userInfo.data.realName;
            this.transferNumber = this.userInfo.playerId;
        },
        apply () {
            if (!this.bank || !this.money || !this.deposit) {
                this.MSGALERT({
                    text: '存款信息输入不完整',
                    status: 'error'
                });
                return false;
            }
            console.log(this.deposit);
            if (this.deposit === 2) {
                if (!this.province && !this.city) {
                    this.MSGALERT({
                        text: '存款信息输入不完整',
                        status: 'error'
                    });
                    return false;
                }
            } else if (this.deposit === 1 && !this.onlineName) {
                this.MSGALERT({
                    text: '请输入真实姓名',
                    status: 'error'
                });
                return false;
            } else if (this.deposit === 3 && !this.transfer) {
                this.MSGALERT({
                    text: '存款信息输入不完整',
                    status: 'error'
                });
                return false;
            }
            if (this.counterSelect === 1 && !this.counterTransferName) {
                this.MSGALERT({
                    text: '请输入银行卡姓名',
                    status: 'error'
                });
                return false;
            }
            paymentApiRequest('requestManualTopup', {
                service: 'payment',
                data: {
                    bankTypeId: this.bank,
                    amount: Number(this.money),
                    depositMethod: this.deposit,
                    provinceId: String(this.province),
                    cityId: this.city,
                    districtId: this.district,
                    bonusCode: this.inputGem,
                    remark: this.userInfo.playerId,
                    supportMode: 'new',
                    bPMSGroup: true,
                    realName: this.onlineName || this.counterTransferName
                }
            }).then((res) => {
                // this.getDepositDetail();
                this.MSGALERT({
                    text: '存款订单已提交',
                    status: 'success'
                });
                this.$router.push({name: 'accountdeposit', title: '存款订单'});
            }).catch((res) => {
                if (res.status === 419) {
                    this.MSGMODAL({
                        text: '您已经有类似存款订单未处理，点确定查看存款订单详情',
                        status: true,
                        confirmFn: () => {
                            this.$router.push({name: 'accountdeposit', params: {title: '存款订单'}});
                        }
                    });
                } else {
                    this.MSGMODAL({
                        text: res.errorMessage,
                        status: true
                    });
                }
            });
        },
        opengem () {
            this.$router.push({name: 'jewel', params: {active: 3}});
        },
        getDepositDetail () {
            paymentApiRequest('getManualTopupRequestList', {
                service: 'payment',
                data: {
                    requestId: '8943835'
                }
            }).then((res) => {
                this.orderDetail = res.data;
                if (res.data) {
                    this.defaultBank.forEach((val, index, arr) => {
                        if (parseInt(this.orderDetail.data.resultData.bankTypeId) === val.type) {
                            this.orderDetail.data.resultData.bankName = val.fullName;
                        }
                    });
                    this.countDownTime();
                }
                this.STATEMENT({
                    name: 'depositDetail',
                    data: res.data
                });
            });
        },
        countDownTime () {
            this.timer = setInterval(() => {
                let diffValue = new Date(this.orderDetail.data.resultData.validTime) - new Date();
                this.countDown.seconds = Math.floor((diffValue / 1000) % 60);
                this.countDown.minutes = Math.floor((diffValue / 1000 / 60) % 60);
                if (this.countDown.seconds < 10) {
                    this.countDown.seconds = '0' + this.countDown.seconds;
                }
                if (this.countDown.minutes < 10) {
                    this.countDown.minutes = '0' + this.countDown.minutes;
                }
                // console.log(diffValue / 1000)
                if (Math.floor(diffValue / 1000) === 0) {
                    this.getManualTopupRequestList();
                }
            }, 1000);
        },
        showPicker (index) {
            let picker = this.$refs['picker' + index];
            picker.show();
        },
        autoSelectClientType () {
            let webview = tool.webViewEnvironment();
            this.clientTypeSelect = webview ? 4 : 2;
        },
        handleSelect (index, args) {
            switch (index) {
            case 0:
                this.depositTypeName = args[2][0];
                this.deposit = args[0][0];
                break;
            case 1:
                this.bankName = args[2][0];
                this.bank = args[0][0];
                break;
            case 2:
                this.provinceName = args[2][0];
                this.province = args[0][0];
                break;
            case 3:
                this.cityName = args[2][0];
                this.city = args[0][0];
                break;
            case 4:
                this.districtName = args[2][0];
                this.district = args[0][0];
                break;
            case 5:
                this.transferName = args[2][0];
                this.transfer = args[0][0];
            }
        }
    },
    watch: {
        province () {
            this.cityList = [];
            this.city = '';
            paymentApiRequest('getCityList', {
                service: 'payment',
                data: {
                    provinceId: this.province
                }
            }).then((res) => {
                let arrCity = [];
                res.data.forEach((val, index, arr) => {
                    val.text = val.name;
                    val.value = val.id;
                    arrCity.push(val);
                });
                this.cityList.push(arrCity);
            });
        },
        city () {
            this.districtList = [];
            this.district = '';
            paymentApiRequest('getDistrictList', {
                service: 'payment',
                data: {
                    provinceId: this.province,
                    cityId: this.city
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
        },
        deposit () {
            this.canUseBankList.forEach((val, index, arr) => {
                if (this.deposit === Number(val.depositMethod)) {
                    this.bankList = [];
                    this.bank = '';
                    let arrBank = [];
                    val.data.forEach((val, index, arr) => {
                        if (val.bankTypeId === 174) {
                            val.name = '其他银行';
                        }
                        val.text = val.name;
                        val.value = val.bankTypeId;
                        arrBank.push(val);
                    });
                    console.log(this.bankList);
                    this.bankList.push(arrBank);
                }
            });
            console.log(this.deposit);
            this.depositSelect = this.deposit;
            this.counterSelect = 0;
            this.bank = '';
            this.bankName = '请选择收款银行';
        },
        depositTypeName () {
            this._clickCount('存款方式', this.depositTypeName);
        },
        transfer () {
            this.counterSelect = this.transfer;
        }
    },
    destroyed () {
        clearInterval(this.timer);
    }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .artificial {
        .top {
            padding-top: 1rem;
            .list {
                display: flex;
                align-items: center;
                margin-bottom: 0.3rem;
                justify-content: center;
                .left {
                    font-size: 0.4rem;
                    color: #fff;
                    width: 2rem;
                    text-align: center;
                }
                .right {
                    display: flex;
                    align-items: center;
                    padding-left: 0.6rem;
                    position: relative;
                    select {
                        width: 4.066rem;
                        outline: none;
                        background: linear-gradient(to bottom, #0c0c0c, #181818);
                        height: 0.7rem;
                        font-size: 0.4rem;
                        color: #ffb400;
                        border: 1px solid #fff;
                        border-radius: 5px;
                    }
                    .text{
                        width: 4.1rem;
                        font-size: 0.4rem;
                        color: #ffb400;
                        border: 1px solid #fff;
                        border-radius: 5px;
                        padding-left: 0.1rem;
                        height: 0.7rem;
                        line-height: 0.7rem;
                        background: linear-gradient(to bottom, #0c0c0c, #181818);
                    }
                    input {
                        width: 4.1rem;
                        height: 0.7rem;
                        outline: none;
                        border: 1px solid #fff;
                        background: linear-gradient(to bottom, #0c0c0c, #181818);
                        border-radius: 5px;
                        color: #ffb400;
                        padding-left: 0.1rem;
                        font-size: 0.4rem;
                    }
                    .deligem {
                        border: 1px solid #fff;
                        border-radius: 5px;
                        width: 4.2rem;
                        height: 0.7rem;
                        background: linear-gradient(to bottom, #0c0c0c, #181818);
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                        justify-content: space-between;
                        position: relative;
                        /*input {*/
                            /*border: none;*/
                            /*padding-left: 0.1rem;*/
                            /*width: 3rem;*/
                            /*height: 100%;*/
                            /*border-radius: 0;*/
                            /*font-size: 0.4rem;*/
                        /*}*/
                        .deliselect {
                            /*margin-right: 0.1rem;*/
                            width: 100%;
                            outline: none;
                            border: none;
                            font-size: 0.4rem;
                            height: 100%;
                            background: transparent;
                            color: #ffb400;
                            border-radius: 0;
                        }
                    }
                    .gemurl {
                        position: absolute;
                        right: -1rem;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 0.5rem;
                        height: 0.5rem;
                        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/question.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .countertip {
                font-size: 0.3466rem;
                color: #ffb400;
            }
            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.5rem 0;
                div {
                    width: 2.8rem;
                    height: 0.8rem;
                    font-size: 0.466rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 5px;
                }
                .left {
                    background: linear-gradient(to bottom, #454545, #161616);
                    margin-right: 0.5rem;
                }
                .right {
                    background: linear-gradient(to bottom, #ee7d00, #c82900);
                }
            }
            .paytip_cs{
                color: #ffa500;
                font-size: 0.4rem;
                text-align: start;
                padding-left: 0.2rem;
            }
        }
        .orderdetail {
            padding: 0.5rem 0.2rem 0.2rem 0.2rem;
            .tip {
                font-size: 0.4rem;
                color: #fff;
                p {
                    padding-bottom: 0.2rem;
                }
            }
            .content {
                .title {
                    display: flex;
                    align-items: center;
                    .icon {
                        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/bank.png') no-repeat;
                        width: 0.533rem;
                        height: 0.42666rem;
                        background-size: 100% 100%;
                    }
                    .info {
                        background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/wallet.png') no-repeat;
                        width: 0.56rem;
                        height: 0.56rem;
                        background-size: 100% 100%;
                    }
                    .text {
                        font-size: 0.4rem;
                        font-weight: bold;
                        color: #fff;
                        padding-left: 0.2rem;
                    }
                }
                .bankinfo {
                    margin-top: 0.3rem;
                    margin-bottom: 0.3rem;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    padding: 0.2rem 0.3rem;
                    .list {
                        display: flex;
                        align-items: center;
                        padding-bottom: 0.1rem;
                        span {
                            color: #fff;
                            font-size: 0.4rem;
                        }
                        span:nth-child(1) {
                            width: 2rem;
                        }
                        span:nth-child(2) {
                            padding-left: 1rem;
                        }
                    }
                }
            }
            .btn {
                background: linear-gradient(to bottom, #ee7d00, #c82900);
                font-size: 0.4rem;
                color: #fff;
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70%;
                margin: 0.8rem auto 0.3rem;
                border-radius: 5px;

            }
        }
        .bottom {
            margin: 0.2rem;
            background-color: #2c2c2c;
            .title {
                text-align: center;
                font-size: 0.3466rem;
                color: #fff;
                width: 7.733rem;
                margin: 0 auto;
                padding: 0.5rem 0;
            }
            ul {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-around;
                li {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0.2rem 0;
                    .number {
                        width: 20px;
                        height: 20px;
                        padding: 2px;
                        border-radius: 50%;
                        background-color: #000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 0.2rem;
                        position: relative;
                        span {
                            border: 1px solid #bc5606;
                            height: 16px;
                            width: 16px;
                            /*line-height: 0.5rem;*/
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 0.266rem;
                            color: #fff;
                            background-color: #2f2f2f;
                            border-radius: 50%;
                            text-align: center;
                        }
                    }
                    .step {
                        width: 2.5333rem;
                        height: 2.4rem;
                        border: 1px solid #3f3e3e;
                        background: linear-gradient(to bottom, #181818, #0a0a0a);
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        .text {
                            font-size: 0.32rem;
                            color: #fff;
                            padding: 0.1rem 0;
                        }
                        .img {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 1.5733rem;
                            span {
                            }
                            .order {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step1.png') no-repeat;
                                background-size: 1.8666rem 1.0133rem;
                                width: 1.8666rem;
                                height: 1.0133rem;
                            }
                            .info {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step2.png') no-repeat;
                                background-size: 1.44rem 1.32rem;
                                width: 1.44rem;
                                height: 1.32rem;
                            }
                            .bank {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step3.png') no-repeat;
                                background-size: 2.066rem 0.96rem;
                                width: 2.066rem;
                                height: 0.96rem;
                            }
                            .charge {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step4.png') no-repeat;
                                background-size: 1.6266rem 1.1866rem;
                                width: 1.6266rem;
                                height: 1.1866rem;
                            }
                            .toaccount {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step5.png') no-repeat;
                                background-size: 1.08rem 1.32rem;
                                width: 1.08rem;
                                height: 1.32rem;
                            }
                            .earn {
                                background: url('https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/deposit/step6.png') no-repeat;
                                background-size: 1.4933rem 1.5733rem;
                                width: 1.4933rem;
                                height: 1.5733rem;
                            }

                        }
                    }
                }
            }
        }
    }
</style>
