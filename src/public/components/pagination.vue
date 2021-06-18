<template lang="pug">
.pagination
    button.prevBtn(@click='prevPage()' :disabled='pageNumber == 1')
        span &laquo;
    button(@click='changePage(page)' :disabled='page == pageNumber' v-for='page of setPages' :key='page')
        span {{ page }}
    button.nextBtn(@click='nextPage()' :disabled='pageNumber == maxPagesCount')
        span &raquo;

</template>

<script>
export default {
    props: ['pageNumber', 'maxPagesCount'],
    data() {
        return {
            pageNum: this.pageNumber
        }
    },
    methods: {
        nextPage() {
            this.$parent.pageNumber++
        },
        prevPage() {
            this.$parent.pageNumber--
        },
        changePage(num) {
            this.$parent.pageNumber = num
        },
    },
    computed: {
        setPages() {
            let fivePages = []

            if (this.maxPagesCount < 5) { // если кол-во страниц меньше 5, выводим доступные страницы
                for (let i = 1; i <= this.maxPagesCount; i++) {
                    fivePages.push(i)
                }
            }
            else if (this.pageNumber <= 3) { // если номер страницы <= 3, выводим первые 5 страниц 
                for(let i = 1; i <= 5; i++) {
                    fivePages.push(i)
                }
            }
            else if (this.pageNumber >= this.maxPagesCount - 3) { // если номер страницы равен одной из трёх последних страниц, выводим последние 5 страниц
                for(let i = this.maxPagesCount - 5; i <= this.maxPagesCount; i++) {
                    fivePages.push(i)
                }
            }
            else { // в любом другос случае просто выводим 5 номеров страниц - текущую, предыдущие две и следующие две
                for(let i = this.pageNumber - 2; i <= this.pageNumber + 2; i++) {
                    fivePages.push(i)
                }
            }
            return fivePages
        }
    },
}
</script>

<style lang="sass">
.pagination
    width: 380px
    display: flex
    justify-content: center
    margin: 30px auto

    button
        border: none
        outline: none!important
        padding: 10px 15px
        background-color: #353a40
        color: #fff
        transition: .2s

        &:disabled
            background-color: lighten(#353a40, 15%)

    .prevBtn
        border-top-left-radius: 10px
        border-bottom-left-radius: 10px
    
    .nextBtn
        border-top-right-radius: 10px
        border-bottom-right-radius: 10px
</style>