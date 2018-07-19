<template>
<div class="panel">
    <div class="panel-body">
        <h4 :class="labelColor">{{label}}</h4>
        <input 
            :class="sliderStyles" 
            @change="changed" 
            type="range" 
            min="-100" 
            max="100" 
            value="0" 
            :disabled="isImageLoaded === false"
        />
        <Label :description=labelDescription />
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
  props: ['labelColor', 'sliderStyles', 'label', 'sliderChangeFunc', 'isImageLoaded','labelDescription'],
  methods: {
    /* eslint-disable */
    changed(event) {
        const vm = this;
        const val = event.target.value;
        let transformVal = val/2;
        if (transformVal < 0){
            transformVal *= -1;
            transformVal = 50 - transformVal;
        } else {
            transformVal += 50;
        }
        transformVal = transformVal/100;

        const sliderColor = vm.sliderStyles === 'image-adjust__input-contrast' ? '#4a90e2' : '#26a95b';
        $("."+vm.sliderStyles).css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + transformVal + ','+ sliderColor + '), '
            + 'color-stop(' + transformVal + ', #c8ead6)'
            + ')'
        );

        // emit changes to parent component
        this.$emit("sliderChangeFunc", val);
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
.brightness {
    color: #26a95b;
}
.contrast {
    color: #4a90e2;
}

/* styling the slider */
input[type="range"]{
    width: 80%;
    -webkit-appearance: none;
    -moz-apperance: none;
    border-radius: 6px;
    height: 6px;
}
input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    border-radius: 50%;
    border: 2px solid white;
    height: 18px;
    width: 18px;
}
input.image-adjust__input-brightness[type="range"]{
    background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0.5, #26a95b),
        color-stop(0.5, #c8ead6)
    );
}
input.image-adjust__input-contrast[type="range"]{
    background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0.5, #4a90e2),
        color-stop(0.5, #c8ead6)
    );
}
input.image-adjust__input-brightness[type='range']::-webkit-slider-thumb {
    background-color: #26a95b;
}
input.image-adjust__input-contrast[type='range']::-webkit-slider-thumb {
    background-color: #4a90e2;
}


</style>
