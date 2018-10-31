<template>
<div class="container">
    <img :src="item.btnOrImageList[0].btnLinksTo" alt="" @click="gotoDetail(item.btnOrImageList[3], item.displayId, item.btnOrImageList[1])">
    <div class="bottom">
        <div class="left">
            <span>{{item.displayTitle}}</span>
        </div>
        <div class="right">
            <span @click="gotoDetail(item.btnOrImageList[3], item.displayId, item.btnOrImageList[1])"  v-if="item.displayId !== '已结束'">查看详情</span>
            <span @click="apply(item.btnOrImageList[1])" v-if="item.btnOrImageList[1].btnName === 'apply'">立即申请</span>
            <span  v-if="item.displayId === '已结束'">已结束</span>
        </div>
    </div>
</div>
</template>

<script>
import tool from '@/common/tool';
import {gameApiRequest} from '@/common/api/game';
import {paymentApiRequest} from '@/common/api/payment';
import {apiRequest} from '@/common/api/base';
import { mapMutations } from 'vuex';
export default {
    name: 'the-discount-detail',
    data () {
        return {
            item: null,
            isWebView: false,
            recordId: null
        };
    },
    props: {
        itemData: {
            type: Object
        }
    },
    created () {
        this.init();
    },
    mounted () {},
    watch: {
        itemData () {
            this.item = this.itemData;
            console.log(this.item);
        }
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        init () {
            this.item = this.itemData;
            this.isWebView = tool.webViewEnvironment();
        },
        openWindow (src) {
            if (this.isWebView) {
                location.href = src;
            } else {
                let ow = window.open('');
                this.$nextTick(() => {
                    ow.location = src;
                });
            }
        },
        openCs () {
            if (this.isWebView) {
                location.href = 'https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26&jid=';
            } else {
                let ow = window.open('');
                ow.location = 'https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26&jid=';
            }
        },
        openGame (gameId) {
            let checkGame = new Promise((resolve, reject) => {
                gameApiRequest('getLoginURL', {
                    service: 'game',
                    data: {
                        gameId: gameId,
                        clientDomainName: location.origin,
                        clientType: 2
                    }
                }).then((res) => {
                    resolve(res);
                }).catch((res) => {
                    reject(res);
                });
            });

            if (this.isWebView) {
                checkGame.then((res) => {
                    location.href = res.data.gameURL;
                }).catch((res) => {});
            } else {
                let ow = window.open('', '_blank');
                checkGame.then((res) => {
                    setTimeout(() => {
                        ow.location = res.data.gameURL;
                        if (ow == null || typeof (ow) === 'undefined') {
                            ow.close();
                        } else {}
                    }, 30);
                }).catch((res) => {
                    console.log(res);
                    ow.close();
                });
            }
        },
        applyDiscount (codeApplyStyle, code) {
            paymentApiRequest('getValidTopUpReturnRecordList', {
                service: 'payment',
                data: {
                    startIndex: 0,
                    requestCount: 100,
                    sort: false,
                    _isLoading: true
                }
            }).then((res) => {
                if (res.data.records.length > 0) {
                    this.recordId = res.data.records[0]._id;
                } else {
                    this.MSGALERT({
                        text: '当前用户没有存款记录',
                        status: 'error'
                    });
                    return;
                }
                if (codeApplyStyle === '1') {
                    apiRequest('applyRewardEvent', {
                        service: 'reward',
                        data: {
                            code: code,
                            data: {
                                topUpRecordId: this.recordId
                            }
                        }
                    }).then(() => {
                        this.MSGALERT({
                            text: '当前优惠申请成功',
                            status: 'success'
                        });
                    });
                } else if (codeApplyStyle === '2') {
                    apiRequest('applyRewardEvent', {
                        service: 'reward',
                        data: {
                            code: code,
                            data: {}
                        }
                    }).then(() => {
                        this.MSGALERT({
                            text: '当前优惠申请成功',
                            status: 'success'
                        });
                    });
                }
            });
        },
        gotoPath (path) {
            this.$router.push({name: path});
        },
        apply (item) {
            switch (item.btnSourceFrom.split('-')[0]) {
            case 'path':
                this.gotoPath(item.btnLinksTo);
                break;
            case 'game':
                this.openGame(item.btnLinksTo);
                break;
            case 'code':
                this.applyDiscount(item.btnSourceFrom.split('-')[1], item.btnLinksTo);
                break;
            case 'cs':
                this.openCs();
                break;
            }
        },
        gotoDetail (page, pageStatus, pageApply) {
            switch (page.btnName) {
            case 'url':
                this.openWindow(page.btnLinksTo);
                break;
            case 'game':
                this.openGame(page.btnLinksTo);
                break;
            case 'discount':
                pageStatus = pageStatus === '已结束' ? 0 : 1;
                this.$router.push({name: 'discountdetail', params: {pageId: page.btnLinksTo, pageStatus: pageStatus, pageApply: pageApply}});
                break;
            case 'path':
                if (page.btnLinksTo) { // 自动转换格式
                    let arr = page.btnLinksTo.split(',');
                    console.log(arr);
                    let obj = {};
                    arr.forEach((val, index) => {
                        obj[val.split(':')[0]] = val.split(':')[1];
                    });
                    this.$router.push({name: page.btnSourceFrom, params: obj});
                } else {
                    this.$router.push({name: page.btnSourceFrom});
                }
                break;
            case 'cs':
                this.openCs();
                break;
            default:
                return false;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.container {
    position: relative;
    img{
        width: 100%;
        height: 100%;
    }
    .bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 0.7333rem;
            background-color: rgba(000,000,000, 0.9);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                font-size: 0.4rem;
                color: #fff;
                font-weight: bold;
                padding-left: 0.1rem;
            }
            .right{
                font-size: 0.32rem;
                color: #fff;
                display: flex;
                align-items: center;
                span:nth-child(1) {
                    color: #ffb006;
                    padding-right: 0.3rem;
                }
                span:nth-child(2){
                    background: linear-gradient(to bottom, #f41e1e, #910606);
                    height: 0.6rem;
                    line-height: 0.6rem;
                    width: 1.6rem;
                    text-align: center;
                    margin-right: 0.2rem;
                    border-radius: 5px;
                }
            }
        }
}
</style>
