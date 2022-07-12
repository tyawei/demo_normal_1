<template>
  <!-- <div class="container">
    <common></common>
    <div>{{data}}</div>
  </div> -->
  <router-view></router-view>

</template>
<script>
// 这里也可以像单页面一样，通过import引入组件使用
// import common from './common.vue'
export default {
  components: {
    // common,
  },
  data() {
    return {
      data: 111,
    }
  },
  methods: {

  }
}
</script>