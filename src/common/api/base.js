/*
* base api container
* LoginApiName == > create register login logout isValidUsername getSMSCode verifyPhoneNumberBySMSCode captcha updatePassword
* UserInfoApiName == > get getCredit getPlayerDayStatus getPlayerWeekStatus getCreditDetail getCreditBalance updatePlayerQQ  updatePlayerWeChat
*                      getPlayerAnyDayStatus
* MailApiName == > getUnreadMail getMailList readMail deleteAllMail deleteMail
* LevelApiName == > getLevel getAllLevel manualPlayerLevelUp
* RewardApiName == > applyPromoCode applyRewardEvent getTopUpPromoList requestConsumeRebate
*                    getConsumeRebateAmount getPlayerRewardList getPromoCode  getRewardList
* SmSApiName == > getSmsStatus setSmsStatus updatePhoneNumberWithSMS
* PlatformApiName == > getPlatformAnnouncements clickCount notifyNewMail  getConfig addClientSourceLog playerPhoneChat
* trialPlay => createDemoPlayer
* */
const API = {
    login: 'login', // 用户和代理登录接口 | login
    logout: 'logout', // 用户和代理退出接口 | logout from the system
    register: 'register', // 玩家开户 | send new data to register account
    create: 'create', // 玩家开户 | send new data to register account
    isValidUsername: 'isValidUsername', // 验证开户用户名是否有效 | check if username is valid upon registration
    getSMSCode: 'getSMSCode', // 获取手机验证码 | get mobile phone verification code
    verifyPhoneNumberBySMSCode: 'verifyPhoneNumberBySMSCode', // 验证玩家手机是否正确 | validate mobile phone verification code
    captcha: 'captcha', // 获取登录验证码 | validate user state (for bots)
    get: 'get', // 获取用户信息 | get user information
    getAllLevel: 'getAllLevel', // 获取玩家所有的等级 | get all level
    getLevel: 'getLevel', // 获取玩家当前的等级 | get current level
    getUnreadMail: 'getUnreadMail', // 获取未读站内信 | get unread messages
    getMailList: 'getMailList', // 获取玩家站内信 | get all messages
    deleteMail: 'deleteMail', // 删除站内信 | delete one message
    readMail: 'readMail', // 查看信件 | open and read a message
    deleteAllMail: 'deleteAllMail', // 删除所有站内信 | delete all messages
    getCredit: 'getCredit', // 获取玩家游戏平台额度 | get the player credit limit
    getPlayerDayStatus: 'getPlayerDayStatus', // 获取玩家当天状态 | get the player status for the day
    getPlayerWeekStatus: 'getPlayerWeekStatus', // 获取玩家的本周状态 | get the player status for the week
    getCreditDetail: 'getCreditDetail', // 获取玩家游戏平台额度 | get the player credit limit
    getConsumeRebateAmount: 'getConsumeRebateAmount', // 获取玩家消费返点额度 | get rebate
    requestConsumeRebate: 'requestConsumeRebate', // 玩家向系统申请提前对其未结算的消费进行消费返点结算 | request for early rebate
    getPlayerRewardList: 'getPlayerRewardList', // 获取玩家所提交的兑奖申请单列表 | get list of bonus requests
    updatePassword: 'updatePassword', // 修改玩家密码 | modify password
    getPromoCode: 'getPromoCode', // 获取优惠代码 | get promo
    getCreditBalance: 'getCreditBalance', // 获取玩家全额消费 | get player's balance
    updatePhoneNumberWithSMS: 'updatePhoneNumberWithSMS', // 获取玩家全额消费 | get player's balance
    manualPlayerLevelUp: 'manualPlayerLevelUp', // User upgrade the jazz club rank 自助升级
    getRewardList: 'getRewardList', // 获取优惠所有信息 || get all discount info
    updatePlayerQQ: 'updatePlayerQQ', // 编辑玩家QQ | modify player's QQ
    updatePlayerWeChat: 'updatePlayerWeChat', // 编辑玩家wechat | modify player's weChat
    getPlatformAnnouncements: 'getPlatformAnnouncements', // 获取平台公告 | get announcements
    clickCount: 'clickCount', // 埋点 | counter
    notifyNewMail: 'notifyNewMail', // 通知玩家有新的站内信 | notify that there is a new mail
    getConfig: 'getConfig', // 获取平台设置 | get platform setting
    addClientSourceLog: 'addClientSourceLog', // 添加客户端访问记录 | add client source log
    playerPhoneChat: 'playerPhoneChat', // 请求客服回电 | request for call back
    applyRewardEvent: 'applyRewardEvent', // 申请优惠奖励 | request for reward
    applyPromoCode: 'applyPromoCode', // 使用优惠代码 | request for PromoCode
    setSmsStatus: 'setSmsStatus', // 设置短信状态 | setting sms status
    getSmsStatus: 'getSmsStatus', // 获取短信状态 | get sms status
    authenticate: 'authenticate', // 对接后端保持链接 | back end status
    createDemoPlayer: 'createDemoPlayer', // 创建试玩账号  | back end status
    addIpDomainLog: 'addIpDomainLog', // 上传IP数据等  | update ip data
    getPlayerAnyDayStatus: 'getPlayerAnyDayStatus', // 获取玩家的当天所有数据  | get player current day data
    sendSMSCodeToPlayer: 'sendSMSCodeToPlayer', // 登录后发送短信验证码给玩家
    callBackToUser: 'callBackToUser', // 请求回电配置
    getOMCaptcha: 'getOMCaptcha' // 获取OM参数的验证码
};

export function apiRequest (functionName, obj) {
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
    // console.log(obj);
    return window.net.send({
        service: obj.service,
        functionName: API[functionName],
        data: obj.data
    });
    // console.log(res);
    // return res;
}
