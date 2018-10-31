<template>
    <div class="gamelobby">
        <div class="title">
            <span class="icon"></span>
            <span class="text">游戏大厅</span>
        </div>
        <div class="list">
            <ul class="container">
                <li v-for="(item, index) in gameList" :key="index" @click="game(item.id)" v-if="item.isUse">
                    <div class="item">
                        <div class="imgbox">
                            <img :src="_cdnLink + item.imgUrl" alt="">
                            <div class="text-bottom">
                                <span>{{item.title}}</span>
                                <div>
                                    <span>进入</span>
                                    <span class="iconfont icon-jinru"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {gameLobby} from '@/common/file_source';
import {mapMutations} from 'vuex';
import {gameApiRequest} from '@/common/api/game';
export default {
    name: 'the-game',
    data () {
        return {
            gameList: gameLobby,
            gameData: []
        };
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        game (id) {
            this._clickCount('首页', '游戏大厅');
            if (id === 5) {
                this.MSGALERT({
                    text: '游戏制作中，敬请期待！',
                    status: 'success'
                });
                return false;
            }
            this.$router.push({
                name: 'lobby',
                params: {id: id}
            });
        },
        init () {
            gameApiRequest('getGameGroupTreeInfo', {
                service: 'game',
                data: {
                    containGames: true,
                    requestCount: 1000
                }
            }).then((res) => {
                // console.log(res);
                res.data.gameGroups[1].children.forEach((val, index) => {
                    console.log(val);
                });
            }).catch((res) => {
                console.log(res);
            });
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
$images: '../../../assets';
.gamelobby {
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.1333rem;
        /*background-color: #2b2b2b;*/
        border-top: 2px solid #f0b23a;
        border-bottom: 2px solid #f0b23a;
        margin: 0 0.466rem;
        .text {
            padding-left: 0.2rem;
            font-size: 0.533rem;
            font-weight: bold;
            background: linear-gradient(to right, #f6bd6d, #e89550);
            -webkit-background-clip: text;
            color: transparent;
        }
    }
    .list {
        .container {
            display: flex;
            flex-wrap: wrap;
            padding-top: 0.5rem;
            padding-left: 0.466rem;
            padding-right: 0.466rem;
            justify-content: space-between;
            li{
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                margin-bottom: 0.4rem;
                .item {
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 0 10px #554f32;
                    .imgbox {
                        width: 4.333rem;
                        height: 3.933rem;
                        position: relative;
                        /*border: 2px solid #b4a36a;*/
                        /*box-shadow: 0 0 5px 1px #f1f1f1;*/
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .text-bottom{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 1rem;
                            color: #ffffff;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 0.4rem;
                            background-color: rgba(000,000,000,0.7);
                            span{
                                padding: 0 0.1rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
