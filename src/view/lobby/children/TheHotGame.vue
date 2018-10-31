<template>
    <div class="gamecontent">
        <ul>
            <li v-for="(item, index) in gameList" :key="index" >
                <img v-lazy="item.game.bigShow" alt="" @click='open(item.game.gameId)'>
                <div class="collect" @click="collect(item.game.gameId, item.game.isFavorite)">
                    <span class="icon" :class="item.game.isFavorite ? 'icon-active' : ''"></span>
                    <span class="text">{{item.game.name}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {getLoginURL, removeFavoriteGame, addFavoriteGame} from '@/common/api';
// import {gameApiRequest} from '@/common/api/game';
import {mapMutations} from 'vuex';
export default {
    name: 'the-hot-game',
    data () {
        return {
            gameList: this.list
        };
    },
    props: {
        list: {
            type: Array
        }
    },
    methods: {
        ...mapMutations(['MSGMODAL', 'MSGALERT']),
        open (gameId) {
            getLoginURL({
                gameId: gameId,
                clientDomainName: location.origin,
                clientType: 2
            }).then((res) => {
                console.log(res);
                window.open(res.data.gameURL);
            });
        },
        collect (gameId, isFavorite) {
            if (isFavorite) {
                console.log(true);
                removeFavoriteGame({
                    gameId: gameId
                }).then((res) => {
                    this.MSGALERT({
                        text: '已取消收藏该游戏',
                        status: 'success'
                    });
                    this.gameList = this.gameList.filter((val, index, arr) => {
                        if (val.game.gameId === gameId) {
                            val.game.isFavorite = false;
                        }
                        return val;
                    });
                });
            } else {
                addFavoriteGame({
                    gameId: gameId
                }).then((res) => {
                    this.MSGALERT({
                        text: '游戏收藏成功',
                        status: 'success'
                    });
                    this.gameList = this.gameList.filter((val, index, arr) => {
                        if (val.game.gameId === gameId) {
                            val.game.isFavorite = true;
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
            margin: 0.2rem 0 0 0.1rem;
            height: 3.5rem;
            img{
                width: 2.0266rem;
                height: 1.933rem;
                border-radius: 5px;
            }
            .collect {
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
                    width: 1.9rem;
                    text-align: center;
                }
            }
        }
    }
}
</style>
