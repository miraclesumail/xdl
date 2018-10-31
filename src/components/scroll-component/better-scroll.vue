<template>
    <div class="scroll-wrapper" ref="ScrollWrapper">
        <div class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import BScroll from 'better-scroll'; // 模拟滚动 => search better-scroll github this is very awesome
export default {
    name: 'better-scroll',
    data () {
        return {
            scroll: null
        };
    },
    computed: {
        ...mapState(['stopBetterScrollMove'])
    },
    methods: {
        init () {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ScrollWrapper, {
                    scrollY: true,
                    click: true,
                    tap: true,
                    momentum: true,
                    bounce: true
                    // bounceTime: 500
                    // swipeTime: 600
                });

                this.scroll.on('beforeScrollStart', this.recalculate);
            });
        },
        recalculate () {
            this.scroll.refresh();
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        stopBetterScrollMove () {
            if (this.stopBetterScrollMove) {
                this.scroll.enable();
            } else {
                this.scroll.disable();
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .scroll-wrapper {
        height: 100%;
        .scroll-content{
            min-height: 100%;
        }
    }
</style>
