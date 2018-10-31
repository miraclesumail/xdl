<template>
<div class="notice_pop" v-if="isShow">
    <div class="container">
        <div class="imgbox" @click="open">
            <img :src='noticeData.bannerImg' alt="">
            <div class="textcontent" v-if="isNotice">
                <div class="title">
                    {{noticeContent.title}}
                </div>
                <div class="text">
                    {{noticeContent.content}}
                </div>
            </div>
        </div>
        <span class="close iconfont icon-msnui-close" @click="close"></span>
    </div>
    <div class="cover">
        <div class="coverbg"></div>
    </div>
</div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import {gameApiRequest} from '@/common/api/game';
import tool from '@/common/tool';
export default {
    name: 'the-pop',
    data () {
        return {
            noticeData: [],
            isShow: false,
            isNotice: false,
            noticeContent: {
                content: null,
                title: null
            }
        };
    },
    components: {},
    methods: {
        init () {
            apiRequest('getConfig', {
                service: 'platform',
                data: {
                    device: 3
                }
            }).then((res) => {
                res.data.activityList.filter((val, index) => {
                    if (/mobile\/centerPop/.test(val.code) && val.status === 1 && val.bannerImg) {
                        this.noticeData = val;
                        let noticePop = tool.getSessionStore('noticePop') === null;
                        this.isShow = noticePop;
                        if (this.noticeData.btnList[1].extString === 'yes') {
                            apiRequest('getPlatformAnnouncements', {
                                service: 'platform',
                                data: {
                                    reach: 'conditional'
                                }
                            }).then((res) => {
                                if (res.data.length > 0) {
                                    this.noticeContent.title = res.data[0].title;
                                    this.noticeContent.content = res.data[0].content;
                                    this.isNotice = true;
                                }
                            }).catch((res) => {});
                        }
                    }
                });
            }).catch((res) => {
                console.log(res);
            });
        },
        close () {
            this.isShow = false;
            tool.setSessionStore('noticePop', false);
        },
        openWindow (src) {
            let ow = window.open('');
            ow.location = src;
        },
        openCs () {
            let ow = window.open('');
            ow.location = 'https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26&jid=';
        },
        openGame (gameId) {
            let winRef = window.open('', '_blank');
            gameApiRequest('getLoginURL', {
                service: 'game',
                data: {
                    gameId: gameId,
                    clientDomainName: location.origin,
                    clientType: 2
                }
            }).then((res) => {
                winRef.location = res.data.gameURL;
                if (winRef == null || typeof (winRef) === 'undefined') {
                    console.log('窗口无法打开，请检查浏览器！');
                } else {
                    console.log('窗口打开成功！');
                }
            }).catch((res) => {
                winRef.close();
            });
        },
        open () {
            switch (this.noticeData.btnList[0].btn) {
            case 'discount':
                this.$router.push({name: 'discountdetail', params: { pageId: this.noticeData.btnList[0].btnImg }});
                // this.$router.push({name: this.noticeData.btnList[0].btnImg, params: {title: this.noticeData.title[0].name}});
                break;
            case 'path':
                this.$router.push({name: this.noticeData.btnList[0].btnImg});
                if (this.noticeData.btnList[0].extString) {
                    let arr = this.noticeData.btnList[0].extString.split(',');
                    let obj = {};
                    arr.forEach((val, index) => {
                        obj[val.split(':')[0]] = val.split(':')[1];
                    });
                    this.$router.push({name: this.noticeData.btnList[0].btnImg, params: obj});
                } else {
                    this.$router.push({name: this.noticeData.btnList[0].btnImg});
                }
                break;
            case 'game':
                this.openGame(this.noticeData.btnList[0].btnImg);
                break;
            case 'url':
                this.openWindow(this.noticeData.btnList[0].btnImg);
                break;
            case 'cs':
                this.openCs();
                break;
            default:
            }
            this.isShow = false;
            tool.setSessionStore('noticePop', false);
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
.notice_pop{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    .container{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        z-index: 21;
        width: 100%;
        height: 5.84rem;
        .imgbox{
            position: relative;
            font-size: 0;
            min-height: 100%;
            /*width: 100%;*/
            padding: 0 0.1rem;
            img{
                border-radius: 5px;
                width: 100%;
                height: 100%;
            }
            .textcontent{
                position: absolute;
                right: 0.1rem;
                bottom: 0;
                width: 4.8rem;
                background-color: #092438;
                border-radius: 5px;
                padding: 0.2rem 0.2rem;
                box-shadow: -5px 0 20px #000;
                .title{
                    font-size: 0.3466rem;
                    color: #ffffff;
                    text-align: center;
                    padding-bottom: 0.1rem;
                }
                .text{
                    font-size: 0.32rem;
                    padding: 0.1rem;
                    border-radius: 5px;
                    height: 2.7rem;
                    overflow: scroll;
                    background-color: #051725;
                    color: #ffffff;
                }
            }
        }
        .close {
            position: absolute;
            top: -0.1rem;
            right: 0rem;
            font-size: 1rem;
            font-weight: bold;
            color: #fff;
        }
    }
    .cover{
        .coverbg{
            position: fixed;
            top: 0;right: 0;left: 0;bottom: 0;
            background:rgba(0,0,0,0.8);
        }

    }

}
</style>
