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
        <el-row v-if="!isNew" class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="id-card-alt" class="ml-5" /> الرقم التعريفي ( id ) </span>
            </div>
            <el-form-item prop="user_id">
              <el-input readonly v-model="form.user_id" placeholder="الرقم التعريفي" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="user" class="ml-5" /> الاسم</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="name">
              <el-input v-model="form.name" placeholder="أكتب الاسم" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="envelope" class="ml-5" /> الإيميل</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                :disabled="!isNew"
                :readonly="!isNew"
                type="email"
                placeholder="مثال: example@example.com"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isNew" class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="unlock-alt" class="ml-5" /> كلمة المرور</span>
              <span v-if="isNew" class="required">*</span>
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
        <el-row class="user-prms" :gutter="20">
          <el-col :span="8">
            <el-checkbox
              v-model="form.allow_add"
              label="السماح بإضافة أسئلة"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="8">
            <el-checkbox
              v-model="form.allow_export"
              label="السماح بتصدير البيانات"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="8">
            <el-checkbox
              v-model="form.allow_print"
              label="السماح بتصدير الاحصائيات"
              style="width: 100%"
            />
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal"> إلغاء </el-button>
        <el-button
          class="btn-add"
          :loading="loading"
          type="primary"
          @click="clickedBtn = 'save'
          onSubmit('form')"
          ><fa icon="save" /> حفظ</el-button
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
          this.loading = true
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
.mb-10 {
  margin-bottom: 10px;
}
</style>
