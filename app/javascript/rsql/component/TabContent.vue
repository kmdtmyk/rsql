<template lang='pug'>
.tab-content
  slot
</template>

<style lang='scss' scoped>
.tab-content{
  border: 1px solid #aaa;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 0;

  .borderless{
    border-width: 0;
    box-shadow: none;
  }

  &:not(.active){
    overflow: hidden;
    border: 0;
    flex-grow: 0;
  }

}
</style>
