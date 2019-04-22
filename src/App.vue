<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  @font-face {
    font-family: 'iconfont';  /* project id 1123738 */
    src: url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.eot');
    src: url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.woff') format('woff'),
    url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1123738_dgj8wf3v2ko.svg#iconfont') format('svg');
  }
.iconfont{
  font-family: 'iconfont';
}
</style>
