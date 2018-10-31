export default {
    msgAlert: [],
    msgModal: {
        modalText: '请先登录，谢谢',
        modalTitle: '提示',
        modalStatus: false,
        modalConfirmFun: null,
        modalCancelFun: null
    },
    /*
    * 加载动画
    * */
    msgLoad: false,
    /*
    * userInfo,基本存放以下三个东西
    * {
    * data //用户基础数据
    * token // 秘钥
    * playerId // 用户ID
    * }
    * */
    userInfo: null,
    /*
    * control header change
    * */
    header: true,
    /*
    * control detail page title
    * */
    pageHeader: false,
    /*
    * control bottom change
    * */
    bottom: true,
    /*
    * login status
    * */
    loginDate: {
        isCode: 0 // 是否展示验证码
    },
    /*
    * deli Gem data
    * */
    deliGem: {
        data: []
    },
    /*
    * deposit info
    * */
    depositDetail: null,
    /*
    * onlineDeposit
    * */
    onlineDeposit: [],
    /*
    * AliPayPop
    * */
    alipaypop: {
        name: '支付宝转账',
        money: 5000,
        placeholder: '请输入您的支付宝昵称',
        placeholderName: '支付宝昵称',
        selectPay: null,
        deliGem: null,
        lastAliPayName: null,
        status: false
    },
    /*
    *  CS control
    * */
    openCs: false,
    /*
    *  account headerTile
    * */
    commonHeaderTitle: null,
    /*
    *  router classControl
    * */
    routerClass: {
        account: false,
        home: false
    },
    /*
    * levelData
    * */
    levelData: null,
    /*
    * stopBetterScrollMove
    * */
    stopBetterScrollMove: true,
    /*
    * freeMoney
    * */
    freeMoney: {
        isShow: false,
        money: 8
    },
    isDownLoad: false
};
