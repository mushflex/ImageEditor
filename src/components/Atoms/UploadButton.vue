<template>
    <button class="btn btn-upload grey" @click="clicked">
        <div class="triangle"></div>
        <label>Upload</label>
    </button>
</template>

<script>
export default {
  name: 'Header',
  props: ['callbackFunc'],
  methods: {
    clicked(event) {
        event.preventDefault();
        // emit changes to parent component
        this.$emit("callbackFunc");
    }
  }
}
</script>

<style scoped>
label {
    cursor: pointer;
}
.btn-upload {
    font-weight: 500; 
    color: #5c9de5;
    border: 1px solid #dcdcdc;
    display: flex;
    padding-bottom: 0;
}
.triangle {
	position: relative;
	background-color:#5c9de5;
	text-align: left;
    margin-right: 10px;
    margin-top: 7px;
}
.triangle:before,
.triangle:after {
	content: '';
	position: absolute;
	background-color: inherit;
}
.triangle,
.triangle:before,
.triangle:after {
	width:  0.5rem;
	height: 0.5rem;
	border-top-right-radius: 30%;
}

.triangle {
	transform: rotate(-60deg) skewX(-30deg) scale(1,.866);
}
.triangle:before {
	transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%);
}
.triangle:after {
	transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%);
}
</style>
