<!--面包屑弹窗组件-->
<template>
    <div class="toast">
        <toast-children v-for="(item, index) in msgAlert" :key="index"
                        :msg="{msgText:item.text,msgIcon:item.status,msgIdx:index}"></toast-children>
    </div>
</template>
<script>
import ToastChildren from './AppToastChildren';
import {mapState} from 'vuex';

export default {
    name: 'toast',
    data () {
        return {};
    },
    computed: {
        ...mapState(['msgAlert'])
    },
    components: {
        ToastChildren
    }
};
</script>
<style scoped lang="scss"></style>
