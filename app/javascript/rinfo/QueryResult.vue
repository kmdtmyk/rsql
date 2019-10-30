<template lang='pug'>
div(v-if='result')
  div(v-if='result.error') {{result.error}}
  table(v-else)
    thead
      tr
        th(v-for='column in result.columns') {{column}}
    tbody
      tr(v-for='row in result.rows')
        td(v-for='value in row') {{value}}
</template>

<script>
export default {
  model: {
    prop: 'result',
  },
  props: {
    result: {
      type: Object,
    },
  },
}
</script>

<style lang='scss' scoped>
table{
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0;

  tr{
    th, td{
      border: 1px solid #ccc;
      &:not(:first-child){
        border-left: 0;
      }
    }

    th{
      position: sticky;
      top: 0;
      background-color: #eee;
    }

    td{
      border-top: 0;
      white-space: nowrap;
    }
  }

}
</style>
