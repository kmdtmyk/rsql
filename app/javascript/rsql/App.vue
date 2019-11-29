<template lang='pug'>
.app
  MenuBar(v-model='config')
  .main
    TabPanel(@dblclick.self='newTab')
      Tab(
        v-for='(query, index) in queries'
        :key='index'
        :class='{active: index === activeTab}'
        @mousedown='selectTab(index)'
      )
        .name {{index + 1}}
        i.fa.fa-close.close(@click='closeTab(index)')
    TabContent(
      v-for='(query, index) in queries'
      :key='index'
      :class='{active: index === activeTab}'
    )
      .control
        button(title='Ctrl+Enter' @click='execute')
          i.fa.fa-play
          span Execute SQL
      div
        AceEditor.editor(
          ref='editor'
          v-model='query.sql'
          :theme='config.theme'
          @keypress='keypress'
        )
      .result
        TabPanel
          Tab(
            v-for='(result, index) in results'
            :key='index'
            :class='{active: index === activeResultTab}'
            @mousedown='activeResultTab = index'
          )
            .name {{index + 1}}
        TabContent(
          style='flex-grow: 1;'
          v-for='(result, index) in results'
          :key='index'
          v-show='index === activeResultTab'
        )
          QueryResult.result(v-model='results[index]')
</template>

<script>
import axios from 'axios'
import LocalStorage from './lib/LocalStorage'
import SQLText from './lib/SQLText'
import MenuBar from './component/MenuBar'
import AceEditor from './component/AceEditor'
import QueryResult from './component/QueryResult'
import Tab from './component/Tab'
import TabContent from './component/TabContent'
import TabPanel from './component/TabPanel'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const localStorage = new LocalStorage('rsql')

export default {
  components: {
    MenuBar,
    AceEditor,
    QueryResult,
    Tab,
    TabContent,
    TabPanel,
  },
  data(){
    const queries = localStorage.get('queries') || [{}]
    const config = localStorage.get('config') || {theme: ''}
    const activeTab = localStorage.get('activeTab') || 0
    const activeResultTab = 0
    return {
      config,
      queries,
      activeTab,
      activeResultTab,
      results: [],
    }
  },
  mounted(){
    window.addEventListener('beforeunload', e => {
      const queries = this.queries.map(query => {
        return {sql: query.sql}
      })
      localStorage.set('queries', queries)
      localStorage.set('config', this.config)
      localStorage.set('activeTab', this.activeTab)
    })
  },
  methods: {
    async execute(){
      const editor = this.$refs.editor[this.activeTab]
      const sql = editor.getQuery()
      const result = await axios.post('', {sql})
      console.log(result)
      console.log(result.data)
      this.activeResultTab = 0
      this.results = result.data
    },
    keypress(e){
      if(e.ctrlKey === true && (e.keyCode === 10 || e.keyCode === 13)){
        e.preventDefault()
        this.execute()
      }
    },
    selectTab(index){
      this.activeTab = index
    },
    newTab(){
      this.queries.push({})
      this.activeTab = this.queries.length - 1
    },
    closeTab(index){
      const {sql} = this.queries[index]
      if(!SQLText.isEmpty(sql) && !confirm('Are you sure to close tab?')){
        return
      }

      if(this.queries.length === 1){
        this.queries = [{}]
        return
      }
      if(this.activeTab === this.queries.length - 1){
        this.activeTab = this.queries.length - 2
      }
      this.queries.splice(index, 1)
    },
  },
}
</script>

<style lang='scss' scoped>
.app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main{
  margin: 0.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.control{
  padding: 2px 4px;
  button{
    .fa{
      margin-right: 4px;
    }
  }
}

.editor{
  height: 20em;
}

.result{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}
</style>
