<template lang='pug'>
div
  AceEditor.editor(v-model='sql' @keypress='keypress')
  button(@click='execute' title='Ctrl+Enter') execute

  div(v-if='result')
    .error(v-if='result.error') {{result.error}}
    table.result(v-else)
      thead
        tr
          th(v-for='column in result.columns') {{column}}
      tbody
        tr(v-for='row in result.rows')
          td(v-for='value in row') {{value}}
</template>

<script>
import axios from 'axios'
import AceEditor from './AceEditor'
import LocalStorage from './LocalStorage'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const localStorage = new LocalStorage('rinfo')

export default {
  components: {
    AceEditor,
  },
  data(){
    return {
      sql: localStorage.get('sql') || '',
      result: {},
    }
  },
  mounted(){
    window.addEventListener('beforeunload', e => {
      localStorage.set('sql', this.sql)
    })
  },
  methods: {
    async execute(){
      const result = await axios.post('sql', {sql: this.sql})
      console.log(result)
      console.log(result.data)
      this.result = result.data
    },
    keypress(e){
      if(e.ctrlKey === true && (e.keyCode === 10 || e.keyCode === 13)){
        e.preventDefault()
        this.execute()
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.editor{
  height: 20em;
}

table.result{
  border-collapse: collapse;

  th, td{
    border: 1px solid #ccc;
  }

}
</style>
