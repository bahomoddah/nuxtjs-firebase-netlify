<template>
  <div class="rtl">
    <el-dialog
      :close-on-press-escape="true"
      :close-on-click-modal="false"
      :show-close="true"
      :visible.sync="dialogFormVisible"
      @close="closeModal"
      class="login-dialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="form-box card-base card-shadow--extraLarge"
      >
        <div class="Rectangle">
          <img width="100" src="~/assets/images/logo.png" alt="logo" />
        </div>

        <div class="title">
          <span><fa icon="envelope" class="ml-5" /> البريد الإلكتروني</span>
        </div>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" autocomplete />
        </el-form-item>
        <div class="title">
          <span><fa icon="unlock-alt" class="ml-5" /> كلمة المرور</span>
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

        <div class="flex" style="text-align: center">
          <el-button
            :loading="loading"
            class="login-btn animated text-uppercase fadeInUp"
            @click="onSubmit('form')"
          >
            <fa icon="sign-in-alt" />
            تسجيل الدخول
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "Login",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
      popoverVisible: false,
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
  computed: {
    showModal() {
      return this.dialogFormVisible;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', { value: true })
      this.$refs.form.resetFields()
    },
    onSubmit(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          this.loading = true;
          await this.$store
            .dispatch('login', { ...this.form })
            .then(() => {         
              this.loading = false;
                this.closeModal();
            })
            .catch((e) => {
              this.loading = false;
              console.log(e);
            });
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
.form-box {
  width: 100%;
  max-width: 400px;
  padding: 0px 15px;
  box-sizing: border-box;
  margin: auto;
}
.title {
  margin-bottom: 10px;
  margin-top: 15px;
  color: #108776
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
  background: #2e495e;
  color: #ffffff;
  border-color: #f3f7fa;
  border-width: 2px;
  font-weight: bold;
  border-radius: 5px;
  padding: 17px 34px;
  margin: 20px auto 10px;
}

.icon {
  position: absolute;
  padding: -12px;
  margin-right: 93%;
  padding-top: 12px;
}
</style>
