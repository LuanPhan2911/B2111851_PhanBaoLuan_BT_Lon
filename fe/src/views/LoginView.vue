<script>
export default {
  setup() {},
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5 my-3">
        <div class="card shadow">
          <div class="card-header">
            <h3 class="text-center text-primary">Đăng nhập</h3>
          </div>
          <div class="card-body">
            <form action="/login" method="post" id="login_form">
              <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    name="email"
                    type="email"
                    value=""
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="password" class="col-sm-3 col-form-label"
                  >Mật khẩu</label
                >
                <div class="col-sm-9">
                  <input class="form-control" name="password" type="password" />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary px-5 d-block" type="submit">
                  Đăng nhập
                </button>
              </div>
              <div class="mb-3">
                <p class="text-center">
                  Bạn chưa có tài khoản?
                  <router-link
                    :to="{ name: 'register' }"
                    class="link-primary text-decoration-none"
                    >Đăng ký</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
