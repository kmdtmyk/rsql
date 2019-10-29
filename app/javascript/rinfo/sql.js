import Vue from 'vue/dist/vue.common'

new Vue({
  el: '#app',
  data(){
    return {
      sql: 'select * from books'
    }
  },
  methods: {
    execute(){
      console.log(this.sql)
    },
  },
})
