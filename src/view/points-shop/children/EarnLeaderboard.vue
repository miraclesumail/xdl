<template>
    <div class="earn-ranks-wrapper">
        <div class="ranks-header">
            <span class="points-sprite i-colored-border"></span>
            <p>积分排行榜</p>
            <span class="points-sprite i-colored-border rotate-me"></span>
        </div>
        <div class="details-body">
            <div class="current-points">
                <p>当前积分排名：</p>
                <div class="points-value-bg">
                    <div class="value-wrapper">
                        <p>{{currentRank}}</p>
                    </div>
                </div>
            </div>
            <div class="logs-table">
                <table>
                    <tr>
                        <th>
                            <div class="header-item">
                                <p>积分排名</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>账户名</p>
                            </div>
                        </th>
                        <th>
                            <div class="header-item">
                                <p>积分</p>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(v, i) in rankList" :key="i">
                        <td>
                            <span v-if="(i + 1) < 4" :class="'points-sprite rank-img i-rank-' + (i + 1)"></span>
                            <p v-else>{{ (i + 1) }}</p>
                        </td>
                        <td><p>{{ v.name }}</p></td>
                        <td><p>{{ v.integral }}</p></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {getMissonList} from '@/common/point_shop_api';
export default {
    name: 'earn-leaderboard',
    data () {
        return {
            rankList: [],
            currentPoint: null,
            currentRank: null
        };
    },
    methods: {
        init () {
            getMissonList('rewardPoints', {
            }).then((res) => {
                this.currentPoint = res.data.playerPointInfo[0].totalPoint;
                this.currentRank = res.data.playerPointInfo[0].rank;
                this.rankList = res.data.pointRanking.filter((val, index) => {
                    val.integral = val.totalPoint;
                    val.name = val.account;
                    return val;
                });
            }).catch((res) => {
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .i-colored-border {
        width: 5.506rem;
        height: .173rem;
        background-position: 0 -.92rem;
    }

    .i-rank-1 {
        width: .6rem;
        height: .786rem;
        background-position: 0 -1.13rem;
    }

    .i-rank-2 {
        width: .59rem;
        height: .626rem;
        background-position: -.64rem -1.133rem;
    }

    .i-rank-3 {
        width: .4rem;
        height: .693rem;
        background-position: -1.24rem -1.133rem;
    }

    .earn-ranks-wrapper {
        background-color: #0c0c0c;

        .ranks-header {
            padding: .466rem 0;
            display: flex;
            align-items: center;
            flex-direction: column;

            > p {
                color: #fff;
                font-size: .6rem;
            }

            .rotate-me {
                transform: rotateX(180deg)
            }
        }

        .details-body {
            display: flex;
            align-items: center;
            flex-direction: column;

            .current-points {
                margin-bottom: .333rem;
                color: #fff;
                font-size: .333rem;
                line-height: .333rem;
                display: flex;
                align-items: center;

                .points-value-bg {
                    padding: .053rem;
                    background: linear-gradient(#fbe5ad, #dba103, #9c6c00, #f1ede3);
                    border-radius: .133rem;

                    .value-wrapper {
                        padding: .066rem .106rem;
                        background-color: #0c0c0c;
                        border-radius: .066rem;

                        > p {
                            font-size: .4rem;
                            font-weight: 700;
                        }
                    }
                }
            }

            .logs-table {
                width: 9.24rem;
                text-align: center;
                background: linear-gradient(#393a3a, #0c0c0c);
                border: .026rem solid #ed145b;

                table {
                    width: 100%;

                    tr:last-child {
                        > td {
                            padding-bottom: .333rem;
                        }
                    }

                    th {
                        height: 1.786rem;

                        .header-item {
                            width: 2.133rem;
                            height: .746rem;
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #686868;
                            border-radius: .2rem;

                            > p {
                                color: #fff;
                                font-size: .4rem;
                                font-weight: 700;
                                line-height: .43rem;
                            }
                        }
                    }

                    td {
                        height: 1rem;
                        color: #fff;
                        font-size: .333rem;

                        .rank-img {
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
    }
</style>
