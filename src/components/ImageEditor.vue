<template>
  <div class="img-editor">
    <h1>Image Editor</h1>
    <div>
        Brightness and Contrast Editor
    </div>
    <div>
        <img >
        image with my face here
    </div>
    <div class="panel panel-default">
        <div class="panel-body">
            <input class="image-adjust__brightness" @change="adjustBrightness" type="range" min="1" max="100" value="50">
            <p>Slide to adjust image brightness</p>
        </div>     
    </div>
    <div class="panel panel-default">
        <div class="panel-body">
            <input class="image-adjust__contrast" @change="adjustContrast" type="range" min="1" max="100" value="50">
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
        ctx: null, canvas: null,
        img: null, 
        // Properties
        imageContrast: 0, 
        imageBrightness: 0,
    }
  },
  mounted: function(){
    // Instantiate
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.img = document.createElement("img");
  },
  methods: {
    triggerInput: function(event) {
      event.preventDefault();
      this.$refs.fileInput.click();
    },
    adjustBrightness(event){
        console.log(event.target.value);
    },
    adjustContrast(event){
        console.log("adjustContrast : "+event.target.value);
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

            // // Grab position info
            // vm.imageWidth = vm.img.width;
            // vm.imageHeight = vm.img.height;
            // vm.imageRight = vm.imageX + vm.imageWidth;
            // vm.imageBottom = vm.imageY + vm.imageHeight
            
            // // Update CTX
            // vm.draw(false);

            // Notify component
            vm.isImageLoaded = true;
            }
        }
    
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div .img-editor{
  display: flex;
  align-self: auto;
  flex-direction: column;
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
