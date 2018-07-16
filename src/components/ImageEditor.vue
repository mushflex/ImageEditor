<template>
  <div class="img-editor">
    <h1>Image Editor</h1>
    <div>
        Brightness and Contrast Editor
    </div>
    <div>
        <img src="../assets/pleasure-garden.jpg">
        <div class="avatar">
            <img src="../assets/my-face.png">
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-body">
            <input class="image-adjust__brightness" @change="adjustBrightness" type="range" min="-100" max="100" value="0" :disabled="isImageLoaded === false">
            <p>Slide to adjust image brightness</p>
        </div>     
    </div>
    <div class="panel panel-default">
        <div class="panel-body">
            <input class="image-adjust__contrast" @change="adjustContrast" type="range" min="-100" max="100" value="0" :disabled="isImageLoaded === false">
            <p>Slide to adjust image brightness</p>
        </div>    
    </div>
    <div>
        <canvas class="image-input__canvas"
        ref="canvas"
        v-bind:height="height"
        v-bind:width="width">
        </canvas> 
        <div>
            <button @click="triggerInput">Upload</button>
            <input @change="onFileSelected" class="image-input__input" ref="fileInput" type="file" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageEditor',
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
    
    pixelManipulation(imageData, contrast) {  // contrast as an integer percent  
        var data = imageData.data;  // original array modified, but canvas not updated
        contrast *= 2.55; // or *= 255 / 100; scale integer percent to full range
        var factor = (255 + contrast) / (255.01 - contrast);  //add .1 to avoid /0 error

        for(var i=0;i<data.length;i+=4)  //pixel values in 4-byte blocks (r,g,b,a)
        {
            data[i] = factor * (data[i] - 128) + 128;     //r value
            data[i+1] = factor * (data[i+1] - 128) + 128; //g value
            data[i+2] = factor * (data[i+2] - 128) + 128; //b value

        }
        return imageData;
    },
    
    adjustBrightness(event){
        var contrastValue = event.target.value
        console.log(contrastValue);
        var vm = this;
        var newImageData = vm.pixelManipulation(vm.originalImgData, contrastValue);
        console.log(newImageData)
        // vm.ctx.putImageData(newImageData,0,0);
    },
    adjustContrast(event){
        console.log("adjustContrast : "+event.target.value);
    },
    triggerInput: function(event) {
      event.preventDefault();
      this.$refs.fileInput.click();
    },
    onFileSelected(event){
        console.log('uploading...')
        var vm = this;
        var input = event.target;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            // Set as source
            reader.onload = function (e) {
            vm.img.src = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);

            vm.img.onload = function() 
            {
            // Draw
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
canvas {
    width: 100%;
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
    width: 50%;
    padding: 1rem;
}

.image-input__input {
    display: none;
}
.image-input__canvas {
    border: 1px solid black;
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
