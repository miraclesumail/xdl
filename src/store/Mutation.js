import {MSGALERT, MSGMODAL, STATEMENT, CLEARMSGALERT} from './Mutation-types';

export default {
    /*
    * msgAlert 要求传输这两个东西
    * {text, status}
    * text => 输入文字
    * status => success error warn 三选一
    * */
    [MSGALERT] (state, options) {
        state.msgAlert.push(options);
    },
    [CLEARMSGALERT] (state, options) {
        state.msgAlert = [];
    },
    /*
    * msgModal 要求
    * {text, title, status, confirmFn, cancelFn}
    * text 文字
    * title 标题
    * status 弹窗显示隐藏状态
    * confirmFn 确定按钮的函数
    * cancelFn 取消按钮的函数
    * cancelName 确定按钮名字
    * confirmName 取消按钮名字
    * */
    [MSGMODAL] (state, options) {
        // console.log(options);
        state.msgModal.modalTitle = options.title;
        state.msgModal.modalText = options.text;
        state.msgModal.modalStatus = options.status;
        state.msgModal.modalConfirmFun = options.confirmFn;
        state.msgModal.modalCancelFun = options.cancelFn;
        state.msgModal.cancelName = options.cancelName;
        state.msgModal.confirmName = options.confirmName;
    },
    [STATEMENT] (state, {name, data, type}) {
        if (type) {
            state[name][type] = data;
        } else {
            state[name] = data;
        }
    },
    /*
    * AliPay pop param
    * */
    AliPay (state, options) {
        state.alipaypop.name = options.name;
        state.alipaypop.money = options.money;
        state.alipaypop.placeholder = options.placeholder;
        state.alipaypop.placeholderName = options.placeholderName;
        state.alipaypop.selectPay = options.selectPay;
        state.alipaypop.deliGem = options.deliGem;
        state.alipaypop.status = options.status;
        state.alipaypop.lastAliPayName = options.lastAliPayName;
    }
};
