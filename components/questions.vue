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
    survey_question: {
      type: Object,
      default: () => {},
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
      },
    };
  },
  computed: {
    showModal() {
      return this.dialogFormVisible;
    },
    isNew() {
      return !this.survey_question
    }
  },
  watch: {
    survey_question() {
      this.form = {
        ...this.survey_question,
      };
      this.old_form = {
        ...this.survey_question,
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
