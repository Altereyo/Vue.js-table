<template lang="pug">
div
    .spinner
        //- архитектура блока взята с loading.io
        .spinnerFirstWrapper
            .spinnerSecondWrapper
                div
                div
                    div
    .clearfix(:style='countTableHeight')

</template>

<script>
export default {
    props: ['countTableHeight']
}
</script>

<style lang="sass">
.spinner
    position: absolute
    top: 200px
    left: calc(50% - 125px)

    // все стили ниже взяты с loading.io
    @keyframes spinnerSecondWrapper
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg) 


    .spinnerSecondWrapper div
        box-sizing: border-box!important
    .spinnerSecondWrapper > div 
        position: absolute
        width: 155px
        height: 155px
        top: 47.5px
        left: 47.5px
        border-radius: 50%
        border: 5px solid #000
        border-color: #353a40 transparent #353a40 transparent
        animation: spinnerSecondWrapper 1s linear infinite
    
    .spinnerSecondWrapper > div:nth-child(2)  
        border-color: transparent 
    .spinnerSecondWrapper > div:nth-child(2) div 
        position: absolute
        width: 100%
        height: 100%
        transform: rotate(45deg)
    
    .spinnerSecondWrapper > div:nth-child(2) div:before, .spinnerSecondWrapper > div:nth-child(2) div:after  
        content: ""
        display: block
        position: absolute
        width: 5px
        height: 5px
        top: -5px
        left: 70px
        background: #353a40
        border-radius: 50%
        box-shadow: 0 150px 0 0 #353a40
    
    .spinnerSecondWrapper > div:nth-child(2) div:after  
        left: -5px
        top: 70px
        box-shadow: 150px 0 0 0 #353a40
    
    .spinnerFirstWrapper
        width: 250px
        height: 250px
        display: inline-block
        overflow: hidden
        background: #fff
    
    .spinnerSecondWrapper 
        width: 100%
        height: 100%
        position: relative
        transform: translateZ(0) scale(1)
        backface-visibility: hidden
        transform-origin: 0 0
    
    .spinnerSecondWrapper div 
        box-sizing: content-box

</style>