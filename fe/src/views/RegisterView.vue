<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5 my-3">
        <div class="card shadow">
          <div class="card-header">
            <h3 class="text-center text-primary">Đăng ký</h3>
          </div>
          <div class="card-body">
            <form action="/register" method="post" id="register_form">
              <div class="mb-3 row">
                <label for="name" class="col-sm-3 col-form-label"
                  >Tên đăng nhập</label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    name="name"
                    type="text"
                    id="name"
                    value=""
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    name="email"
                    type="email"
                    id="email"
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
              <div class="mb-3 row">
                <label for="confirm_password" class="col-sm-3 col-form-label"
                  >Nhập lại mật khẩu</label
                >
                <div class="col-sm-9">
                  <input
                    class="form-control"
                    name="confirm_password"
                    type="password"
                  />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary px-5" type="submit">
                  Đăng ký
                </button>
              </div>
              <div class="mb-3">
                <p class="text-center">
                  Bạn đã có tài khoản?
                  <router-link
                    :to="{ name: 'login' }"
                    class="link-primary text-decoration-none"
                    >Đăng nhập
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
