import { onMounted } from "vue";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import { ref } from "vue";
import { computed } from "vue";
export function useModal(data) {
  const modalContents = ref(data);
  const modalInstance = ref(null);
  onMounted(() => {
    modalInstance.value = new Modal("#modal");
  });
  const onShow = () => modalInstance.value?.show();
  const onHide = () => modalInstance.value?.hide();
  const modalContent = computed(() => {
    return modalContents.value.find((item) => {
      return item.active;
    });
  });
  const setModalContent = (id) => {
    modalContents.value = modalContents.value.map((item) => {
      return {
        ...item,
        active: item.id === id ? true : false,
      };
    });
  };
  return { onShow, onHide, setModalContent, modalContent };
}
