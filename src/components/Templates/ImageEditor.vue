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
    <Slider 
        labelColor='brightness'
        label='Brightness'
        @sliderChangeFunc="adjustBrightness"
        imageLoaded=isImageLoaded
        labelDescription="Slide to adjust image brightness!"
    />
    <Slider 
        labelColor='contrast'
        label='Contrast'
        @sliderChangeFunc="adjustContrast"
        imageLoaded=isImageLoaded
        labelDescription="Slide to adjust image contrast!"
    />
    <div class="canvas-input">
        <canvas 
            class="image-input__canvas"
            ref="canvas"
            v-bind:height="height"
            v-bind:width="width">
        </canvas> 
        <div class="row canvas-input__upload">
            <div class="list-group list-group-horizontal">
                <div class="list-group-item grey">Name</div>
                <div class="list-group-item truncate">{{filename}}</div>
            </div>

            <button class="btn btn-upload grey" @click="triggerInput">
                Upload
            </button>
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
import Slider from '../Molecules/Slider.vue'

export default {
  name: 'ImageEditor',
  components: {
    Label,
    Header,
    Slider,
  },
  props: ['id','width','height','filename'],
  data () {
    return {
        selectedFile: null,
        isImageLoaded: false,
        // Image
        ctx: null, 
        canvas: null,
        img: null, 
        originalImgData: null,
        contrastLevel: 0,
        brightnessLevel: 0,
    }
  },
  mounted: function(){
    // Instantiate
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");
    this.filename = 'No File';
  },
  methods: {
    copyImageData(){
        const vm = this;
        const originalData = vm.originalImgData.data;
        let newImgData = vm.ctx.createImageData(vm.canvas.width, vm.canvas.height);
        newImgData.data.set(originalData);
        return newImgData;
    },
    pixelManipulation(){
        const vm = this;
        let newImgData = vm.copyImageData();
        let data = newImgData.data;
        //apply current brightness 
        const brightness = parseFloat(vm.brightnessLevel) || 0;
        for (let i=0;i<data.length;i+=4) {
            data[i] += brightness;
            data[i + 1] += brightness;
            data[i + 2] += brightness;
        }
        //apply current contrast
        const contrastValue = (vm.contrastLevel/100) + 1;  //convert to decimal & shift range: [0..2]
        const intercept = 128 * (1 - contrastValue);
        for(let j=0;j<data.length;j+=4){   //r,g,b,a
            data[j] = data[j]*contrastValue + intercept;
            data[j+1] = data[j+1]*contrastValue + intercept;
            data[j+2] = data[j+2]*contrastValue + intercept;
        }
        //change image
        vm.ctx.putImageData(newImgData, 0, 0);
    }, 

    adjustBrightness(value){
        const vm = this;
        vm.brightnessLevel = value;
        vm.pixelManipulation();
    },
    adjustContrast(value){
        const vm = this;
        vm.contrastLevel = value;
        vm.pixelManipulation();
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
            let filename = input.files[0].name;
            reader.onload = function (e) {
                vm.img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);

            vm.img.onload = function() {
                vm.ctx.drawImage(vm.img, 0, 0, vm.img.width, vm.img.height, 
                    0, 0, vm.canvas.width, vm.canvas.height);
                vm.filename = filename;
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
.list-group {
    display: flex;
    flex-direction: row;
    margin-left: 4px;
}

.list-group-horizontal .list-group-item {
    display: inline-block;
    margin-bottom: 0;
	margin-left:-4px;
	margin-right: 0;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 36px;
}
.list-group-horizontal .list-group-item:first-child {
	border-top-right-radius:0;
	border-bottom-left-radius:4px;
}
.list-group-horizontal .list-group-item:last-child {
	border-top-right-radius:4px;
	border-bottom-left-radius:0;
}
.truncate {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.grey {
    background-color: #f6f8fa;
}
.btn-upload {
    border: 1px solid #dcdcdc;
}
.canvas-input {
    border: 1px solid #b5a8a0;
    padding-bottom: 0.5rem;
    border-radius: 5px;
    margin: 1rem;
}
.canvas-input__upload {
    display: flex;
    justify-content: space-around;
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
    width: 375px;
}

.image-input__input {
    display: none;
}
.image-input__canvas {
    width: 100%;
    border-bottom: 1px solid #b5a89f;
}

.image-input__overlay 
{
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
