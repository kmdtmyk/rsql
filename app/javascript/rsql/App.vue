<template lang='pug'>
.app
  MenuBar(v-model='config')
  .main
    .tab-panel(@dblclick.self='newTab')
      .tab(
        v-for='(query, index) in queries'
        :class='{active: index === activeTab}'
        @mousedown='selectTab(index)'
      )
        .name {{index + 1}}
        i.fa.fa-close.close(@click='closeTab(index)')
    .tab-content(
      v-for='(query, index) in queries'
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
      QueryResult.result(v-model='query.result')
</template>

<script>
import axios from 'axios'
import LocalStorage from './lib/LocalStorage'
import SQLText from './lib/SQLText'
import MenuBar from './component/MenuBar'
import AceEditor from './component/AceEditor'
import QueryResult from './component/QueryResult'

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
    const activeTab = localStorage.get('activeTab') || 0
    return {
      config,
      queries,
      activeTab,
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
      const result = await axios.post('', {sql: editor.getQuery()})
      console.log(result)
      console.log(result.data)
      const query = this.queries[this.activeTab]
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

.tab-panel{
  display: flex;
  user-select: none;
  transform: translateY(1px);

  .tab{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 14px;
    border: 1px solid #aaa;
    border-bottom: 0;
    min-width: 5em;
    padding: 0 4px;
    background-color: #fff;
    cursor: default;

    &:not(:first-child){
      border-left: 0;
    }

    .close{
      cursor: pointer;
      &:hover{
        color: #666;
      }
    }

    &:not(.active){
      background-color: #ccc;

      &:hover{
        background-color: #ddd;
      }
    }

  }

}

.tab-content{
  border: 1px solid #aaa;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &:not(.active){
    height: 0;
    overflow: hidden;
    border: 0;
    flex-grow: 0;
  }

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
  height: 20em;
  flex-grow: 1;
  overflow: auto;
}
</style>
