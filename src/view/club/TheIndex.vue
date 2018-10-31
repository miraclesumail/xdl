<template>
    <content-wrapper class="clubcontent" :options="options">
        <common-header>爵士俱乐部</common-header>
        <scroll-component>
            <tab-change :list="clubList">
                <div class="" slot="0">
                    <level></level>
                </div>
                <div class="" slot="1">
                    <salary></salary>
                </div>
                <div class="" slot="2">
                    <exclusive></exclusive>
                </div>
            </tab-change>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import TabChange from '@/components/tab-change/TabContent';
import Level from '@/view/club/children/level.vue';
import Salary from '@/view/club/children/salary.vue';
import Exclusive from '@/view/club/children/exclusive.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations} from 'vuex';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
export default {
    name: 'the-index',
    data () {
        return {
            clubList: [
                {
                    id: 0,
                    name: '我的爵位'
                },
                {
                    id: 1,
                    name: '爵士俸禄'
                },
                {
                    id: 2,
                    name: '专享优惠'
                }
            ],
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    components: {
        TabChange,
        Level,
        Salary,
        Exclusive,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    // mounted () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: false
    //     });
    // },
    // beforeDestroy () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: true
    //     });
    // },
    methods: {
        ...mapMutations(['STATEMENT'])
    }
};
</script>

<style scoped lang="scss">

</style>
