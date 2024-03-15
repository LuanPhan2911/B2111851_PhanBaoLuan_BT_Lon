<script>
import { computed, ref } from "vue";

export default {
  props: ["text", "hoverClass"],
  setup(props) {
    const text = computed(() => props.text);
    const isHover = ref(false);
    const hoverClass = computed(() => {
      return props.hoverClass || "animate__tada";
    });
    return {
      text,
      isHover,
      hoverClass,
    };
  },
};
</script>
<template>
  <button
    class="btn fw-bold animate__animated"
    :class="[isHover ? hoverClass : '']"
    @mouseover="isHover = true"
    @mouseout="isHover = false"
  >
    {{ text }}
  </button>
</template>
