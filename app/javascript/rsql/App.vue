<template lang='pug'>
.app
  MenuBar(v-model='config')
  .main
    TabPanel(@dblclick.self='newTab')
      Tab(
        v-for='(editor, index) in editors'
        :key='index'
        :class='{active: index === activeTab}'
        @mousedown='selectTab(index)'
      )
        .name {{index + 1}}
        i.fa.fa-close.close(@click='closeTab(index)')
    TabContent(
      v-for='(editor, index) in editors'
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
          v-model='editors[index]'
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
          v-for='(result, index) in results'
          :key='index'
          :class='{borderless: true, active: index === activeResultTab}'
          style='border-top-width: 1px;'
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
    const editors = localStorage.get('editors', Array) || [{}]
    const config = localStorage.get('config', Object) || {theme: ''}
    const activeTab = localStorage.get('activeTab') || 0
    const activeResultTab = 0
    return {
      editors,
      config,
      activeTab,
      activeResultTab,
      results: [],
    }
  },
  mounted(){
    window.addEventListener('beforeunload', e => {
      localStorage.set('editors', this.editors)
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
      this.editors.push({})
      this.activeTab = this.editors.length - 1
    },
    closeTab(index){
      const {content} = this.editors[index]
      if(!SQLText.isEmpty(content) && !confirm('Are you sure to close tab?')){
        return
      }

      if(this.editors.length === 1){
        this.editors = [{}]
        return
      }

      if(this.activeTab === this.editors.length - 1){
        this.activeTab = this.editors.length - 2
      }
      this.editors.splice(index, 1)
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
