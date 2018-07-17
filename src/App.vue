<template>
  <div id="app">
    <ImageEditor />
  </div>
</template>

<script>
import ImageEditor from './components/Templates/ImageEditor.vue'

export default {
  name: 'app',
  components: {
    ImageEditor,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
</style>
