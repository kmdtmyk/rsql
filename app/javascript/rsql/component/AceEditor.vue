<template lang='pug'>
div {{value.content}}
</template>

<script>
import EditorText from '../lib/EditorText'

const Range = ace.Range

export default {
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: Object,
    },
    theme: {
      type: String,
    },
  },
  watch: {
    value(value){
      const {content} = value
      if(content === this.editor.getValue()){
        return
      }
      this.editor.setValue(content, -1)
    },
    theme(value){
      this.setTheme()
    },
  },
  mounted(){
    const editor = ace.edit(this.$el, {
      mode: 'ace/mode/sql',
    })

    const {selection} = this.value
    if(selection != null){
      editor.selection.setRange(new Range(
        selection.startRow,
        selection.startColumn,
        selection.endRow,
        selection.endColumn
      ))
    }

    editor.on('change', () => {
      this.$emit('input', {...this.value, content: editor.getValue()})
    })

    editor.session.selection.on('changeSelection', (e, data) => {
      const {anchor, cursor} = data
      const selection = {
        startRow: anchor.row,
        startColumn: anchor.column,
        endRow: cursor.row,
        endColumn: cursor.column,
      }
      this.$emit('input', {...this.value, selection})
    })

    const {keydown, keypress} = this.$listeners
    if(keydown != null){
      editor.textInput.getElement().addEventListener('keydown', keydown)
    }
    if(keypress != null){
      editor.textInput.getElement().addEventListener('keypress', keypress)
    }

    this.editor = editor
    this.setTheme()
  },
  methods: {
    setTheme(){
      const {theme} = this
      if(theme == null || theme === ''){
        this.editor.setTheme('')
      }else{
        this.editor.setTheme(`ace/theme/${theme}`)
      }
    },
    getQuery(){
      const selectedText = this.editor.getSelectedText()
      if(selectedText !== ''){
        return selectedText
      }
      const text = this.editor.getValue()
      const position = this.editor.getCursorPosition()
      return EditorText.getCursorQuery(text, position)
    },
  },
}
</script>
