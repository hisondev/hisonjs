<template>
    <div ref="wrap">
      <button @click="test1">test 1</button>
      <button @click="test2">test 2</button>
      <button @click="test3">test 3</button>
      <p>test</p>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { AllDateTimeFormat, Hison } from 'hisonjs';
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
const wrap = ref<HTMLElement | null>(null);
const { proxy } = getCurrentInstance()!;
const hison: Hison = (proxy as any)!.$hison;

const test1 = () => {
    console.log(hison.utils.getSysDate(AllDateTimeFormat['MMMM dd yyyy hh:mm:ss']));
    console.log(hison.utils.getNumberFormat(1234.1234));
    console.log(hison.utils.getNumberFormat(1234.1234, '#,###.#####'));
    console.log(hison.utils.getNumberFormat(1234.1234, '#.00000'));
    console.log(hison.utils.getNumberFormat(0.1234, '0.00000'));
    console.log(hison.utils.getNumberFormat(0.1234, '#.#####'));
};
const test2 = () => {
    alert('2');
};
const test3 = () => {
    alert('3');
};

onMounted(()=>{
})
onBeforeUnmount(()=>{
})
</script>
