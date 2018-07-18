<template>
<div class="panel">
    <div class="panel-body">
        <h4 :class="labelColor">{{label}}</h4>
        <input 
            class="image-adjust__input" 
            @change="changed" 
            type="range" 
            min="-100" 
            max="100" 
            value="0" 
            :disabled="isImageLoaded === false"
        />
        <Label description=labelDescription />
    </div>     
</div>
</template>

<script>
import Label from '../Atoms/Label.vue'

export default {
  name: 'Slider',
  components: {
    Label,
  },
  props: ['labelColor', 'label', 'sliderChangeFunc', 'isImageLoaded','labelDescription'],
  methods: {
    changed(event) {
        console.log(this.isImageLoaded)
        this.$emit("sliderChangeFunc",event.target.value);
    }
  }
}
</script>

<style>
.panel {
    padding: 1rem;
}
.panel-body {
    border: 1px;
    border-radius: 5px;
    box-shadow: 3px 3px 15px #888888;
    padding-top: 1rem;
    padding-bottom: 0.1rem;
}
.image-adjust__input{
    width: 80%;
}
.brightness {
    color: #26a95b;
}
.contrast {
    color: #4a90e2;
}
</style>
