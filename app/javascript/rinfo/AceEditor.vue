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
  mounted(){
    const editor = ace.edit(this.$el)
    editor.on('change', () => {
      this.$emit('input', editor.getValue())
    })
  },
}
</script>
