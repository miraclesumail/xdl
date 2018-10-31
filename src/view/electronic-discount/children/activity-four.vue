<template>
    <div class="activitythree">
        <div class="at-control">
            <div><img src="https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/electronic-discount-1.png" /></div>
            <div class="at-c-btn" @click="apply('dzzsc')"><p>立即申请</p></div>
            <p>根据等级爵位赠送不同比例</p>
        </div>
        <div class="at-info">
            <div class="at-info-header">
                <img src="https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/electronic-discount-circle.png" />
                <p>优惠详情</p>
            </div>
            <div class="at-info-body">
                <div><p>活动时间：</p><p>4月1日00:00:00--8月31日23:59:59</p></div>
                <div><p>活动对象：</p><p>全体新得利会员</p></div>
                <div><p>活动申明：</p><p>限PT、DT、MG、ISB电子平台</p></div>
                <div><p>活动内容：</p><p>每周可申请一次</p></div>
                <table>
                    <tr>
                        <th>爵士等级</th>
                        <th>单笔存款</th>
                        <th>存送比例</th>
                        <th>最高红利</th>
                        <th>流水倍率</th>
                    </tr>
                    <tr>
                        <td>一星爵士</td>
                        <td>100元以上</td>
                        <td>50%</td>
                        <td>100元</td>
                        <td>15倍</td>
                    </tr>
                    <tr>
                        <td>二星男爵</td>
                        <td>100元以上</td>
                        <td>60%</td>
                        <td>200元</td>
                        <td>18倍</td>
                    </tr>
                    <tr>
                        <td>三星子爵</td>
                        <td>100元以上</td>
                        <td>80%</td>
                        <td>300元</td>
                        <td>20倍</td>
                    </tr>
                    <tr>
                        <td>四星伯爵</td>
                        <td>100元以上</td>
                        <td>100%</td>
                        <td>500元</td>
                        <td>25倍</td>
                    </tr>
                    <tr>
                        <td>五星侯爵</td>
                        <td>100元以上</td>
                        <td>150%</td>
                        <td>1500元</td>
                        <td>25倍</td>
                    </tr>
                    <tr>
                        <td>六星公爵</td>
                        <td>100元以上</td>
                        <td>150%</td>
                        <td>5000元</td>
                        <td>25倍</td>
                    </tr>
                    <tr>
                        <td>新得利王爵</td>
                        <td>100元以上</td>
                        <td>200%</td>
                        <td>10000元</td>
                        <td>30倍</td>
                    </tr>
                </table>
                <div><p>申请方式：</p><p>会员存款完成后，在电子优惠内选择相对应的优惠自助申请;</p></div>
                <div>
                    <p>注意事项：</p>
                    <ol class="block-element">
                        <li>此活动是按照爵士等级派发；</li>
                        <li>此活动每周可申请一次；</li>
                        <li>此活动适用于PT、 MG、 ISB 、DT电子老虎机平台；</li>
                        <li>此项优惠需要完成对应流水即可提款（最低提款金额100元）；</li>
                        <li>如果优惠未到账前已经进行投注，我们将视为您放弃本优惠；</li>
                        <li>此优惠与网站洗码优惠共享；</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import {paymentApiRequest} from '@/common/api/payment';
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
            paymentApiRequest('getValidTopUpReturnRecordList', {
                service: 'payment',
                data: {
                    startIndex: 0,
                    requestCount: 100,
                    sort: false,
                    _isLoading: true
                }
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
                apiRequest('applyRewardEvent', {
                    service: 'reward',
                    data: {
                        code: codeId,
                        data: {
                            topUpRecordId: this.recordId
                        }
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
