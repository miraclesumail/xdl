<template>
<div class="carousel-banner">
    <div class="carousel-list" ref="carousel">
        <ul class="item_list" ref="carousel_list">
            <li v-for="(item, index) in imgList" :key="index" @click="goto(item.btnList[0])">
                <img alt="" :src="item.bannerImg"/>
            </li>
        </ul>
    </div>
    <ul class="dot_list" v-if="sliderDot">
        <li class="dot_item" :class="index === currentIndex ? 'active' : ''" v-for="(item, index) in sliderDot" :key="index"></li>
    </ul>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import {gameApiRequest} from '@/common/api/game';
import tool from '@/common/tool';
export default {
    name: 'the-banner',
    data () {
        return {
            bannerBetterScroll: null,
            sliderDot: null,
            currentIndex: 0,
            imgList: null,
            timer: null,
            interval: 3000,
            autoPlay: true,
            isWebView: false
        };
    },
    props: {
        listData: {
            type: Array
        }
    },
    methods: {
        init () {
            this.imgList = this.listData;
            this.isWebView = tool.webViewEnvironment();
            this._initSlider();
        },
        _initSlider () {
            if (this.imgList && this.imgList.length > 0) {
                this.$refs.carousel_list.style.width = this.imgList.length + '00%';
                this.sliderDot = this.imgList.length;
                setTimeout(() => {
                    this.startBanner();
                    this.$refs.carousel_list.style.width = this.$refs.carousel_list.children.length + '00%';
                }, 30);
            }
        },
        startBanner () {
            this.bannerBetterScroll = new BScroll(this.$refs.carousel, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: true,
                    threshold: 0.1,
                    speed: 500
                },
                bounce: false,
                stopPropagation: false,
                tap: true,
                click: true
            });
            this._handerSliderListener();
            this._autoPlay();
        },
        _handerSliderListener () {
            this.bannerBetterScroll.on('touchEnd', this._getToPage);
            this.bannerBetterScroll.on('scrollEnd', this._getToPage);
        },
        _autoPlay () {
            if (this.autoPlay) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.bannerBetterScroll.next();
                }, this.interval);
            }
        },
        _getToPage () {
            let getCurrentPage = this.bannerBetterScroll.getCurrentPage();
            this.currentIndex = getCurrentPage.pageX;
            this._autoPlay();
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
                this.$nextTick(() => {
                    ow.location = 'https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26&jid=';
                });
            }
        },
        loginGame (gameId) {
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
        goto (item) {
            console.log(item);
            this._clickCount('首页', 'banner');
            switch (item.btn) {
            case 'discount':
                this.$router.push({name: 'discountdetail', params: {pageId: item.btnImg}});
                break;
            case 'path':
                if (item.extString) {
                    let arr = item.extString.split(',');
                    let obj = {};
                    arr.forEach((val, index) => {
                        obj[val.split(':')[0]] = val.split(':')[1];
                    });
                    this.$router.push({name: item.btnImg, params: obj});
                } else {
                    this.$router.push({name: item.btnImg});
                }
                break;
            case 'game':
                this.loginGame(item.btnImg);
                break;
            case 'url':
                this.openWindow(item.btnImg);
                break;
            case 'cs':
                this.openCs();
                break;
            case 'function':
                this[item.btnImg]();
                break;
            default:
            }
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        listData () {
            this.init();
        }
    },
    destroyed () {
        clearTimeout(this.timer);
    }
};
</script>

<style scoped lang="scss">
.carousel-banner{
    position: relative;
    .carousel-list{
        width: 100%;
        height: 5.8266rem;
        overflow: hidden;
        .item_list{
            height: 100%;
            overflow: hidden;
            display: flex;
            li{
                width: 100%;
                height: 100%;
                font-size: 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .dot_list{
        position: absolute;
        left: 50%;
        bottom: 0.2rem;
        transform: translate3d(-50%, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        .dot_item{
            width: 8px;
            height: 8px;
            background-color: #f9f9f9;
            border-radius: 8px;
            margin-right: 0.2rem;
        }
        li.active{
            background-color: #fa8c16;
        }
    }
}
</style>
