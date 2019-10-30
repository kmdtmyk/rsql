<template lang='pug'>
div.menu-bar
  .menu(@click.stop='oepnMenu("theme")') Theme
    .menu-content(v-if='selectedMenu == "theme"')
      .menu-item(
        v-for='theme in themes'
        @click.stop='selectTheme(theme.value)'
      )
        span.check(
          :style='{visibility: config.theme !== theme.value ? "hidden" : ""}'
        ) ✔
        span {{theme.name}}
</template>

<script>

const themes = [
  {name: 'Ambiance', value: 'ambiance'},
  {name: 'Chaos', value: 'chaos'},
  {name: 'Default', value: ''},
  {name: 'Dracula', value: 'dracula'},
  {name: 'Eclipse', value: 'eclipse'},
  {name: 'Github', value: 'github'},
  {name: 'Monokai', value: 'monokai'},
  {name: 'Twilight', value: 'twilight'},
  {name: 'XCode', value: 'xcode'},
]

export default {
  model: {
    prop: 'config',
  },
  props: {
    config: {
      type: Object,
    },
  },
  data(){
    return {
      themes,
      selectedMenu: ''
    }
  },
  mounted(){
    document.addEventListener('click', e => {
      this.closeMenu()
    })
  },
  methods: {
    oepnMenu(value){
      this.selectedMenu = value
    },
    selectTheme(theme){
      this.config.theme = theme
      this.closeMenu()
      this.$emit('input', {...this.config, theme})
    },
    closeMenu(){
      console.log('close')
      this.selectedMenu = ''
    }
  },
}
</script>

<style lang='scss' scoped>
.menu-bar{
  font-size: 14px;
  background-color: #333;
  color: #fff;
  display: flex;
  cursor: default;
  user-select: none;

  .menu{
    position: relative;
    padding: 2px 8px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0);

    &:hover{
      background-color: #555;
      border: 1px solid #888;
    }

    .menu-content{
      position: absolute;
      top: 2em;
      color: #000;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);


      .menu-item{
        padding-left: 0.5em;
        padding-right: 1em;

        &:hover{
          background-color: #ddd;
        }

        .check{
          margin-right: 0.5em;
        }

      }
    }

  }
}
</style>
