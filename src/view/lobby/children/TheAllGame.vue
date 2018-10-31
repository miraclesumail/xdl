<template>
    <div class="gamecontent">
        <ul>
            <li v-for="(item, index) in gameList" :key="index">
                <img v-lazy="item.bigShow" alt="" @click='open(item.gameId)'>
                <div class="collect" @click="collect(item.gameId, item.isFavorite)">
                    <span class="icon" :class="item.isFavorite ? 'icon-active' : ''"></span>
                    <span class="text">{{item.name}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// import {
// getLoginURL,
// addFavoriteGame,
// removeFavoriteGame
// getTestLoginURL
// } from '@/common/api';
import {gameApiRequest} from '@/common/api/game';
import {mapMutations, mapState} from 'vuex';
import tool from '@/common/tool';
export default {
    name: 'the-all-game',
    data () {
        return {
            gameList: null,
            imgList: [],
            isWebView: false
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    props: {
        list: {
            type: Array
        }
    },
    methods: {
        ...mapMutations(['MSGMODAL', 'MSGALERT']),
        open (gameId) {
            this.isWebView = tool.webViewEnvironment(); // checking is webview
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
                    if (res.data.gameURL === '') {
                        this.MSGALERT({
                            text: '该游戏不支持手机端试玩',
                            status: 'error'
                        });
                        return false;
                    }
                    location.href = res.data.gameURL;
                }).catch((res) => {});
            } else {
                let ow = window.open('', '_blank');
                checkGame.then((res) => {
                    if (res.data.gameURL === '') {
                        this.MSGALERT({
                            text: '该游戏不支持手机端试玩',
                            status: 'error'
                        });
                        ow.close();
                        return false;
                    }
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
        collect (gameId, isFavorite) {
            if (isFavorite) {
                console.log(true);
                gameApiRequest('removeFavoriteGame', {
                    service: 'game',
                    data: {
                        gameId: gameId
                    }
                }).then((res) => {
                    this.MSGALERT({
                        text: '已取消收藏该游戏',
                        status: 'success'
                    });
                    this.gameList = this.gameList.filter((val, index, arr) => {
                        if (val.gameId === gameId) {
                            val.isFavorite = false;
                        }
                        return val;
                    });
                });
            } else {
                gameApiRequest('addFavoriteGame', {
                    service: 'game',
                    data: {
                        gameId: gameId
                    }
                }).then((res) => {
                    this.MSGALERT({
                        text: '游戏收藏成功',
                        status: 'success'
                    });
                    this.gameList = this.gameList.filter((val, index, arr) => {
                        if (val.gameId === gameId) {
                            val.isFavorite = true;
                        }
                        return val;
                    });
                    // getGameGroupInfo({
                    //     code: tool.getSessionStore('getGame').allId,
                    //     requestCount: 1000
                    // }).then((res) => {
                    //     this.gameList = res.data.games.gameList.filter((val, index, arr) => {
                    //         return val;
                    //     });
                    // });
                });
            }
        }
    },
    mounted () {
        this.gameList = this.list;
    },
    watch: {
        list () {
            this.gameList = this.list;
        }
    }
};
</script>

<style scoped lang="scss">
.gamecontent {
    ul{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-top: 0.3rem;
        li{
            display: flex;
            align-items: center;
            /*align-items: flex-start;*/
            flex-direction: column;
            justify-content: flex-start;
            margin: 0.1rem 0.1rem 0 0.1rem;
            height: 3.3rem;
            img{
                width: 2.0266rem;
                height: 1.933rem;
                border-radius: 5px;
            }
            .collect{
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 0.2rem;
                .icon{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/collection-icon.png') no-repeat;
                    background-size: 0.8rem 0.3466rem;
                    width: 0.3733rem;
                    height: 0.36rem;
                    background-position: 0 0;
                }
                .icon-active{
                    background-position: -0.4rem 0;
                }
                .text{
                    font-size: 0.4rem;
                    color: #fff;
                    width: 1.8rem;
                    text-align: center;
                }
            }
        }
    }
}
</style>
