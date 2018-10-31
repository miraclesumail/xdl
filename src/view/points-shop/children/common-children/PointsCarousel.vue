<template>
    <div class="points-carousel-wrapper">
        <div ref="wrapper">
            <ul class="wrapper" ref="wrapperList">
                <li v-for="(v, i) in carouselData" :key="i">
                    <img :src="v.img" />
                </li>
            </ul>
        </div>
        <div class="dots">
            <span v-for="(v, i) in carouselData" :key="i" :class="'dot' + (currentIndex === i ? ' active' : '')"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: 'points-carousel',
    data () {
        return {
            slider: null,
            autoPlay: true,
            timer: null,
            interval: 2500,
            currentIndex: 0
        };
    },
    props: {
        carouselData: {
            type: Array,
            required: true
        }
    },
    methods: {
        initSlider () {
            this.slider = new BScroll(this.$refs.wrapper, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: true,
                    threshold: 0.1,
                    speed: 500,
                    autoPlay: true
                },
                bounce: false,
                stopPropagation: true,
                tap: true,
                click: true
            });

            this.$nextTick(() => {
                let wrapper = this.$refs.wrapperList;
                let childrenList = wrapper.children;
                wrapper.style.width = childrenList.length + '00%';
                this.init();
            });
        },
        init () {
            if (this.autoPlay) {
                this.startCarousel();
            }
            this.slider.on('touchEnd', () => {
                this.startCarousel();
                this.currentIndex = this.slider.getCurrentPage().pageX;
            });
            this.slider.on('scrollEnd', () => {
                this.startCarousel();
                this.currentIndex = this.slider.getCurrentPage().pageX;
            });
        },
        startCarousel () {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.slider.next();
            }, this.interval);
        }
    },
    mounted () {
        this.initSlider();
    },
    beforeDestroy () {
        clearTimeout(this.timer);
    }
};
</script>

<style scoped lang="scss">
    .points-carousel-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;

        .wrapper {
            height: 3.866rem;
            display: flex;

            li {
                width: 100%;
                height: 100%;
                overflow: hidden;

                > img {
                    width: 100%;
                }
            }
        }

        .dots {
            position: absolute;
            right: .266rem;
            bottom: .293rem;
            display: flex;

            .dot {
                width: .24rem;
                height: .24rem;
                margin: 0 .093rem;
                display: block;
                background-color: #fff;
                border: .026rem solid #fff;
                border-radius: 50%;
                box-sizing: border-box;

                &.active {
                    background-color: #6d6d6d;
                }
            }
        }
    }
</style>
