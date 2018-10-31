<template>
    <div class="tab" id="appTab" ref="bottomel">
        <ul>
            <router-link tag="li" to="/home" @click.native="clickCount('首页')">
                <div class="icon">
                </div>
            </router-link>
            <router-link tag="li" to="/lobby" @click.native="clickCount('大厅')">
                <div class="icon">
                </div>
            </router-link>
            <router-link tag="li" to="/deposit" @click.native="clickCount('存取款')">
                <div class="icon">
                </div>
            </router-link>
            <router-link tag="li" to="/account" @click.native="clickCount('账户')">
                <div class="icon">
                </div>
            </router-link>
            <router-link tag="li" to="/cs" @click.native="clickCount('客服')">
                <div class="icon">
                </div>
            </router-link>
            <!--<li @click="cs" :class="$store.state.openCs ? 'router-link-active' : ''">-->
                <!--<div class="icon">-->
                <!--</div>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'app-tab',
    data () {
        return {
            // isCs: false
        };
    },
    mounted () {
        this.init();
    },
    computed: {
        ...mapState(['routerClass'])
    },
    methods: {
        clickCount (name) {
            this._clickCount('底部按钮', name);
            return false;
        },
        init () {
            /*
           * 处理底部软键盘弹起导致元素错误问题 //TODO 有bug
           * */
            this.$nextTick(() => {
                let h = document.documentElement.clientHeight || document.body.clientHeight;
                window.addEventListener('resize', () => {
                    if (document.documentElement.clientHeight < h) {
                        this.$refs.bottomel.style.display = 'none';
                    } else {
                        this.$refs.bottomel.style.display = 'block';
                    }
                });
            });
        }
    }
};
</script>

<style scoped lang="scss">
$images: '../../assets';
.tab {
    ul{
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 31;
        width: 100%;
        height: 1.733rem;
        background-color: #151515;
        display: flex;
        li{
            width: 2rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon{
                background: url('https://xdlftp.xindedom.life/images/mobile_image/bottom_nav.png') no-repeat;
                background-size: 6rem 2.29333rem;
                width: 0.8rem;
                height:1.133rem;
            }
        }
        li:nth-child(1) {
            .icon {
                background-position: 0 -1.133rem;
            }
        }
        li:nth-child(2) {
            .icon {
                background-position: -1.16rem -1.133rem;
            }
        }
        li:nth-child(3) {
            .icon {
                width: 1.1866rem;
                background-position: -2.4133rem -1.133rem;
            }
        }
        li:nth-child(4) {
            .icon {
                background-position: -4rem -1.133rem;
            }
        }
        li:nth-child(5) {
            .icon {
                background-position: -5.1466rem -1.133rem;
            }
        }
        li:nth-child(1).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: 0 0;
            }
        }
        li:nth-child(2).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -1.16rem 0;
            }
        }
        li:nth-child(3).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -2.4133rem 0;
            }
        }

        li:nth-child(4).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -4rem 0;
            }
        }

        li:nth-child(5).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -5.1466rem 0;
            }
        }
        /*li:nth-child(1).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: 0 0;
            }
        }
        li:nth-child(2).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -1.16rem 0;
            }
        }
        li:nth-child(3).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -2.4133rem 0;
            }
        }

        li:nth-child(4).router-link-active{
            background:linear-gradient(to bottom, #ffe058, #db7b1c);
            .icon {
                background-position: -4rem 0;
            }
        }*/
    }
}
</style>
