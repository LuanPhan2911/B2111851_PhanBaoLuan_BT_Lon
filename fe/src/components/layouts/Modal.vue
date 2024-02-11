<script>
export default {
  name: "Modal",
  emits: ["onHide"],
  setup(props, { emit }) {
    const onHide = () => emit("onHide");
    return {
      onHide,
    };
  },
};
</script>
<template>
  <Teleport to="body">
    <div class="modal fade modal-lg" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="title"></slot>
            <button type="button" class="btn-close" @click="onHide"></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div></div
  ></Teleport>
</template>
