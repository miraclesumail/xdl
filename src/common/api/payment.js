/*
* payment api container
* PaymentApi == > getValidTopUpReturnRecordList  getTopupList  getWithdrawalInfo  getBonusRequestList  manualTopupStatusNotify
*                 onlineTopupStatusNotify  getOnlineTopupType  getPlayerWechatPayStatus  getPlayerAliPayStatus
*                 createOnlineTopupProposal  requestAlipayTopup  requestWechatTopup  getWechatTopupRequestList
*                 getAlipayTopupRequestList  requestManualTopup  cancelAlipayTopup  cancelWechatTopup
*                 cancelManualTopupRequest  getManualTopupRequestList  getTopupHistory  getProvinceList
*                 getCityList  getDistrictList  getBankTypeList  requestBankTypeByUserName  applyBonus
*                 updatePaymentInfo search
* */
const API = {
    getValidTopUpReturnRecordList: 'getValidTopUpReturnRecordList', // 获取符合充值返点的充值记录 | get validated recharge record
    getTopupList: 'getTopupList', // 获取玩家的存款记录 | get player's deposit record
    getWithdrawalInfo: 'getWithdrawalInfo', // 获取玩家提款信息 | get player's withdrawal record
    getBonusRequestList: 'getBonusRequestList', // 获取玩家所提交的兑奖申请单列表 | get list of bonus requests
    manualTopupStatusNotify: 'manualTopupStatusNotify', // 手工存款充值单状态发生改变时，会向在线的玩家主动发送充值状态更新的通知 | notify that the manual deposit is updated
    onlineTopupStatusNotify: 'onlineTopupStatusNotify', // 在线充值单状态发生改变时，会向在线的玩家主动发送充值状态更新的通知 | notify that the online deposit is updated
    getOnlineTopupType: 'getOnlineTopupType', // 获取有效在线充值方式 | get types for online recharge
    getPlayerWechatPayStatus: 'getPlayerWechatPayStatus', // 获取微信充值状态 | get the status of weChat deposit
    getPlayerAliPayStatus: 'getPlayerAliPayStatus', // 获取支付宝充值状态 | get the status of Alipay deposit
    createOnlineTopupProposal: 'createOnlineTopupProposal', // 创建在线充提案 | enter data in form as deposit application
    requestAlipayTopup: 'requestAlipayTopup', // 申请支付宝转账充值 | application for Alipay deposit
    requestWechatTopup: 'requestWechatTopup', // 申请微信转账充值 | application for weChat deposit
    getWechatTopupRequestList: 'getWechatTopupRequestList', // 获取玩家申请的微信存款申请单. (一般不允许玩家同时申请多个手工存款单)
    getAlipayTopupRequestList: 'getAlipayTopupRequestList', // 获取玩家申请的支付宝存款申请单. (一般不允许玩家同时申请多个手工存款单) .
    cancelAlipayTopup: 'cancelAlipayTopup', // 取消支付宝转账充值 | cancel Alipay deposit
    cancelWechatTopup: 'cancelWechatTopup', // 取消微信转账充值 | cancel weChat deposit
    requestManualTopup: 'requestManualTopup', // 申请手工存款充值 | apply manual deposit
    cancelManualTopupRequest: 'cancelManualTopupRequest', // 取消手工存款申请单 | cancel manual deposit
    getManualTopupRequestList: 'getManualTopupRequestList', // 获取手工存款申请单列表 | get list of available manual deposit methods
    getTopupHistory: 'getTopupHistory', // 获取充值申请记录
    getProvinceList: 'getProvinceList', // 获取省份列表 | get list of provinces
    getCityList: 'getCityList', // 获取市列表 | get list of cities
    getDistrictList: 'getDistrictList', // 获取区县列表 | get list of districts
    getBankTypeList: 'getBankTypeList', // 获取银行卡类型列表 | get list of bank card types
    requestBankTypeByUserName: 'requestBankTypeByUserName', // 获取pms可用银行卡类型 | get bank card type by its name
    applyBonus: 'applyBonus', // 申请兑换奖品 | apply bonus for prizes
    updatePaymentInfo: 'updatePaymentInfo', // 修改玩家的支付信息 | modify player's payment information
    search: 'search' // 查询消费记录 | search comsumption recordf
};

export function paymentApiRequest (functionName, obj) {
    if (typeof functionName !== 'string') {
        throw new Error('the functionName params need string');
    }
    if (typeof obj !== 'object') {
        throw new Error('the object params need object');
    }
    if (!('service' in obj)) {
        throw new Error('the object.service params undefined');
    }
    if (!('data' in obj)) {
        throw new Error('the object.data params undefined');
    }
    return window.net.send({
        service: obj.service,
        functionName: API[functionName],
        data: obj.data
    });
}
