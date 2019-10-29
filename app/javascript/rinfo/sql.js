import Vue from 'vue/dist/vue.common'
import axios from 'axios'
import 'regenerator-runtime/runtime'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

new Vue({
  el: '#app',
  data(){
    return {
      sql: 'select * from books',
      result: {},
    }
  },
  methods: {
    async execute(){
      const result = await axios.post('sql', {sql: this.sql})
      console.log(result)
      console.log(result.data)
      this.result = result.data
    },
  },
})
