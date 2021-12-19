<template>
  <el-card class="box-card rtl">
    <div slot="header" class="clearfix header flex justify-space-between">
      <h3 class="m-20">
        <span>الأسئلة</span>
      </h3>
    </div>
    <el-form ref="form" :model="form">
      <el-row
        v-for="(condition, index) in form.conditions"
        :key="index"
        :gutter="20"
        class="rtl"
      >
        <el-col :span="16">
          <div class="mb-15">
            <span class="pb-5" style="color: #1fb6ff">
              السؤال {{ index + 1 }}
            </span>
          </div>
          <el-form-item prop="">
            <el-input
              v-model="condition.question"
              type="text"
              :rows="2"
              style="
                border: 1px solid #1fb6ff;
                border-radius: 4px;
                direction: rtl;
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="mb-15">
            <span> نوع السؤال </span>
          </div>
          <el-form-item prop="">
            <el-select
              v-model="form.question_type"
              placeholder="حدد نوع الؤال"
              clearable
              filterable
              class="m-0"
            >
              <el-option
                v-for="type in question_types"
                :key="type"
                :value="type.value"
                :label="type.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <div class="mt-45">
            <el-popover
              :ref="`popover-${index}`"
              placement="bottom"
              width="160"
              class="mt-20"
            >
              <p>حذف</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancel(index)">
                  إلغاء
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click.native.prevent="handleDelete(index)"
                >
                  تأكيد
                </el-button>
              </div>
              <el-button
                slot="reference"
                :disabled="lastCondition"
                size="mini"
                icon="el-icon-delete"
                type="danger"
              />
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <div class="clearfix header flex justify-space-between">
        <h3>
          <el-button
            class="addCondition"
            icon="mdi mdi-24px mdi-plus-circle ml-5"
            @click="addCondition()"
          >
            <span>إضافة سؤال</span>
          </el-button>
        </h3>
        <h3>
          <el-button
            :loading="loading"
            type="primary"
            class="mr-40 btn_add_settings"
            @click="onSubmit('form')"
          >
            حفظ
          </el-button>
        </h3>
      </div>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      question_types: [
        { name: "اختيارات", value: "choices" },
        { name: "معدل", value: "rate" },
        { name: "تسلسل", value: "rang" },
      ],
      form: {
        conditions: [],
      },
      old_form: {
        conditions: [],
      },
    };
  },
  computed: {
    lastCondition() {
      return this.form.conditions.length === 1;
    },
    isEmpty() {
      for (let i = 0; i < this.form.conditions.length; i++) {
        const condition = this.form.conditions[i];
        if (!condition.question && !condition.question_type) {
          return true;
        }
      }
      return false;
    },
  },
  created() {
    this.fillForm();
  },
  methods: {
    addCondition() {
      if (this.form.conditions.length >= 20) {
        this.$alert("بلغت الحد الأعلى للأسئلة", "تحذير", {
          type: "warning",
          center: true,
          confirmButtonText: "تأكيد",
        });
      } else {
        this.form.conditions.push({ question: "", question_type: "" });
      }
    },
    cancel(index) {
      this.$refs[`popover-${index}`][0].doClose();
    },
    async handleDelete(index) {
      await this.cancel(index);
      this.form.conditions.splice(index, 1);
    },
    fillForm() {
      const conditions = [];
      const arr = [];
      for (let i = 0; i < conditions.length; i++) {
        const names = {};
        names.question = conditions[i].question;
        names.question_type = conditions[i].question_type;
        arr.push(names);
      }
      this.form = {
        conditions: arr,
      };
      const arr2 = [];
      for (let i = 0; i < conditions.length; i++) {
        const names = {};
        names.question = conditions[i].question;
        names.question_type = conditions[i].question_type;
        arr2.push(names);
      }
      this.old_form = {
        conditions: arr2,
      };
    },
    onSubmit(formName) {
      if (this.isEmpty) {
        this.$alert("أقل شي سؤال واحد", "تحذير", {
          type: "warning",
          center: true,
          confirmButtonText: "تأكيد",
        });
      } else {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true;
            const form_data = new FormData();
            for (let i = 0; i < this.form.conditions.length; i++) {
              const condition = this.form.conditions[i];
            }
            await this.$store.dispatch("fetchUsers").then(() => {
              this.fillForm();
              this.loading = false;
            });
          }
        });
      }
    },
  },
};
</script>
<style>
.addCondition {
  border: 2px dashed #ffffff;
  border-radius: 4px;
  color: #ffffff;
  padding: 13px 20px;
  background-color: #45d3be;
}
</style>
