<template lang="pug">
.wrapper(ref='chooseWrapper')
    h1 Choose preferred table size:
    .buttons
        button#smallBtn(@click='chooseDB("small")') Small Table
        button#bigBtn(@click='chooseDB("big")') Big Table

</template>

<script>
export default {
    methods: {
        chooseDB(size) {
            this.$parent.currentDbSize = size
            this.$parent.getDb(size)
            this.$parent.sizeChosen = true
        }
    },
}
</script>

<style lang="sass">
.wrapper 
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    background-color: #fff
    position: absolute
    top: 0px
    left: 0px
    z-index: 999
    width: 100%
    height: 100%

    h1 
        margin-bottom: 20px
        font-weight: 700
    
    .buttons 
        button 
            height: 50px
            padding: 10px 15px
            border-radius: 5px
            margin: 0 10px
            border: none
            outline: none
            transition: .3s

            &:hover 
                transform: scale(1.2)
                border-radius: 10px
            
</style>