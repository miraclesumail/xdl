<template>
    <div class="elcontent">
        <div class="content">
            <div class="return" @click="returnPage">
                <span class="icon"></span>
                <span class="text">返回</span>
            </div>
            <div class="title">
                {{title}}
            </div>
        </div>
        <content-wrapper :options="options">
            <scroll-component>
                <div class="tabchange">
                    <div class="search">
                        <input type="search" v-model="searchInput" @keyup.enter="search">
                        <span class="iconfont icon-sousuo" @click="search"></span>
                    </div>
                    <tab-content :list="elList" :fnoptions="optionsFn">
                        <div class="" slot="0">
                            <the-all-game :list="gameAllList"></the-all-game>
                        </div>
                        <!--<div class="" slot="1">-->
                        <!--<the-hot-game :list="gameHotList"></the-hot-game>-->
                        <!--</div>-->
                        <div class="" slot="1">
                            <the-collect :list="gameCollectList"></the-collect>
                        </div>
                    </tab-content>
                </div>
            </scroll-component>
        </content-wrapper>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import TabContent from '@/components/tab-change/TabContent.vue';
import TheAllGame from './TheAllGame.vue';
import TheHotGame from './TheHotGame.vue';
import TheCollect from './TheCollect.vue';
import tool from '@/common/tool';
import {getGameGroupInfo, searchGame} from '@/common/api';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
export default {
    name: 'the-electronic',
    data () {
        return {
            title: this.$route.params.title,
            elList: [
                {
                    id: 0,
                    name: '全部游戏'
                },
                // {
                //     id: 1,
                //     name: '热门游戏'
                // },
                {
                    id: 1,
                    name: '我的最爱'
                }
            ],
            getGame: null,
            gameAllList: [],
            gameHotList: [],
            gameCollectList: [],
            optionsFn: {},
            searchInput: null,
            groupCode: null,
            options: {
                top: 1.5066,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        returnPage () {
            this.$router.push({name: 'lobby'});
        },
        search () {
            searchGame({
                name: this.searchInput,
                groupCode: Number(this.getGame.allId)
            }).then((res) => {
                this.gameAllList = res.data.filter((val, index, arr) => {
                    return val;
                });
                this.gameHotList = res.data.filter((val, index, arr) => {
                    return val;
                });
                this.gameCollectList = res.data.filter((val, index, arr) => {
                    return val;
                });
            });
        }
    },
    components: {
        ContentWrapper,
        TabContent,
        TheAllGame,
        TheHotGame,
        TheCollect,
        ScrollComponent
    },
    mounted () {
        getGameGroupInfo({ // 全部游戏
            code: Number(this.getGame.allId),
            requestCount: 1000
        }).then((res) => {
            res.data.games.gameList.forEach((val, index, arr) => {
                this.gameAllList.push(val.game);
                this.gameCollectList.push(val.game);
            });
        });
    },
    watch: {
        searchInput () {
            if (this.searchInput === '') {
                this.search();
            }
        }
    },
    created () {
        // this.STATEMENT({
        //     name: 'header',
        //     data: false
        // });
        console.log(this.$route.params);
        if (this.$route.params) {
            tool.setSessionStore('getGame', this.$route.params);
            this.getGame = this.$route.params;
            this.groupCode = this.$route.params;
        } else {
            this.getGame = tool.getSessionStore('getGame');
            this.groupCode = tool.getSessionStore('getGame');
        }
        if (this.$route.params.title) { // change account title
            tool.setSessionStore('ElTitle', this.$route.params.title);
            this.title = this.$route.params.title;
        } else {
            this.title = tool.getSessionStore('ElTitle');
        }
    }
    // beforeDestroy () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: true
    //     });
    // }
};
</script>

<style scoped lang="scss">
    $images: '../../../assets';
    .elcontent {
        height: 100%;
        /*position: relative;*/
        .content {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to bottom, #414141, #000);
            height: 1.5066rem;
            line-height: 1.5066rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #7d2f00;
            z-index: 20;
            .return {
                position: absolute;
                left: 0.4rem;
                top: 50%;
                transform: translate(0, -50%);
                display: flex;
                align-items: center;
                .icon {
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/left-arrow.png') no-repeat;
                    width: 0.32rem;
                    height: 0.5466rem;
                    background-size: 100% 100%;
                }
                .text {
                    padding-left: 0.15rem;
                    color: #ffffff;
                    font-size: 0.4rem;
                    font-weight: 600;
                }
            }
            .title {
                text-align: center;
                font-size: 0.50666rem;
                color: #ffffff;
                font-weight: 600;
            }
        }
        .search{
            position: absolute;
            right: 0.1rem;
            top: 0.15rem;
            width: 3rem;
            height: 0.7rem;
            z-index: 1;
            border: 1px solid #ffa200;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            input {
                width: 2.2rem;
                height: 0.6rem;
                border: none;
                background-color: transparent;
                font-size: 0.4rem;
                color: #fff;
                text-indent: 0.2rem;
            }
            .icon-sousuo{
                font-size: 0.7rem;
                color: #ffa200;
                width: 0.5rem;
                height: 0.6rem;
                display: flex;
                align-items: center;
                padding-right: 0.2rem;
            }
        }
        .tabchange {}
    }
</style>
