<script>
export default {
  name: "TabBar",
  setup() {},
};
</script>
<template>
  <div>
    <nav>
      <div class="nav nav-tabs nav-fill">
        <slot name="title"></slot>
      </div>
    </nav>
    <div class="tab-content">
      <slot name="body"></slot>
    </div>
  </div>
</template>
