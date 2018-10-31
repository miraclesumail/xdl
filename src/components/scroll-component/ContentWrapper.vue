<!-- use this component can be setting webapp height and make it simple and good control-->
<template>
<div class="content-wrapper" :style="contentStyle">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'content-wrapper',
    data () {
        return {
            top: null,
            bottom: null,
            contentStyle: {
                // marginTop: `${this.options.top}rem`,
                // marginBottom: `${this.options.bottom}rem`,
                paddingTop: `${this.options.top}rem`,
                // paddingBottom: `${this.options.bottom}rem`,
                height: `calc(${100}% - ${this.options.top}rem - ${this.options.bottom}rem)`
                // height: `calc(${100}%)`
            }
        };
    },
    props: {
        options: {
            type: Object,
            default () {
                return {
                    top: 0,
                    bottom: 0
                };
            }
        }
    },
    watch: {},
    mounted () {}
};
</script>

<style scoped lang="scss">

</style>
