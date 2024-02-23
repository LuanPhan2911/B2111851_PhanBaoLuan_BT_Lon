import { computed } from "vue";
import { ref } from "vue";

export function useTruncate() {
  const textRef = ref(null);
  const hasOverflow = computed(() => {
    return textRef.value?.scrollHeight > textRef.value?.clientHeight;
  });
  const truncated = ref(true);
  const showText = () => (truncated.value = false);
  const hasShowAction = computed(() => hasOverflow.value && truncated.value);
  return { textRef, hasOverflow, truncated, hasShowAction, showText };
}
