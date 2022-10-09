<template>
  <section class="section rtl">
    <div class="header flex">
      <h1 class="fontColor">
        <fa icon="users" class="ml-5" />المستخدمين
      </h1>
      <span class="display">
        <el-button class="mr-25 btn-add" :disabled="!isAdmin" @click="handleCreate()">
          <span class="flex">
            <fa icon="user-plus" class="ml-5" />
            <span class="p-5">إضافة مستخدم</span>
          </span>
        </el-button>
      </span>
    </div>
    <el-row :gutter="20">
      <el-col class="desktop-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-table
              :data="UsersTable"
              style="width: 100%"
              class="pointer"
            >
              <el-table-column
                prop="name"
                label="اسم المستخدم"
              />
              <el-table-column
                prop="email"
                label="الإيميل"
              />
              <el-table-column v-if="isAdmin" label="الأوامر">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click.native.prevent="handleEdit(scope.row)"
                  >
                    <i class="el-icon-edit-outline" />
                  </el-button>
                  <el-popover :ref="`popover-${scope.$index}`" placement="bottom" width="160">
                    <p style="direction: rtl">هل تريد تأكيد الحذف؟</p>
                    <div style="text-align: left; margin: 0">
                      <el-button type="primary" size="mini" @click.native.prevent="handleDelete(scope)">
                        تأكيد
                      </el-button>
                      <el-button size="mini" type="text" @click="cancel(scope)">
                        إلغاء
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
      :user="modalData"
      :title="modalTitle"
      type="user"
      @closeModal="isInfoModalClosed"
    />
  </section>
</template>

<script>
export default {
  name: 'Users',
  head: {
    title: 'رضاكم - المستخدمين'
  },
  middleware({ store, redirect }) {
    // If the user is not admin
    if (!store.getters.isAdmin) {
      return redirect('/')
    }
  },
  data () {
    return {
      popoverVisible: false,
      modalTitle: '',
      modalData: {},
      update_info_dialog: false
    }
  },
  async fetch ({ store, params }) {
    if (store.state.users.users === undefined) {
      await store.dispatch('fetchUsers')
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    UsersTable() {
      return this.users.users
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    cancel (scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    handleEdit (row) {
      this.update_info_dialog = true
      this.modalData = {
        ...row
      }
      this.modalTitle = 'تحديث بيانات المستخدم'
    },
    handleCreate () {
      this.update_info_dialog = true
      this.modalData = {
        name: '',
        email: '',
        password: '',
        allow_add: true,
        allow_export: true,
        allow_print: true
      }
      this.modalTitle = 'إضافة مستخدم جديد'
    },
    isInfoModalClosed (payload) {
      payload.value === true ? (this.update_info_dialog = false) : true
    },
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
