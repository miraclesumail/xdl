<template>
    <div>
        <app-header>修改DT客户端账户密码</app-header>
        <div class="bank">
            <ul>
                <li>
                    <div class="left">账户名</div>
                    <div class="right">
                        <input type="text" v-model="userName" disabled>
                    </div>
                </li>
                <li>
                    <div class="left">新密码</div>
                    <div class="right">
                        <input type="text" v-model="password">
                    </div>
                </li>
                <li>
                    <div class="left">确认新密码</div>
                    <div class="right">
                        <input type="text" v-model="confirmPassword">
                    </div>
                </li>
                <li>
                    <div class="btn" @click="submit">
                        <span>提交</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import {getGamePassword, modifyGamePassword} from '@/common/api';
import {gameApiRequest} from '@/common/api/game';
import {mapMutations, mapState} from 'vuex';
import AppHeader from '@/components/top-header/CommonHeader.vue';
export default {
    name: 'the-edit-bank',
    data () {
        return {
            userName: null,
            password: null,
            confirmPassword: null
        };
    },
    computed: {
        ...mapState([''])
    },
    mounted () {},
    created () {
        this.init();
    },
    methods: {
        ...mapMutations(['STATEMENT', 'MSGALERT']),
        init () {
            gameApiRequest('getGamePassword', {
                service: 'game',
                data: {
                    providerId: 45
                }
            }).then((res) => {
                this.userName = res.data.gameUsername;
            });
        },
        submit () {
            if (this.password !== this.confirmPassword) {
                this.MSGALERT({
                    text: '密码和确认密码不一样',
                    status: 'error'
                });
                return false;
            }
            gameApiRequest('modifyGamePassword', {
                service: 'game',
                data: {
                    providerId: 45,
                    newPassword: this.password
                }
            }).then((res) => {
                this.MSGALERT({
                    text: '密码修改成功',
                    status: 'success'
                });
                this.$router.back();
            });
        }
    },
    components: {
        AppHeader
    }
};
</script>

<style scoped lang="scss">
$images: '../../assets';
.bank {
    border: 1px solid #fea100;
    margin: 0.3rem 0.2rem;
    ul{
        padding: 0.46666rem;
        background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat;
        background-size:0.58666rem 1.0666rem;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.4rem;
            .left{
                font-size: 0.4rem;
                color: #fff;
                font-weight: 600;
            }
            .right{
                height:0.6666rem;
                border: 1px solid #fff;
                width: 6.5066rem;
                background:linear-gradient(to bottom, #0b0b0b, #161616);
                border-radius: 5px;
                display: flex;
                align-items: center;
                overflow: hidden;
                input{
                    outline: none;
                    background: transparent;
                    font-size: 0.4rem;
                    color: #ffa200;
                    border: none;
                    padding-left: 0.2rem;
                    width: 100%;
                }
                select{
                    outline: none;
                    border: none;
                    background: none;
                    color: #ffa200;
                    font-size: 0.4rem;
                    width: 100%;
                }
                span{
                    color: #ffa200;
                    font-size: 0.4rem;
                    width: 100%;
                    padding-left: 0.2rem;
                }
            }
            .btn {
                margin: 0.2rem auto 0;
                width: 50%;
                height:0.8rem;
                background: linear-gradient(to bottom, #ee7e00, #c72700);
                font-size: 0.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                border-radius: 5px;
            }
        }
        .smscode {
            .right{
                border: none;
                height: 0.75rem;
                background: none;
                display: flex;
                align-items: center;
                padding-right: 0.06rem;
                input{
                    outline: none;
                    background:linear-gradient(to bottom, #0b0b0b, #161616);
                    font-size: 0.4rem;
                    color: #ffa200;
                    border: 1px solid #fff;
                    padding-left: 0.2rem;
                    height: 0.6666rem;
                    width: 40%;
                    border-radius: 5px;
                }
                span{
                    font-size: 0.32rem;
                    color: #fff;
                    height: 0.7rem;
                    width: 2rem;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(to bottom, #ee7e00, #c72700);
                    margin-left: 0.2rem;
                    padding: 0;
                }
            }
        }
    }
}
</style>
