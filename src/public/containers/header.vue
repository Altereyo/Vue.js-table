<template lang="pug">
nav.navbar.navbar-dark.bg-dark
    div
        button.btn.btn-outline-info(@click='switchDB()') Switch DB size to {{ switchSizeTo }}
        button#addPersonBtn.btn.btn-outline-info(data-bs-toggle='modal' data-bs-target='#addPerson') Add person
    #search
        input.form-control(type='search' @change='searchItem()' v-model='filterValue')
        button.btn.btn-outline-info(@click='searchItem()') Search

</template>

<script>
export default {
    data() {
        return {
            filterValue: ''
        }
    },
    methods: {
        searchItem() {
            if (this.filterValue == '') {
                this.$parent.database = this.$parent.defaultDb
            } else {
                this.$parent.database = this.$parent.defaultDb.filter((person) => {
                    if (String(person.id).includes(this.filterValue) ||
                        person.firstName.includes(this.filterValue) ||
                        person.lastName.includes(this.filterValue) ||   
                        person.email.includes(this.filterValue) ||
                        person.phone.includes(this.filterValue)
                    ) { return true }
                })
            }
            this.$parent.$children.find(child => child.$options._componentTag == 'tableblock').turnToFirstPage()
        },

        switchDB() {
            this.$parent.$children.find(child => child.$options._componentTag == 'tableblock').turnToFirstPage()
            this.$parent.dataLoaded = false

            if (this.$parent.currentDbSize == 'small') {
                this.$parent.currentDbSize = 'big'
                this.$parent.getDb('big')
            }
            else if(this.$parent.currentDbSize == 'big') {
                this.$parent.currentDbSize = 'small'
                this.$parent.getDb('small')
            }
        }
    },
    computed: {
        switchSizeTo() {
            return this.$parent.currentDbSize == 'small' ? 'big' : 'small'
        }
    },
};
</script>

<style lang="sass">

nav 
    padding: 20px 8px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

    #addPersonBtn
        margin-left: 10px

    #search
        display: flex
        align-items: center
        
        .form-control
            width: 80%
            margin-right: 5px

</style>