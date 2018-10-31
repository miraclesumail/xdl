<template>
    <div class="nav">
        <ul class="list">
            <li v-for="(item, index) in navList" :key="index" @click="open(item.path, item.title)">
                <div class="icon">
                    <img :src="_cdnLink + item.imgUrl" alt="">
                    <span v-if="item.dot" class="number" v-show="noUseNumber > 0">{{noUseNumber}}</span>
                </div>
                <div class="text">
                    {{item.title}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {nav} from '@/common/file_source';
// import {getPromoCode} from '@/common/api';
import {apiRequest} from '@/common/api/base';
import {mapState} from 'vuex';
export default {
    name: 'the-nav',
    data () {
        return {
            navList: nav,
            noUseNumber: 0
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        init () {
            if (this.userInfo) {
                apiRequest('getPromoCode', {
                    service: 'reward',
                    data: {}
                }).then((res) => {
                    this.noUseNumber = res.data.noUseList.length;
                });
            }
        },
        open (path, title) {
            this._clickCount('首页-优惠活动', title);
            if (this.userInfo) {
                this.$router.push({name: path});
            } else {
                if (path === 'jewel') {
                    this.$router.push({name: 'jewel', params: {active: 3}});
                } else {
                    this.$router.push({name: path});
                }
            }
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .nav {
        .list {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 3.1333rem;
            li {
                .icon {
                    width: 1.6533rem;
                    height: 1.6533rem;
                    margin: 0 auto 0.1rem;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .number {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        background-color: #b80000;
                        border: 1px solid #e05d5d;
                        border-radius: 5px;
                        color: #fff;
                        right: -0.2rem;
                        top: -0.2rem;
                        font-size: 0.25rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
                .text {
                    font-size: 0.4rem;
                    color: #fff;
                    font-weight: 600;
                }
            }
        }
    }
</style>
