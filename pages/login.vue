<template>
  <section class="section rtl">
    <div class="form-wrapper">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="form-box card-base card-shadow--extraLarge auth-form"
      >
        <div class="Rectangle">
          <img width="100" src="~/assets/images/logo.png" alt="logo" />
        </div>

        <div class="title">
          <span>الإيميل</span>
        </div>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" autocomplete />
        </el-form-item>
        <div class="title">
          <span>كلمة المرور</span>
        </div>
        <el-form-item prop="password">
          <input
            v-model="form.password"
            class="el-input__inner"
            type="password"
            show-password
            @keydown.enter="onSubmit('form')"
          />
        </el-form-item>

        <div class="flex" style="text-align: center;">
          <el-button
            :loading="loading"
            class="login-btn animated text-uppercase"
            @click="onSubmit('form')"
          >
            تسجيل الدخول
          </el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  layout: "auth",
  data() {
    return {
      loading: false,
      alert: {
        message: "",
        type: "",
      },
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: `الإيميل مطلوب`,
            trigger: "blur",
          },
          {
            type: "email",
            message: `الإيمل غير صحيح`,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: `كلمة المرور مطلوبة`,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          // login
          this.login();
        }
        return false;
      });
    },
    async login() {
      let type = "";
      let message = "";
      await this.$fire.auth.signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
      .then(() => {
        type = 'success'
        message = 'login_s'
        this.showAlert(type, message)
        this.$router.push({
          path: '/',
        })
      })
      .catch(e => {
        console.log(e)
        type = 'error'
        message = e.response.data.message
        this.showAlert(type, message)
      })
      this.loading = false
    },
    showAlert(type, message) {
      this.$message({
        showClose: true,
        message,
        type,
      });
    },
    ddd() {
      
      // await this.$fire.firestore.collection('users').doc(`${123456}`).get()
      // .then((dd) => {
      //   console.log('ccc', dd.data());

      // })
      
      // await this.$fire.auth.signInWithEmailAndPassword(
      //     this.form.email,
      //     this.form.password
      //   ).then((sec) => {
      //   //   console.log('ccc', sec.user);
      //   //   this.$fire.auth.createUserWithEmailAndPassword(
      //   //   'mm@m.com',
      //   //   '123456'
      //   // ).then((sec) => {
      //     console.log('ccc', sec.user);
      //     this.$fire.firestore.collection('users').doc(`${ 55}`).set({
      //         name: "Alawan",
      //         password: "52432",
      //         type: "org",
      //         user_id: "25468"
      //     })
      //   // })
      //   })
      // .then(() => {
      //   type = 'success'
      //   message = this.$t('register.r.login_s')
      //   this.showAlert(type, message)
      //   this.$router.push(this.localePath({ name: 'index' }))
      // })
      // .catch(e => {
      //   console.log(e)
      //   type = 'error'
      //   message = e.response.data.message
      //   this.showAlert(type, message)
      // })
      // this.loading = false
    }
  },
};
</script>

<style scoped>
.login-page {
  overflow: auto !important;
  height: 100vh;
  background: #ffffff;
}
.form-wrapper {
  width: 100%;
}
.form-box {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  box-sizing: border-box;
  margin: 5rem auto;
  border-radius: 16px;
  border: solid 1.1px #e6e9ee;
}
.title {
  margin-bottom: 10px;
  margin-top: 15px;
}
a {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}
.image-logo {
  width: 55px;
  height: 72px;
  padding: 20px;
}
.Rectangle {
  text-align: center;
  margin: 0px auto;
  display: block;
  margin-bottom: 30px;
  background-color: #fff;
}

.login-btn {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#fbaf23),
    to(#e20000)
  );
  color: #ffffff;
  border-color: #f3f7fa;
  border-width: 2px;
  font-weight: bold;
  border-radius: 5px;
  padding: 17px 34px;
  margin: 20px auto 10px;
}

@media (max-width: 768px) {
  .container .view.login-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}
</style>
