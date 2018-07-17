<template>
    <div class="header">
        <h1>{{title}}</h1>
        <div class="sub">{{subtitle}}</div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
      title: String,
      subtitle: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    padding: 0.5rem;
    background: #7344c0;
}
h1 {
    color: white;
}
.sub {
    color: white;
}
</style>