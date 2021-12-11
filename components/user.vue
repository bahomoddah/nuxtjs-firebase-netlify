<template>
  <div class="user-modal rtl">
    <el-dialog
      :close-on-press-escape="true"
      :close-on-click-modal="false"
      :show-close="true"
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="closeModal"
    >
      <el-form ref="form" :model="form" :rules="rules" class="user_form">
        <el-row class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10 mt-10">
              <span>الاسم</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="name">
              <el-input v-model="form.name" placeholder="أكتب الاسم" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isNew" class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10 mt-10">
              <span>الإيميل</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                type="email"
                placeholder="مثال: example@example.com"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isNew"  class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10 mt-10">
              <span>كلمة المرور</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="كلمة المرور"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal"> إلغاء </el-button>
        <el-button
          class="btn_add"
          :loading="loading"
          type="primary"
          @click="clickedBtn = 'save'
          onSubmit('form')"
          >حفظ</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "UserManage",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "user",
    },
    title: {
      type: String,
      default: "تحديث بيانات المستخدم",
    },
  },
  data() {
    return {
      loading: false,
      popoverVisible: false,
      clickedBtn: '',
      form: {},
      old_form: {},
      rules: {
        name: [
          {
            required: true,
            message: `الاسم مطلوب`,
            trigger: "blur",
          },
        ],
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
    },
    isNew() {
      return !this.user.user_id
    }
  },
  watch: {
    user() {
      this.form = {
        ...this.user,
      };
      this.old_form = {
        ...this.user,
      };
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', { clickedBtn: this.clickedBtn, value: true })
      this.$refs.form.resetFields()
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let action = this.isNew  ? 'addUser' : 'editUser'
            await this.$store
              .dispatch(action, { ...this.form, type: this.type })
              .then(() => {
                this.closeModal();
              })
              .catch((e) => console.error(e));
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
