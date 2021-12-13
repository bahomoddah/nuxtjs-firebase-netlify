<template>
  <section class="section rtl">
    <div class="header flex">
      <h1 class="mr-15">
        قائمة الجهات
      </h1>
      <h1>
        <el-button type="primary" plain class="mr-25" @click="handleCreate()">
          <span class="flex">
            <img width="20" src="~/assets/images/orgs_w1.svg">
            <span class="p-5">إضافة جهة</span>
          </span>
        </el-button>
        
        <!-- <input id="upload" type="file" class="file-input" accept=".xlsx, .xls" @change="importExcel" /> -->
      </h1>
    </div>
    <el-row :gutter="20">
      <el-col class="desktop-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-table
              :data="OrganizationsTable"
              style="width: 100%"
              class="pointer"
            >
              <el-table-column
                prop="name"
                label="اسم الجهة"
              />
              <el-table-column
                prop="email"
                label="الإيميل"
              />
              <el-table-column label="">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click.native.prevent="handleEdit(scope.row)"
                  >
                    <i class="el-icon-edit-outline" />
                  </el-button>
                  <el-popover :ref="`popover-${scope.$index}`" placement="bottom" width="160">
                    <p>تأكيد الحذف؟</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="cancel(scope)">
                        إالغاء
                      </el-button>
                      <el-button type="primary" size="mini" @click.native.prevent="handleDelete(scope)">
                        تأكيد
                      </el-button>
                    </div>
                    <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger" />
                  </el-popover>
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
  name: 'Organizations',
  data () {
    return {
      popoverVisible: false,
      modalTitle: '',
      modalDate: {},
      update_info_dialog: false
    }
  },
  async fetch ({ store, params }) {
    if (store.state.users.orgs === undefined) {
      await store.dispatch('fetchUsers')
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    OrganizationsTable() {
      return this.users.orgs
    }
  },
  methods: {
    OrganizationsExport () {
      this.$store.dispatch('OrgsExport')
    },
    cancel (scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    handleEdit (row) {
      this.update_info_dialog = true
      this.modalData = {
        ...row
      }
      this.modalTitle = 'تحديث بيانات الجهة'
    },
    handleCreate () {
      this.update_info_dialog = true
      this.modalData = {
        name: '',
        email: '',
        password: '',
        is_active: false
      }
      this.modalTitle = 'إضافة جهة جديدة'
    },
    isInfoModalClosed (payload) {
      payload.value === true ? (this.update_info_dialog = false) : true
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
    async handleDelete (scope = -1) {
      await this.cancel(scope)
      await this.$store
        .dispatch('deleteUser', scope.row.user_id)
        .then(async () => {
          await this.fetch()
        })
        .catch(e => console.log(e))
    },
    fetch (page_num = 1) {
      this.$store.dispatch('fetchUsers')
    }
  }
}
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
