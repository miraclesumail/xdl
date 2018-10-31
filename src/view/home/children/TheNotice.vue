<template>
    <div class="notice">
        <div class="list" @click="openNotice">
            <span class="icon iconfont icon-notice3"></span>
            <div class="sliderlist" ref="notice">
                <ul class="item" ref="noticeList">
                    <li v-for="(item, index) in list" :key="index" v-if="list.length > 0">
                        <div class="title">
                            【{{item.title}}】
                        </div>
                        <div class="text">
                            {{item.content}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'the-notice',
    data () {
        return {
            slider: null,
            autoPlay: true,
            timer: null,
            interval: 2000,
            list: null
        };
    },
    computed: {},
    props: {
        listData: {
            type: Array
        }
    },
    watch: {
        listData () {
            this.init();
        }
    },
    created () {},
    mounted () {
        this.init();
    },
    destroyed () {
        clearTimeout(this.timer);
    },
    methods: {
        init () {
            this.list = this.listData;
            if (this.list && this.list.length > 0) {
                this.$refs.noticeList.style.width = this.list.length + '00%';
                this.$nextTick(() => {
                    this._slider();
                    this.$refs.noticeList.style.width = this.$refs.noticeList.children.length + '00%';
                });
            }
        },
        _slider () {
            this.slider = new BScroll(this.$refs.notice, {
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
            this._play();
        },
        _handerSliderListener () {
            this.slider.on('scrollEnd', () => {
                this._play();
            });
            this.slider.on('touchEnd', () => {
                this._play();
            });
        },
        _play () {
            if (this.autoPlay) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.slider.next();
                }, this.interval);
            }
        },
        openNotice () {
            this._clickCount('首页', '公告');
            this.$router.push({name: 'infonotice'});
        }
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.notice {
    border-bottom: 1px solid #7d2f00;
    height: 0.8666rem;
    .list {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 0.1rem;
        .icon {
            font-size: 0.4666rem;
            color: #e1c456;
            flex: 2;
        }
        .sliderlist {
            width: 100%;
            overflow: hidden;
            .item {
                display: flex;
                li{
                    width: 100%;
                    .title{
                        /*height: 0.3rem;*/
                        color: #e1c456;
                        font-size: 0.32rem;
                        overflow: hidden;
                        width: 100%;
                    }
                    .text {
                        /*padding-top: 0.1rem;*/
                        height: 0.4rem;
                        color: #fff;
                        font-size: 0.32rem;
                        overflow: hidden;
                        width: 100%;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp:1;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }

    }
}
</style>
