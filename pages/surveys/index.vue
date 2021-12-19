<template>
  <section class="section rtl">
    <div class="header flex">
      <h1 class="mr-15">
        استبيان
        <el-select
          v-model="org_id"
          placeholder="حدد الجهة"
          clearable
          filterable
          class="m-0"
        >
          <el-option
            v-for="org in OrganizationsTable"
            :key="org.user_id"
            :value="org.user_id"
            :label="org.name"
          />
        </el-select>
      </h1>
      <h1>
        <el-button type="primary" plain class="mr-25" @click="surveysQes()">
          <span class="flex">
            <img width="20" src="~/assets/images/orgs_w1.svg" />
            <span class="p-5">الأسئلة</span>
          </span>
        </el-button>
      </h1>
    </div>
    <el-row :gutter="20" class="rtl">
      <el-col class="desktop-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-table
              :data="surveyResultsData"
              style="width: 100%"
              class="pointer"
            >
              <el-table-column label="م">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column :label="Qes[0].question">
                <template slot-scope="scope">
                  {{ scope.row[0].answer }}
                </template>
              </el-table-column>
              <el-table-column :label="Qes[1].question">
                <template slot-scope="scope">
                  {{ scope.row[1].answer }}
                </template>
              </el-table-column>
              <el-table-column :label="Qes[2].question">
                <template slot-scope="scope">
                  {{ scope.row[2].answer }}
                </template>
              </el-table-column>
              <el-table-column :label="Qes[3].question">
                <template slot-scope="scope">
                  {{ scope.row[3].answer }}
                </template>
              </el-table-column>
              <el-table-column :label="Qes[4].question">
                <template slot-scope="scope">
                  {{ scope.row[4].answer }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <User
      :dialog-form-visible="update_info_dialog"
      :user="modalDate"
      :title="modalTitle"
      type="org"
      @closeModal="isInfoModalClosed"
    />
  </section>
</template>

<script>
export default {
  name: "Organizations",
  data() {
    return {
      popoverVisible: false,
      modalTitle: "",
      modalDate: {},
      update_info_dialog: false,
      survey_questions: [
        {
          survey_question_id: "sq11",
          user_id: "u1",
          questions: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              question_type: "choices",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              question_type: "choices",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              question_type: "rate",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              question_type: "rate",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              question_type: "rate",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              question_type: "rang",
            },
          ],
        },
        {
          survey_question_id: "sq22",
          user_id: "u2",
          questions: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              question_type: "choices",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              question_type: "choices",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              question_type: "rate",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              question_type: "rate",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              question_type: "rate",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              question_type: "rang",
            },
          ],
        },
      ],
      survey_results: [
        {
          survey_result_id: "sr11",
          user_id: "u1",
          results: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              answer: "ممتاز",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              answer: "مقبول",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              answer: "2.0",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              answer: "4.0",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              answer: "5.0",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              answer: "جيد",
            },
          ],
        },
        {
          survey_result_id: "sr22",
          user_id: "u1",
          results: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              answer: "جيد جدا",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              answer: "ممتاز",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              answer: "2.5",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              answer: "4.7",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              answer: "5.0",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              answer: "ممتاز",
            },
          ],
        },
        {
          survey_result_id: "sr33",
          user_id: "u1",
          results: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              answer: "جيد ",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              answer: "ممتاز",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              answer: "3.5",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              answer: "1.7",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              answer: "1.0",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              answer: "مقبول",
            },
          ],
        },
        {
          survey_result_id: "sr44",
          user_id: "u1",
          results: [
            {
              question: "ماهي درجة رضائك عن المنتجات التي مقدمها لك؟",
              answer: "مقبول",
            },
            {
              question: "كيف كانت معرفة ممثل الخدمة في الإجابة على طلبك ؟",
              answer: "جيد",
            },
            {
              question:
                "هل ترى ان ممثلي الخدمة يتمتعون بروح المبادره مع طلبك أو استفسارك؟",
              answer: "1.5",
            },
            {
              question:
                "كيف تقييم المدة الزمنية لتقديم الخدمة والرد على طلبك أو استفسارك؟",
              answer: "0.7",
            },
            {
              question: "ما مدى تقييمك لسهولة التواصل مع مقدم الخدمة ؟",
              answer: "2.0",
            },
            {
              question: "بشكل عام ما مدى رضاك عن مستوى الخدمة المقدمة لك؟",
              answer: "ضعيف",
            },
          ],
        },
      ],
    };
  },
  async fetch({ store, params }) {
    if (store.state.users.orgs === undefined) {
      await store.dispatch("fetchUsers");
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    OrganizationsTable() {
      return this.users.orgs;
    },
    surveyResultsData() {
      let arr = [];
      const id = "u1";
      arr.user_id = id;
      console.log("this.survey_results", this.survey_results);
      this.survey_results.forEach((res) => {
        console.log("res", res);
        if (res.user_id == id) {
          console.log("yes");
          arr.push({ ...res.results });
        }
      });
      return arr;
    },
    Qes() {
      let arr = [];
      const id = "u1";
      this.survey_questions.forEach((qes) => {
        if (qes.user_id == id) {
          console.log("yes");
          arr = [...qes.questions];
        }
      });
      return arr;
    },
  },
  methods: {
    surveysResExport() {
      this.$store.dispatch("surveysResExport");
    },
    cancel(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose();
    },
    surveysQes(row) {
      this.update_info_dialog = true;
      this.modalData = {
        ...row,
      };
      this.modalTitle = "أسئلة الاستبيان";
    },
    isInfoModalClosed(payload) {
      payload.value === true ? (this.update_info_dialog = false) : true;
      // payload.clickedBtn === 'save' ? this.fetch() : ''
    },
    // importExcel(e) {
    //   console.log('dd', e);
    //   const { files } = e.target
    //   if (!files.length) {
    //     return
    //   } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    //     return alert('The upload format is incorrect. Please upload xls or xlsx format')
    //   }
    //   const fileReader = new FileReader()
    //   const excelData = []
    //   fileReader.onload = ev => {
    //     // try {
    //     const data = ev.target.result
    //     const workbook = XLSX.read(data, {
    //       type: 'binary'
    //     })
    //     const wsname = workbook.SheetNames[0] // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
    //     const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
    //     // Edit data
    //     for (let i = 0; i < ws.length; i++) {
    //       excelData.push(ws[i])
    //     }
    //     console.log('data', excelData);
    //     // } catch (e) {
    //     //   return alert('Read failure!')
    //     // }
    //   }
    //   fileReader.readAsBinaryString(files[0])
    //   const input = document.getElementById('upload')
    //   input.value = ''
    // },
    async handleDelete(scope = -1) {
      await this.cancel(scope);
      await this.$store
        .dispatch("deleteUser", scope.row.user_id)
        .then(async () => {
          await this.fetch();
        })
        .catch((e) => console.log(e));
    },
    fetch(page_num = 1) {
      this.$store.dispatch("fetchUsers");
    },
  },
};
</script>

<style>
.active {
  background-color: #3dc1b0;
  padding: 8px 10px;
  color: white;
  border-radius: 6px;
  border: solid 1px #3dc1b0;
  /* background-color: var(--greeny-blue); */
}
.notActive {
  background-color: #fbb429;
  padding: 8px 10px;
  color: white;
  border-radius: 6px;
  border: solid 1px #fbb429;
}
</style>
