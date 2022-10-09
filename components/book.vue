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
            <div class="mb-10">
              <span><fa icon="book" class="ml-5" /> اسم الكتاب</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="required">
              <el-input v-model="form.name" placeholder="أكتب اسم الكتاب" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="book" class="ml-5" /> المؤلف</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="required">
              <el-input v-model="form.author" placeholder="أكتب اسم المؤلف" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex" :gutter="20">
          <el-col :span="24">
            <div class="mb-10">
              <span><fa icon="book" class="ml-5" /> عدد الصفحات</span>
              <span class="required">*</span>
            </div>
            <el-form-item prop="required">
              <el-input-number v-model="form.pages" placeholder="أكتب عدد الصفحات" />
            </el-form-item>
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
  name: "BookModal",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    book: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "تحديث بيانات الكتاب",
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
        required: [
          {
            required: true,
            message: `الحقل مطلوب`,
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
      return !this.book.book_id
    }
  },
  watch: {
    book() {
      this.form = {
        ...this.book,
      };
      this.old_form = {
        ...this.book,
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
          let action = this.isNew  ? 'addBook' : 'editBook'
            await this.$store
              .dispatch(action, this.form)
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
