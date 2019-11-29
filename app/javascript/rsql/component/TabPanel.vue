<template lang='pug'>
.tab-panel(v-on='$listeners')
  slot
</template>

<script>

</script>

<style lang='scss' scoped>
.tab-panel{
  display: flex;
  user-select: none;
  transform: translateY(1px);
}
</style>
