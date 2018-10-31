<template>
    <content-wrapper class="question_template_wrapper" :options="options">
        <common-header>{{ title }}</common-header>
        <scroll-component>
            <router-view></router-view>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import CommonHeader from '@/components/top-header/CommonHeader';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import tool from '@/common/tool';

export default {
    name: 'QuestionTemplate',
    data () {
        return {
            title: null,
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    components: {
        ContentWrapper,
        ScrollComponent,
        CommonHeader
    },
    mounted () {
        let t = this.$route.params.title;
        if (!t) {
            this.title = tool.getLocalStore('questionTitle');
        } else {
            tool.setLocalStore('questionTitle', t);
            this.title = t;
        }
    }
};
</script>

<style scoped lang="scss">
</style>
