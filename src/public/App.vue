<template lang="pug">
#app
    header
        navbar
    main
        tableblock(v-if='sizeChosen' :database='database' :dataLoaded='dataLoaded')
        transition(name='fade')
            choose-size(v-if='!sizeChosen')
            person-info(v-if='personChosen' :person='person')
        add-person

</template>

<script>
import navbar from "./containers/header.vue"
import tableblock from "./containers/table.vue"
import chooseSize from "./components/choose-size.vue"
import personInfo from "./components/person-info.vue"
import addPerson from "./components/add-person.vue"

export default {
    components: { navbar, tableblock, chooseSize, personInfo, addPerson },
    data() {
        return {
            dataLoaded: false,
            sizeChosen: false,
            personChosen: false,

            currentDbSize: '',
            defaultDb: [],
            database: [],
            person: {}
        }
    },
    methods: {
        getDb(size) {
            let api = '';
            if (size == 'small' ) { api = '/api/small-table'; }
            else if (size == 'big' ) { api = '/api/big-table'; }

            fetch (api)
                .then((response) => {
                    if (response.status !== 200) {
                        console.log('Fetch error. Status: ' + response.status);
                        return;
                    }
                    else {
                        response.json()
                            .then((data) => {
                                this.database = data
                            })
                            .then(() => { // удаляем людей с одинаковыми id, тк сайт filltext.com делает много дубликатов
                                let used = {}
                                this.database = this.database.filter(function(obj) {
                                    return obj.id in used ? 0 : (used[obj.id]=1)
                                })
                            })
                            .then(() => { // а тут делаем бэкап БД для функционала поиска, и сообщаем, что данные загружены
                                this.defaultDb = this.database // бэкап делаю ссылкой на объект database, тк при поиске database перезаписывается полностью методом filter, создавая новую область памяти, и defaultDb остаётся неизменным
                                this.dataLoaded = true
                            })
                    }
                })
                .catch((error) => {
                    console.log('Catched error: ' + error);
                    console.log('Status: ' + response.status);
                }
            )
        }
    }
}
</script>