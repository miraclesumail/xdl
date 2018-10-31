<template>
    <div class="exclusive">
        <club-header></club-header>
        <div class="list" v-for="(item, index) in list" :key="index">
            <the-discount-detail :itemData="item"></the-discount-detail>
        </div>
    </div>
</template>

<script>
import TheDiscountDetail from '@/view/discount/children/TheDiscountList.vue';
import ClubHeader from '@/view/club/children/CulbHeader';
// import {levelWelfare} from '@/common/file_source';
// import {applyRewardEvent, getValidTopUpReturnRecordList} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapMutations} from 'vuex';
export default {
    name: 'exclusive',
    data () {
        return {
            list: []
        };
    },
    components: {
        ClubHeader,
        TheDiscountDetail
    },
    created () {
        this.init();
    },
    methods: {
        ...mapMutations(['MSGALERT']),
        init () {
            apiRequest('getRewardList', {
                service: 'reward',
                data: {}
            }).then((res) => {
                res.data.forEach((val, index) => {
                    if (val.code === 'sjyhhd') {
                        console.log(val);
                        val.list.forEach((val, index) => {
                            if (val.displayId === '爵士专享') {
                                this.list.push(val);
                            }
                        });
                    }
                });
            }).catch((res) => {
            });
        }
        // watchDetail (path, title) {
        //     this.$router.push({name: path, params: {title: title}});
        // },
        // apply (options) {
        //     if (options) {
        //         getValidTopUpReturnRecordList('payment', {
        //             startIndex: 0,
        //             requestCount: 100,
        //             sort: false,
        //             _isLoading: true
        //         }).then((res) => {
        //             if (res.data.records.length > 0) {
        //                 this.recordId = res.data.records[0]._id;
        //             } else {
        //                 this.MSGALERT({
        //                     text: '当前用户没有存款记录',
        //                     status: 'error'
        //                 });
        //                 return;
        //             }
        //             applyRewardEvent('reward', {
        //                 code: options.code,
        //                 data: {
        //                     topUpRecordId: this.recordId
        //                 }
        //             }).then((res) => {
        //                 this.MSGALERT({
        //                     text: '当前优惠申请成功',
        //                     status: 'success'
        //                 });
        //             });
        //         });
        //     } else {
        //         window.open('https://forchat999.com/chat/chatClient/chatbox.jsp?companyID=267&configID=205&jid=&s=1');
        //     }
        // },
        // goto (path, title) {
        //     this.$router.push({name: path, params: {title: title}});
        // }
    }
};
</script>

<style scoped lang="scss">
    .exclusive{
        padding: 0.2rem;
        .list {
            position: relative;
            font-size: 0;
            margin-top: 0.25rem;
            img{
                width: 100%;
                height: 100%;
            }
            .bottom {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 0.7333rem;
                background-color: rgba(000,000,000, 0.9);
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left{
                    font-size: 0.4rem;
                    color: #fff;
                    font-weight: bold;
                }
                .right{
                    font-size: 0.32rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    span:nth-child(1) {
                        color: #ffb006;
                        padding-right: 0.3rem;
                    }
                    span:nth-child(2){
                        background: linear-gradient(to bottom, #f41e1e, #910606);
                        height: 0.6rem;
                        line-height: 0.6rem;
                        width: 1.6rem;
                        text-align: center;
                        margin-right: 0.2rem;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>
