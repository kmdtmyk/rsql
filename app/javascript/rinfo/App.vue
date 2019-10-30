<template lang='pug'>
div
  AceEditor.editor(v-model='sql' @keypress='keypress')
  button(@click='execute' title='Ctrl+Enter') execute
  QueryResult.result(v-model='result')
</template>

<script>
import axios from 'axios'
import AceEditor from './AceEditor'
import QueryResult from './QueryResult'
import LocalStorage from './LocalStorage'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const localStorage = new LocalStorage('rinfo')

export default {
  components: {
    AceEditor,
    QueryResult,
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

.result{
  height: 20em;
  overflow: auto;
}
</style>
