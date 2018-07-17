<template>
  <div class="img-editor">
    <Header 
        title="Image Editor"
        subtitle="Mushfik Hossain"
    />
    <div>
        <img src="../../assets/pleasure-garden.jpg">
        <div class="avatar">
            <img src="../../assets/my-face.png">
        </div>
    </div>
    <div class="panel">
        <div class="panel-body">
            <h4 class="brightness">Brightness</h4>
            <input 
                class="image-adjust__brightness" 
                @change="adjustBrightness" 
                type="range" 
                min="-100" 
                max="100" 
                value="0" 
                :disabled="isImageLoaded === false"
            />
            <Label description="Slide to adjust image brightness!"/>
        </div>     
    </div>
    <div class="panel">
        <div class="panel-body">
            <h4 class="contrast">Contrast</h4>
            <input 
                class="image-adjust__contrast" 
                @change="adjustContrast" 
                type="range" 
                min="-100" 
                max="100" 
                value="0" 
                :disabled="isImageLoaded === false"
            />
            <Label description="Slide to adjust image contrast!"/>
        </div>    
    </div>
    <div class="canvas-input">
        <canvas 
            class="image-input__canvas"
            ref="canvas"
            v-bind:height="height"
            v-bind:width="width">
        </canvas> 
        <div>
            <button class="btn btn-primary" @click="triggerInput">Upload</button>
            <input 
                @change="onFileSelected" 
                class="image-input__input" 
                ref="fileInput" 
                type="file" 
            />
        </div>
    </div>
  </div>
</template>

<script>
import Label from '../Atoms/Label.vue'
import Header from '../Atoms/Header.vue'

export default {
  name: 'ImageEditor',
  components: {
    Label,
    Header,
  },
  props: ['id','width','height'],
  data () {
    return {
        selectedFile: null,
        isImageLoaded: false,
        // Image
        ctx: null, 
        canvas: null,
        img: null, 
        originalImgData: null,
    }
  },
  mounted: function(){
    // Instantiate
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");
  },
  methods: {
    copyImageData(){
        const vm = this;
        const originalData = vm.originalImgData.data;
        let newImgData = vm.ctx.createImageData(vm.canvas.width, vm.canvas.height);
        newImgData.data.set(originalData);
        return newImgData;
    },

    adjustBrightness(event){
        const vm = this;
        
        let newImgData = vm.copyImageData();
        let data = newImgData.data;
        const brightnessValue = parseFloat(event.target.value) || 0;

        for (var i=0;i<data.length;i+=4) {
            data[i] += brightnessValue;
            data[i + 1] += brightnessValue;
            data[i + 2] += brightnessValue;
        }
        vm.ctx.putImageData(newImgData, 0, 0);
    },
    adjustContrast(event){
        const vm = this;
        let contrastValue = event.target.value
        let newImgData = vm.copyImageData();
        let data = newImgData.data;

        contrastValue *= 2.55; // or *= 255 / 100; scale integer percent to full range
        const factor = (255 + contrastValue) / (255.01 - contrastValue);  //add .1 to avoid /0 error

        for(var i=0;i<data.length;i+=4)  {
            data[i] = factor * (data[i] - 128) + 128;     //r value
            data[i+1] = factor * (data[i+1] - 128) + 128; //g value
            data[i+2] = factor * (data[i+2] - 128) + 128; //b value
        }
        vm.ctx.putImageData(newImgData, 0, 0);
    },
    triggerInput: function(event) {
      event.preventDefault();
      this.$refs.fileInput.click();
    },
    onFileSelected(event){
        const vm = this;
        const input = event.target;

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                vm.img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);

            vm.img.onload = function() {
                vm.ctx.drawImage(vm.img, 0, 0, vm.img.width, vm.img.height, 
                    0, 0, vm.canvas.width, vm.canvas.height);
                vm.originalImgData = vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height);
                vm.isImageLoaded = true;
            }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    width: 100%;
}
p {
    font-size: small;
}

.canvas-input {
    border: 1px solid #b5a8a0;
    padding-bottom: 1rem;
    border-radius: 5px;
    margin: 0.5rem;
}
.avatar {
    display: flex;
    justify-content: center;
    margin-top: -4rem;
}
.avatar img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    border: 5px solid white;
}
div .img-editor{
    display: flex;
    align-self: auto;
    flex-direction: column;
    width: 40%;
}

.image-input__input {
    display: none;
}
.image-input__canvas {
    width: 100%;
}

.image-input__overlay 
{
    position: absolute;
    top: 0; left: 0;

    width: 100%;
    height: 100%;

    cursor: pointer;
}
.panel {
    padding: 0.5rem;
}
.panel-body {
    border: 1px;
    border-radius: 5px;
    box-shadow: 3px 3px 15px #888888;
    padding-top: 0.5rem;
}
.image-adjust__brightness {
    width: 80%;
}
.brightness {
    color: #26a95b;
}
.image-adjust__contrast {
    width: 80%;
}
.contrast {
    color: #4a90e2;
}
</style>
