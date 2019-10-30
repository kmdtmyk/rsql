<template lang='pug'>
div
  MenuBar(v-model='config')
  .main
    .tab-panel(@dblclick.self='newTab')
      .tab(
        v-for='(query, index) in queries'
        :class='{active: index === activeTab}'
        @mousedown='selectTab(index)'
      )
        .name {{index + 1}}
        .close(@click='closeTab(index)') ❎
    .tab-content(
      v-for='(query, index) in queries'
      :class='{active: index === activeTab}'
    )
      .control
        button(title='Execute SQL (Ctrl+Enter)' @click='execute')
          i.fa.fa-play
      AceEditor.editor(
        v-model='query.sql'
        :theme='config.theme'
        @keypress='keypress'
      )
      QueryResult.result(v-model='query.result')
</template>

<script>
import axios from 'axios'
import MenuBar from './MenuBar'
import AceEditor from './AceEditor'
import QueryResult from './QueryResult'
import LocalStorage from './LocalStorage'

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
  },
  data(){
    const queries = localStorage.get('queries') || [{}]
    const config = localStorage.get('config') || {theme: ''}
    return {
      config,
      queries,
      activeTab: 0,
    }
  },
  mounted(){
    window.addEventListener('beforeunload', e => {
      const queries = this.queries.map(query => {
        return {sql: query.sql}
      })
      localStorage.set('queries', queries)
      localStorage.set('config', this.config)
    })
  },
  methods: {
    async execute(){
      const query = this.queries[this.activeTab]
      const result = await axios.post('sql', {sql: query.sql})
      console.log(result)
      console.log(result.data)
      query.result = result.data
      this.$forceUpdate()
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
.main{
  padding: 1rem;
}

.tab-panel{
  display: flex;
  user-select: none;

  .tab{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border: 1px solid #ccc;
    border-bottom: 0;
    min-width: 5em;
    cursor: default;

    .close{
      cursor: pointer;
    }

    &:hover{
      background-color: #eee;
    }

    &.active{
      background-color: #ccc;
    }

  }

}

.tab-content{
  border: 1px solid #ccc;

  &:not(.active){
    height: 0;
    overflow: hidden;
    border: 0;
  }

}

.control{
  padding: 2px 4px;
}

.editor{
  height: 20em;
}

.result{
  height: 20em;
  overflow: auto;
}
</style>
