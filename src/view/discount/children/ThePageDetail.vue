<template>
<content-wrapper class="container" :options="options">
    <common-header>{{pageData.title}}</common-header>
    <scroll-component>
        <div class="content">
            <div class="header">
                <div class="imgbox">
                    <img :src="pageData.headerImg" alt="">
                </div>
            </div>
            <component :is="commonList[pageId]" @childrenFn="childrenFn"></component>
            <button class="btn" @click="apply(pageData.btnData[1])" v-if="pageStatus === 1 && pageApply.btnName === 'apply'">
                {{applyBtn}}
            </button>
            <div class="page">
                <div class="imgbox">
                    <img :src="pageData.contentImg" alt="">
                </div>
            </div>
        </div>
    </scroll-component>
</content-wrapper>
</template>

<script>
import tool from '@/common/tool';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import {apiRequest} from '@/common/api/base';
import {gameApiRequest} from '@/common/api/game';
import {paymentApiRequest} from '@/common/api/payment';
import jsjlbszfh from './PageDetailCommon/jsjlbszfh'; // 输返金组件
export default {
    name: 'the-page-detail',
    data () {
        return {
            options: {
                top: 1.533,
                bottom: 1.7333
            },
            pageId: null,
            pageData: {},
            isWebView: null,
            hasApply: true,
            commonList: {
                'jsjlbszfh': 'jsjlbszfh'
            },
            discountType: null,
            pageStatus: null,
            pageApply: null
        };
    },
    computed: {
        applyBtn () {
            let btnName = '立即申请';
            if (this.hasApply) {
                btnName = '立即申请';
            } else {
                btnName = '已申请';
            }
            return btnName;
        }
    },
    components: {
        CommonHeader,
        ContentWrapper,
        ScrollComponent,
        jsjlbszfh
    },
    methods: {
        ...mapMutations(['STATEMENT', 'MSGALERT']),
        init () {
            this.isWebView = tool.webViewEnvironment();
            this.pageId = this.$route.params.pageId;
            this.pageStatus = this.$route.params.pageStatus;
            // this.pageApply = this.$route.params.pageApply;
            if (this.$route.params.pageId) {
                tool.setSessionStore('discountPageId', this.$route.params.pageId);
            } else {
                this.pageId = tool.getSessionStore('discountPageId');
            }
            apiRequest('getRewardList', {
                service: 'reward',
                data: {}
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'sjyhhd') {
                        val.list.forEach((val, index) => {
                            if (val.btnOrImageList[2].btnLinksTo === this.pageId) {
                                console.log(val);
                                if (val.displayId === '已结束') {
                                    this.pageStatus = 0;
                                } else {
                                    this.pageStatus = 1;
                                }
                                this.pageApply = val.btnOrImageList[1];
                                this.pageData = {
                                    title: val.displayId,
                                    headerImg: val.btnOrImageList[0].btnLinksTo,
                                    contentImg: val.displayTextContent,
                                    btnData: val.btnOrImageList
                                };
                            }
                        });
                    }
                });
            }).catch((res) => {
                console.log(res);
            });
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
        childrenFn (res) {
            this.hasApply = res;
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .content{
        min-height: 100vh;
        padding-bottom: 0.5rem;
    }
.header{
    .imgbox{
        width: 100%;
        font-size: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.page{
    .imgbox{
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.btn{
    width: 40%;
    height: 1.2rem;
    border-radius: 5px;
    font-size: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #f41e1e, #910606);
    color: #fff;
    font-weight: bold;
    margin: 0.4rem auto 0.4rem;
    letter-spacing: 2px;
    outline: none;
    border:none;
    /*&:active{*/
        /*background-color: #db7b1c;*/
        /*color: #fff;*/
    /*}*/
}
</style>
