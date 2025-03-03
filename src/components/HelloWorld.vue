<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div>
    <div>
      <span>Count: {{ count }}</span>
    </div>
    <div>
      <button
        type="button"
        @click="count = count + 1">+</button>
    </div>
  </div>
</template>
