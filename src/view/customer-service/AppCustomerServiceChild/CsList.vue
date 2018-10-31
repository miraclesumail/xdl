<template>
    <div class="container">
        <ul class="item">
            <li @click="qq">
                <span class="iconfont icon-weixin icon"></span>
                <span class="text">xindeli_888</span>
            </li>
            <li @click="cs">
                <span class="iconfont icon-kefu icon"></span>
                <span class="text">在线客服</span>
            </li>
            <li @click="recall">
                <span class="iconfont icon-xiaoshi icon"></span>
                <span class="text">请求回电</span>
            </li>
        </ul>
        <wechat v-if="isQQ" @close="closeqq"></wechat>
        <response-call v-if="isCall" @close="closeCall"></response-call>
    </div>
</template>

<script>
import tool from '@/common/tool';
import Wechat from './WechatPop';
import responseCall from './response_call';
export default {
    name: 'cs-list',
    data () {
        return {
            isWebView: false,
            isQQ: false,
            isCall: false
        };
    },
    mounted () {
        this.init();
    },
    components: {
        Wechat,
        responseCall
    },
    methods: {
        init () {
            this.isWebView = tool.webViewEnvironment();
        },
        qq () {
            this.isQQ = true;
            // if (this.isWebView) {
            //     location.href = 'http://wpa.qq.com/msgrd?v=3&uin=719488880&site=qq&menu=yes';
            // } else {
            //     window.open('http://wpa.qq.com/msgrd?v=3&uin=719488880&site=qq&menu=yes');
            // }
        },
        recall () {
            this.isCall = true;
        },
        cs () {
            if (this.isWebView) {
                location.href = 'https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1';
            } else {
                window.open('https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1');
            }
        },
        closeqq () {
            this.isQQ = false;
        },
        closeCall () {
            this.isCall = false;
        }
    }
};
</script>

<style scoped lang="scss">
.container{
    height: 100%;
}
.item{
    padding: 0 0.2rem;
    li{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 0.6rem;
        .icon{
            font-size: 1rem;
            color: #ffffff;
            width: 2.8rem;
            height: 2.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border:2px solid #e28722;
            border-radius: 50%;
            margin-bottom: 0.3rem;
        }
        .icon-qq {
            /*background-color: #096dd9;*/
        }
        .icon-kefu{
            /*background-color: #ad2102;*/
            font-size: 1.2rem;
        }
        .icon-bodadianhua{
            /*background-color: #7cb305;*/
        }
        .text{
            font-size: 0.4rem;
            color: #ffffff;
        }
        &:last-child{
            border-bottom: none;
        }
    }
}
</style>
