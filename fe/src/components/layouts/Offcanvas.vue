<script>
export default {
  setup() {},
};
</script>
<template>
  <div class="offcanvas offcanvas-end" id="offcanvas">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-primary">
        <slot name="title"></slot>
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
