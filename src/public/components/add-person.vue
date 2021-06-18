// ********************************************************************************************************
// В данном компоненте реализованы два способа добавления пользователя в базу данных.                     *
// Первый - просто добавление в массив                                                                    *
// Второй - добавление в файл JSON                                                                        *
// Так как нам не нужны тестовые люди в файлах JSON, сейчас активен только первый способ                  *
// Если Вы хотите протестировать добавление в json, раскомментируйте 36 строку и закомментируйте 37       *
// ********************************************************************************************************

<template lang="pug">
#addPerson.modal.fade(tabindex='-1' aria-labelledby='addPersonTitle' aria-hidden='true' data-bs-keyboard="false")
    .modal-dialog.modal-dialog-centered
        .modal-content
            .modal-header
                h5.modal-title Add a new person
                button.close(type='button' data-bs-dismiss='modal' aria-label='Close') &times;
            .modal-body
                transition(name='popUp')
                    #popUp(v-if='personAdded == true') ✔
                .form-group
                    label(for='idInput') ID
                    input#idInput.form-control(type='number' required='' v-model='id' placeholder='Enter id')
                .form-group
                    label(for='firstNameInput') First Name
                    input#firstNameInput.form-control(type='text' required='' v-model='firstName' placeholder='First Name')
                .form-group
                    label(for='lastNameInput') Last Name
                    input#lastNameInput.form-control(type='text' required='' v-model='lastName' placeholder='Last Name')
                .form-group
                    label(for='emailInput') Email
                    input#emailInput.form-control(type='email' required='' v-model='email' placeholder='Email')
                .form-group
                    label(for='phoneInput') Phone
                    input#phoneInput.form-control(type='tel' required='' v-model='phone' placeholder='Phone')
            .modal-footer
                button.btn.btn-secondary(type='button' data-bs-dismiss='modal') Close
                //- button.btn.btn-primary(type='submit' @click="postInJson()") Add person
                button.btn.btn-primary(type='submit' @click='postPerson()') Add person

</template>

<script>
export default {
    data() {
        return {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',

            personAdded: false
        }
    },
    methods: {
        postPerson() {// при тестировании this.post() это надо закомментировать
            this.$parent.database.unshift(this.getPerson);
            this.clearFields(); 
            this.showPopup();
        },
        showPopup() {
            this.personAdded = true;
            setTimeout(() => this.personAdded = false, 2000)
        },
        clearFields() {
            this.id = 0;
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.phone = '';
        },
        postInJson() {
            this.$parent.database.unshift(this.getPerson)
            
            let url = '';
            if (this.$parent.currentDbSize == 'small') {
                url = '/api/small-table'
            }
            else if (this.$parent.currentDbSize == 'big') {
                url = '/api/big-table'
            }

            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                    },
                body: JSON.stringify(this.getPerson)
            })  .then(this.clearFields())
                .then(this.showPopup());
        }
    },
    computed: {
        getPerson() {
            return  {
                        "id": this.id,
                        "firstName": this.firstName,
                        "lastName": this.lastName,
                        "email": this.email,
                        "phone": this.phone,
                        "address": {
                            "streetAddress": "street_adress",
                            "city": "city",
                            "state": "state",
                            "zip": "zip"
                        },
                        "description": "ipsum et magna nullam odio nec fringilla dolor mattis placerat mattis aliquam quis eget sed lacus at consectetur pretium odio ipsum fringilla egestas aliquam tempor ipsum placerat odio morbi mi morbi placerat"
                    }
        }
    }
}
</script>

<style lang="sass">
.modal
    &-title
        font-size: 28px
        line-height: 1.2
    
    &-body
        position: relative

        #popUp
            position: absolute
            width: 200px
            height: 200px
            border-radius: 50%
            background-color: #9FD892
            color: #fff
            top: calc(50% - 100px)
            left: calc(50% - 100px)
            font-size: 165px
            line-height: 1.2
            text-align: center           

    .form-group
        margin-bottom: 10px

    button[type="submit"]
        background-color: #17a2b8
        border-color: #17a2b8

        &:hover
            background-color: darken(#17a2b8, 10%)
</style>