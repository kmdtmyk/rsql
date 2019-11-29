<template lang='pug'>
.tab(v-on='$listeners')
  slot
</template>

<style lang='scss' scoped>
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
</style>
