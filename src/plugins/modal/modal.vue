<template>
  <div class="modal-backdrop">
     <div class="modal">
        <div class="modal-header">
          {{title}}
        </div>
        <div class="modal-body">
            {{content}}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-close" @click="close" v-if="showCancle">{{cancleText}}</button>
            <button type="button" class="btn-confirm" @click="confirm">{{confirmText}}</button>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'modal',
  props: {
    title:{
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    showCancle: {
        type: Boolean,
        default: true
    },
    confirmText: {
        type: String,
        default: '确认'
    },
    cancleText: {
        type: String,
        default: '取消'
    }
  },
  data() {
    return {       
    }
  },
  methods: {
    closeSelf() {
        this.$emit('on-cancel');
    },
    confirm() {
        this.$emit('on-confirm');
    }
  }
}
</script>
<style>
.modal-backdrop { 
    position: fixed; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 
    background-color: rgba(0,0,0,.5); 
    width: 100%;
    height: 100%;
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
.modal { 
    background-color: #fff; 
    box-shadow: 2px 2px 20px 1px; 
    overflow-x:auto; 
    display: flex; 
    flex-direction: column;
    border-radius: 16px;
} 
.modal-header { 
    border-bottom: 1px solid #eee; 
    color: #313131; 
    justify-content: space-between;
    padding: 15px; 
    display: flex; 
} 
.modal-footer { 
    border-top: 1px solid #eee; 
    justify-content: flex-end;
    padding: 15px; 
    display: flex; 
} 
.modal-body { 
    position: relative; 
    padding: 20px 10px; 
}
.btn-close, .btn-confirm {    
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
}
.btn-close {
    color: #313131;
    background-color:transparent;
}
.btn-confirm {
    color: #fff; 
    background-color: #2d8cf0;
}


</style>

