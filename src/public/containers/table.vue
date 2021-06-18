<template lang="pug">
div
    table.table.table-light.table-hover
        thead.table-dark
            tr
                th(scope='col' v-for='header of tHeaders' @click='handleHeader(header)' :key='header') {{ header + showArrow(header) }}
        transition(name='fade' mode='out-in')
            spinner(v-if='!dataLoaded' :countTableHeight='countTableHeight')
            tbody(v-else-if='dataLoaded' :style='countTableHeight')
                tr(v-for='person of displayedPersons' @click='choosePerson(person)' :key='person.id')
                    td {{ person.id }}
                    td {{ person.firstName }}
                    td {{ person.lastName }}
                    td {{ person.email }}
                    td {{ person.phone }}
    pagination(:pageNumber='pageNumber' :maxPagesCount='maxPagesCount')
    
</template>

<script>
import spinner from "../components/spinner.vue"
import pagination from "../components/pagination.vue"

export default {
    props: ['database', 'dataLoaded'],
    components: { spinner, pagination },
    data() {
        return {
            tHeaders: ["id", "firstName", "lastName", "email", "phone"],
            
            paginatedDb: [],

            pageNumber: 1,
            pageSize: 50,

            currentSortBy: '',
            isCurrentSortReversed: false
        };
    },
    methods: {
        choosePerson(person) {
            this.$parent.personChosen = true
            this.$parent.person = person
        },
        paginatePersons() {
            let start = this.pageNumber * this.pageSize - this.pageSize
            let end = this.pageNumber * this.pageSize
            this.paginatedDb = this.database.slice(start, end)
        },
        turnToFirstPage() {
            this.pageNumber = 1
        },
        // СОРТИРОВКА
        showArrow(header) {
            if (this.currentSortBy == header) {
                if (this.isCurrentSortReversed) {
                    return ' ▲'
                }
                else if (!this.isCurrentSortReversed) {
                    return ' ▼'
                }
            }
            else {
                return ''
            }
        },
        handleHeader(header) {
            if (this.currentSortBy == header) { // если клик пришёл на уже сортированный столбец, данные таблицы переворачиваются
                this.isCurrentSortReversed = !this.isCurrentSortReversed
                this.database.reverse()
            }
            else { // если клик пришёлся на ныне не сортируемый столбец - сортируем
                this.currentSortBy = header
                this.isCurrentSortReversed = false
                this.turnToFirstPage()
                this.sortTable(header)
            }
        },
        sortTable(header) {
            if (header == "id") { // столбец id состоит только из чисел, его сортируем по-простому
                this.database.sort((a, b) => a.id - b.id)
            }
            else { // остальные столбцы строчные, и в некоторых есть спец.символы, их сортируем через localCompare
                this.database.sort((a, b) => a[header].localeCompare(b[header]))
            }
        },
    },
    computed: {
        maxPagesCount() { // кол-во страниц считаем из длины массива людей, поделённой на кол-во людей на страницу
            let l = this.database.length
            let s = this.pageSize
            return Math.ceil(l/s) // округляем до меньшего числа
        },
        displayedPersons() {
            this.paginatePersons()
            return this.paginatedDb
        },
        countTableHeight() {
            let px = this.pageSize * 48.8
            return 'height: ' + px + 'px;' 
        }
    }
}
</script>

<style lang="sass">
.table 
    transition: .3s
    position: relative
    margin-bottom: 0
    
    thead
        border-top: 2px solid lighten(#353a40, 10%)
    
    th
        transition: background-color .3s

        &:hover
            background-color: lighten(#353a40, 10%)!important
            cursor: pointer

    tr:hover
        cursor: pointer

    th, tr > td
        &:first-child
            width: 10%
        &:nth-child(2)
            width: 20%
        &:nth-child(3)
            width: 20%
        &:nth-child(4)
            width: 30%
        &:last-child
            width: 30%
</style>