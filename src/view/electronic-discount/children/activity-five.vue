<template>
    <div class="activitythree">
        <div class="at-control">
            <div><img src="https://xdlftp.xindedom.life/images/mobile_image/activity/promo-four-1.png?v=201807120600" /></div>
            <div class="at-c-btn" @click="apply('mryc10s10')"><p>立即申请</p></div>
        </div>
        <div class="at-info">
            <div class="at-info-header">
                <img src="https://xdlftp.xindedom.life/images/mobile_image/electronic-discount-circle.png" />
                <p>优惠详情</p>
            </div>
            <div class="at-info-body">
                <div><p>活动时间：</p><p>7月12日00:00:00--8月31日23:59:59</p></div>
                <div><p>活动对象：</p><p>全体新得利会员</p></div>
                <div><p>活动申明：</p><p>本活动只限PT、DT、MG、ISB电子平台</p></div>
                <div><p>活动内容：</p><p>本活动每日只可申请一次</p></div>
                <table>
                    <tr>
                        <th>单笔存款</th>
                        <th>优惠金额</th>
                        <th>流水倍率</th>
                        <th>提款要求</th>
                    </tr>
                    <tr>
                        <td>10元</td>
                        <td>10元</td>
                        <td>无需流水</td>
                        <td>达到100元以上即可出款</td>
                    </tr>
                </table>
                <div>
                    <p>申请方式：</p>
                    <p>会员存款完成后，在电子优惠内选择相对应的优惠自助申请;</p>
                </div>
                <div>
                    <p>注意事项：</p>
                    <ol class="block-element">
                        <li>此活动每日都可申请一次；</li>
                        <li>此活动适用于PT、 MG、 ISB 、DT电子老虎机平台；</li>
                        <li>此项优惠无需完成流水，达到100元以上即可出款；</li>
                        <li>如果优惠未到账前已经进行投注，我们将视为您放弃本优惠；</li>
                        <li>此优惠不与网站洗码优惠共享；</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {applyRewardEvent, getValidTopUpReturnRecordList} from '@/common/api';
import {mapMutations} from 'vuex';
export default {
    name: 'activity-three',
    data () {
        return {
            recordId: null
        };
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        apply (codeId) {
            getValidTopUpReturnRecordList('payment', {
                startIndex: 0,
                requestCount: 100,
                sort: false,
                _isLoading: true
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
                // this.recordId = res.data.records[0]._id;
                applyRewardEvent('reward', {
                    code: codeId,
                    data: {
                        topUpRecordId: this.recordId
                    }
                }).then((res) => {
                    this.MSGALERT({
                        text: '已经为您赠送' + res.data.rewardAmount + '元彩金',
                        status: 'success'
                    });
                });
            });
        }
    },
    mounted () {
    }
};
</script>

<style scoped lang="scss">
    .activitythree {
        color: #fff;
        font-size: .347rem;

        .at-control {
            margin: .5rem 0;
            text-align: center;

            img { width: 3.933rem; }

            .at-c-btn {
                margin-right: auto;
                margin-left: auto;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
                height: 0.666rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.3rem;
                background: linear-gradient(to bottom, #ed7d00, #c62600);
                border-radius: 5px;
                p{
                    color: #ffffff;
                    font-size: 0.4rem;
                }
            }
        }

        .at-info {
            width: 95%;
            margin: 0 auto;

            .at-info-header {
                position: relative;
                top: 1px;
                padding: .2rem .2rem;
                display: inline-block;
                background: #000;
                background: linear-gradient(#444444, #000);
                border: 1px solid #fff;
                border-bottom: none;
                border-radius: .25rem .25rem 0 0;

                > * {
                    display: inline-block;
                    vertical-align: middle;
                }

                img { width: .507rem }
                p { color: #fca000; }

            }

            .at-info-body {
                margin-bottom: .5rem;
                background: #000000;
                background: linear-gradient(#1b1b1b, #000000);
                border: 1px solid #fff;
                border-radius: 0 0 .25rem .25rem;

                > * {
                    margin: .3rem 0;
                }

                > div {
                    > * {
                        display: inline-block;
                        vertical-align: top;

                        &:first-child {
                            width: 25%;
                            text-align: center;
                        }

                        &:last-child {
                            width: 70%;

                            &.block-element {
                                width: 95%;
                                margin: 0 auto;
                            }
                        }
                    }
                }

                table {
                    width: 95%;
                    margin: 0 auto;
                    th, td {
                        text-align: center;
                    };
                    th {
                        color: #000;
                        background-color: #ffcf43;
                        border: 1px solid #ffcf43;
                        height: 0.7rem;
                    }

                    td {
                        padding: .25rem 0 ;
                        border: 1px solid #fff;
                    }
                }

                ol {
                    width: 90% !important;
                    padding-left: .7rem;
                    li {
                        margin: .2rem 0;
                        list-style: decimal;
                    }
                }
            }
        }
    }
</style>
