<template>
    <content-wrapper :options="options">
        <common-header>站内信</common-header>
        <scroll-component>
            <tab-change :list="optionList">
                <div class="" slot="0">
                    <the-unread-letter></the-unread-letter>
                </div>
                <div class="" slot="1">
                    <the-read-letter></the-read-letter>
                </div>
            </tab-change>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import TabChange from '@/components/tab-change/TabContent.vue';
import TheUnreadLetter from '@/view/info/children/TheUnreadLetter.vue';
import TheReadLetter from '@/view/info/children/TheReadLetter.vue';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
export default {
    name: 'the-letter',
    data () {
        return {
            optionList: [
                {
                    id: 0,
                    name: '未读'
                },
                {
                    id: 1,
                    name: '已读'
                }
            ],
            allLetter: null,
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    components: {
        TabChange,
        CommonHeader,
        TheUnreadLetter,
        TheReadLetter,
        ScrollComponent,
        ContentWrapper
    },
    methods: {}
};
</script>

<style scoped>

</style>
