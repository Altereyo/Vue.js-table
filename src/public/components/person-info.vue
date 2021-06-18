<template lang="pug">
.card.text-white.bg-dark.mb-3(ref='card')
    .card-header
        p
            b {{ person.firstName + &apos; &apos; + person.lastName}}
        button.close(type='button' @click='closeInfo()') &times;
    .card-body
        h3.card-title
            b Description:
        p.card-text {{ person.description }}
        p.card-text
            b Street adress: {{ person.address.streetAddress }}
        p.card-text
            b City: {{ person.address.city }}
        p.card-text
            b State: {{ person.address.state }}
        p.card-text
            b Zip: {{ person.address.zip }}

</template>

<script>
export default {
    props: ['person'],
    methods: {
        closeInfo() {
            this.$parent.personChosen = false
        }
    },
}
</script>

<style lang="sass">
.card
    margin: 0 auto 50px
    max-width: 95%

    &-header 
        border-bottom: 1px solid #4c535c
        p
            margin-bottom: 0
            float: left

    .close
        float: right
        text-shadow: none
        color: #fff
        outline: none
        margin-top: 13px

</style>