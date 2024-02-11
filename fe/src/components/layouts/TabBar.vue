<script>
export default {
  name: "TabBar",
  setup() {},
};
</script>
<template>
  <div>
    <div class="nav nav-tabs nav-fill" id="tab-bar">
      <slot name="title"></slot>
    </div>
    <div class="tab-content">
      <slot name="body"></slot>
    </div>
  </div>
</template>
