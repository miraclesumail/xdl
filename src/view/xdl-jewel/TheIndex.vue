<template>
    <content-wrapper class="gem" :options="options">
        <common-header>得利宝石</common-header>
        <scroll-component>
            <tab-content :list="gemList" :activePage="this.$route.params.active" :fnoptions="fn">
                <div class="" slot="0">
                    <the-unused></the-unused>
                </div>
                <div class="" slot="1">
                    <the-use></the-use>
                </div>
                <div class="" slot="2">
                    <the-expire></the-expire>
                </div>
                <div class="" slot="3">
                    <the-info></the-info>
                </div>
            </tab-content>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import TabContent from '@/components/tab-change/TabContent';
import TheUnused from '@/view/xdl-jewel/children/TheUnused.vue';
import TheUse from '@/view/xdl-jewel/children/TheUse.vue';
import TheExpire from '@/view/xdl-jewel/children/TheExpire.vue';
import TheInfo from '@/view/xdl-jewel/children/TheInfo.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations, mapState} from 'vuex';
// import {getPromoCode} from '@/common/api';
export default {
    name: 'the-index',
    data () {
        return {
            gemList: [
                {
                    id: 0,
                    name: '未使用'
                },
                {
                    id: 1,
                    name: '已使用'
                },
                {
                    id: 2,
                    name: '已过期'
                },
                {
                    id: 3,
                    name: '宝石详情'
                }
            ],
            deliData: null,
            active: 0,
            useList: null,
            unUseList: null,
            expiredList: null,
            fn: {
                0: {
                    runFn: () => {
                    }
                },
                1: {
                    runFn: () => {
                    }
                },
                2: {
                    runFn: () => {
                    }
                }
            },
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    mounted () {},
    created () {
        this.init();
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        init () {
            // if (this.userInfo) {
            //     getPromoCode({
            //         // playerId: this.userInfo.playerId
            //     }).then((res) => {
            //         // this.deliData = res.data;
            //         // console.log(this.deliData);
            //         this.unUseList = res.data.noUseList;
            //         this.useList = res.data.usedList;
            //         this.expiredList = res.data.expiredList;
            //     });
            // }
        }
    },
    components: {
        TabContent,
        TheUnused,
        TheUse,
        TheExpire,
        TheInfo,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    }
};
</script>

<style scoped>

</style>
