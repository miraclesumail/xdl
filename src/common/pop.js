import Vue from 'vue';
import Toast from '../components/pop/AppToast'; // 面包屑提示组件
import Modal from '../components/pop/AppModal'; // 弹窗组件
let removeDom = event => {
    event.target.parentNode.removeChild(event.target);
};
const ToastConstructor = Vue.extend(Toast);
const ModalConstructor = Vue.extend(Modal);
ToastConstructor.prototype.close = function () {
    this.$el.addEventListener('transitionend', removeDom);
};
ModalConstructor.prototype.close = function () {
    this.$el.addEventListener('transitionend', removeDom);
};

export function ToastFn (options = {}) {
    let ToastCom = new ToastConstructor({
        el: document.createElement('div'),
        propsData: {
            msgSuccess: {
                msg: options.successMsg,
                successStatus: options.successStatus
            },
            msgError: {
                msg: options.errorMsg,
                successStatus: options.errorStatus
            },
            msgWarn: {
                msg: options.warnMsg,
                warnStatus: options.warnStatus
            }
        }
    });
    document.getElementById('app').appendChild(ToastCom.$el);
    Vue.nextTick(() => {
        ToastCom.timer = setTimeout(() => {
            ToastCom.close();
        }, 1500);
    });
    return ToastCom;
}

export function ModalFn (options = {}) {
    let ModalCom = new ModalConstructor({});
    return ModalCom;
}

// export {ModalFn};
