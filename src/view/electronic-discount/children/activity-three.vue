<template>
    <div class="activitytwo">
        <div class="header">
            <ul>
                <li v-for="(item, index) in electronicList" :key="index">
                    <img :src="_cdnLink +item.img" alt="">
                    <div class="btn" @click="apply(item.code)">
                        <span>立即申请</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="at-info">
            <div class="at-info-header">
                <img src="https://xdlftp.xindedom.life/images/mobile_image/electronic-discount-circle.png" />
                <p>优惠详情</p>
            </div>
            <div class="at-info-body">
                <div><p>活动时间：</p><p>北京时间2018年8月20日0:00:01--2018年9月1日00:00:00</p></div>
                <div><p>活动对象：</p><p>全体新得利会员</p></div>
                <div><p>活动申明：</p><p>本活动优惠不限制游戏平台；</p></div>
                <div><p>活动内容：</p><p></p></div>
                <table>
                    <tr>
                        <th>最低存款</th>
                        <th>优惠比例</th>
                        <th>流水倍率</th>
                        <th>当日累计最高红利</th>
                        <th>申请次数</th>
                    </tr>
                    <tr>
                        <td>100元</td>
                        <td>200%</td>
                        <td>100倍</td>
                        <td>500元</td>
                        <td>不限</td>
                    </tr>
                </table>
                <div><p>申请方式：</p><p>会员存款完成后，在优惠活动内选择相对应的优惠自助申请;</p></div>
                <div>
                    <p>注意事项：</p>
                    <ol class="block-element">
                        <li>此优惠不限制游戏平台；</li>
                        <li>此项优惠每日都可申请；</li>
                        <li>此项优惠需要完成对应流水即可提款（最低提款金额100元）；</li>
                        <li>如果优惠未到账前已经进行投注，我们将视为您放弃本优惠；</li>
                        <li>此优惠活动不与网站洗码优惠共享；</li>
                        <li>此项优惠活动只针对娱乐性质的会员，如发现用户拥有超过一个账户，包括同一姓名、同一邮件地址、同一/相似IP地址、同一住址、同一借记卡/信用卡、同一银行账户、同一电脑等其他任何不正常投注行为，一经发现，新得利将保留冻结您的账户；</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {electronicActivity} from '@/common/file_source';
import {applyRewardEvent, getValidTopUpReturnRecordList} from '@/common/api';
import {mapMutations} from 'vuex';
export default {
    name: 'activity-two',
    data () {
        return {
            electronicList: electronicActivity[2],
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
                        text: '当前优惠申请成功',
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
    .activitytwo{
        .header {
            ul{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 0.3rem;
                margin-bottom: 0.4rem;
                li{
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    img{
                        width: 3.933rem;
                    }
                    .btn{
                        margin-top: 0.2rem;
                        margin-bottom: 0.2rem;
                        height: 0.666rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 2.3rem;
                        background: linear-gradient(to bottom, #ed7d00, #c62600);
                        border-radius: 5px;
                        span{
                            color: #ffffff;
                            font-size: 0.4rem;
                        }
                    }
                }
            }
        }
        .at-info {
            color: #fff;
            font-size: .347rem;
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
                        width: 2.8rem;
                        font-weight: 600;
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

                .has-padding {
                    padding-left: .25rem;
                }
            }

            .text_indent {
                width: 95%;
                margin: 0 auto;
                margin-bottom: .25rem;
            }
        }
    }
</style>
