<template lang='pug'>
div {{value}}
</template>

<script>
export default {
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  watch: {
    value(value){
      if(value === this.editor.getValue()){
        return
      }
      this.editor.setValue(value, -1)
    },
  },
  mounted(){
    const editor = ace.edit(this.$el, {
      mode: 'ace/mode/sql',
    })
    editor.on('change', () => {
      this.$emit('input', editor.getValue())
    })

    const {keydown, keypress} = this.$listeners
    if(keydown != null){
      editor.textInput.getElement().addEventListener('keydown', keydown)
    }
    if(keypress != null){
      editor.textInput.getElement().addEventListener('keypress', keypress)
    }

    this.editor = editor
  },
}
</script>
