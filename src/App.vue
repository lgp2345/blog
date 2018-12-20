<template>
    <div id="app">
        <Index></Index>
    </div>
</template>

<script>
    import Index from './views/Index.vue'
    export default{
        data(){
            return{

            }
        },
        components:{
            Index
        },
    }
</script>

<style lang="scss">
*{
    padding: 0;
    margin:0;
}
html,body{
    height: 100%;
}
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
