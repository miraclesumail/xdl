<template>
<content-wrapper class="elcontent" :options="options">
    <common-header>电子优惠</common-header>
    <scroll-component>
        <tab-change :list="discountList">
            <div class="" slot="0">
                <activity-one></activity-one>
            </div>
            <div class="" slot="1">
                <activity-two></activity-two>
            </div>
            <div class="" slot="2">
                <activity-three></activity-three>
            </div>
            <div class="" slot="3">
                <activity-four></activity-four>
            </div>
            <div class="" slot="4">
                <activity-five></activity-five>
            </div>
        </tab-change>
    </scroll-component>
</content-wrapper>
</template>

<script>
import TabChange from '@/components/tab-change/TabContent';
import ActivityOne from '@/view/electronic-discount/children/activity-one.vue';
import ActivityTwo from '@/view/electronic-discount/children/activity-two.vue';
import ActivityThree from '@/view/electronic-discount/children/activity-three.vue';
import ActivityFour from '@/view/electronic-discount/children/activity-four.vue';
import ActivityFive from '@/view/electronic-discount/children/activity-five.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations} from 'vuex';
export default {
    name: 'the-index',
    data () {
        return {
            discountList: [
                {
                    id: 0,
                    name: '小福星'
                },
                {
                    id: 1,
                    name: '笔笔存'
                },
                {
                    id: 2,
                    name: '挑战赛'
                },
                {
                    id: 3,
                    name: '周首存'
                },
                {
                    id: 4,
                    name: '每日存'
                }
            ],
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
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
    },
    components: {
        TabChange,
        ActivityOne,
        ActivityTwo,
        ActivityThree,
        ActivityFour,
        ActivityFive,
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    }
};
</script>

<style scoped lang="scss">

</style>
