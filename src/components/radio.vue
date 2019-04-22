<template>
  <div class="mul-select" @click.stop="changeStatus"
       :style="{width: width, height: height, background: bgColor}"
       ref="radio">
  </div>
</template>

<script>
  export default {
    name: 'radio',
    props: {
      width: {
        type: String,
        default: '1.8rem'
      },
      height: {
        type: String,
        default: '1.8rem'
      },
      bgc: {
        type: String,
        default: '#33a8c6'
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        status: this.value,
        bgColor: '#fff'
      }
    },
    watch: {
      value: function (newVal, oldVal) {
        if (newVal === oldVal) return;
        this.status = newVal;
        this.reRender();
      }
    },
    mounted() {
      this.reRender();
    },
    methods: {
      changeStatus() {
        this.$emit('input', !this.status);
      },
      reRender() {
        if (this.status) {
          this.bgColor = this.bgc;
          this.$refs.radio.style.border = 'none';
        } else {
          this.bgColor = '#fff';
          this.$refs.radio.style.border = '1px solid #b8b8b8';
        }
      }
    }
  }
</script>

<style scoped>
  .mul-select{
    transition: transform .1s, background-color .1s;
    border-radius: 50%;
    border: 1px solid #b8b8b8;
  }
  .mul-select:active{
    transform: scale(.6);
  }
</style>
