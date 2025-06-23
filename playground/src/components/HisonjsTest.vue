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
    try {
        console.log(hison.utils.formatDateDash(new Date));
        console.log(hison.utils.formatDateCompact(new Date));
        console.log(hison.utils.getDateWithFormat(new Date, AllDateTimeFormat['MMMM dd yyyy hh:mm:ss']));
    } catch (error) {
        console.log(error)
    }
};
const test2 = () => {
    try {
        console.log(hison.utils.getDatetimeObject('20240228'))
        console.log(hison.utils.getDateWithFormat('20240228 15:27:59', AllDateTimeFormat['MMMM dd yyyy hh:mm:ss']))
        console.log(hison.utils.getDateWithFormat('20240229'))
        console.log(hison.utils.getDateWithFormat('2025-03-19'))
        console.log(hison.utils.getDateWithFormat('2025-03'))
        console.log(hison.utils.getDateWithFormat('2024/02/29 111133'))
    } catch (error) {
        console.log(error)
    }
};
const test3 = () => {
    alert('3');
};

onMounted(()=>{
})
onBeforeUnmount(()=>{
})
</script>
