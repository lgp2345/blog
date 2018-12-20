<template>
    <div class="index">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-slide" v-for="item in list" :key="item.enddate">
                <img :src="`https://www.bing.com${item.url}`" :alt="item.copyright">
                <!-- <p>{{item.enddate}}</p> -->
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'index',
    data(){
        return{
            idx:0,  //idx表示请求的天数序列(倒序);0代表今天、1代表昨天…以此类推
            num:6,  //n表示请求的天数数量(请求几天的图片);1为当天一天、2为昨天和今天
            list:[],
            swiperOption:{
                speed:2000,
                autoHeight:true,    //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
                autoplay: {
                    delay: 4000,
                    disableOnInteraction:false,
                    // reverseDirection: true,
                },
                effect:'fade',
                fadeEffect: {
                    crossFade: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    hideOnClick: true,
                },
                //滑到最后一个隐藏前进按钮
                on: {
                    slideChangeTransitionEnd(){
                        if(this.isEnd){
                            this.navigation.$nextEl.css('display','none');
                        }else{
                            this.navigation.$nextEl.css('display','block');  
                        }
                    },
                    slideChangeTransitionEnd(){
                        //最后一页
                        if(this.isEnd){
                             //请求历史数据
                            this.vue.requestBingImg().then(function(data){
                                this.list=this.list.concat(data);
                            }.bind(this.vue))
                        }
                    },
                },
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        requestBingImg(){
            return new Promise((resolve,reject)=>{
                this.$http.get('/bing/HPImageArchive.aspx',{
                    params:{
                        format:'js',
                        idx:this.idx,  
                        n:this.num,    
                    }
                }).then((res)=>{
                    if(res.images){
                        resolve(res.images);
                        //请求完成后，下次请求的序号改变
                        this.idx=this.idx+this.num;
                    }
                })
            })
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    watch:{
        list(newValue){
            // console.log(newValue)
        }
    },
    created(){
        this.requestBingImg().then(function(data){
            this.list=data;
        }.bind(this))
    },
    mounted(){
        if(this.swiper){
            this.swiper.vue=this;
        }
    }
}
</script>

<style lang="scss">
.index{
    // display: flex;
    // flex-direction: column;
    flex: 1;
    overflow: hidden;
    // .swiper-container{
    //     .swiper-slide{
    //        p{
    //            position: absolute;
    //            left: 50%;
    //            top: 0;
    //            color: #000;
    //            font-size: 30px;
    //            font-weight: bold;
    //        }
    //     }
    // }
}
</style>

