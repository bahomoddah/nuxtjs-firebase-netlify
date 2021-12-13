<template>
  <section class="section rtl">
    <el-row :gutter="24">
      <el-col :span="24" class="flex justify-space-between">
        <div>
          <h2>لوحة التحكم</h2>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="flex">
      <el-col :span="12">
        <el-card class="mb-20">
          <div class="text-center flex justify-space-between">
            <img width="40" src="~/assets/images/users_b2.svg" />
            <span class="h2">
              عدد المستخدمين
              <br />
              <small
                v-if="usersTable.length == 0"
                style="font-size: 12px; color: #251e44"
              >
                لا يوجد مستخدمين
              </small>
            </span>
            <span class="numbers">{{ usersTable.length }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mb-20">
          <div class="text-center flex justify-space-between shopBox">
            <img width="38" src="~/assets/images/orgs_B2.svg" />
            <span class="h2"
              >عدد الجهات<br />
              <small
                v-if="orgsTable.length == 0"
                style="font-size: 12px; color: #251e44"
              >
                لا يوجد جهات
              </small>
            </span>
            <span class="numbers">{{ orgsTable.length }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--  users -->
    <el-row :gutter="20" class="flex">
      <el-col :span="24">
        <div class="header flex">
          <h1 class="mr-15">المستخدمين الجدد</h1>
          <h1>
            <el-button class="mr-20 more" @click="goToUsers">
              عرض المزيد
            </el-button>
          </h1>
        </div>
        <el-table :data="usersTable" style="width: 100%">
          <el-table-column label="اسم المستخدم" prop="name" />
          <el-table-column prop="email" label="الإيميل" />
        </el-table>
      </el-col>
    </el-row>

    <!--  Organizations -->
    <el-row :gutter="20" class="flex">
      <el-col :span="24">
        <div class="header flex">
          <h1 class="mr-15">الجهات الجديدة</h1>
          <h1>
            <el-button class="mr-20 more" @click="goToOrganizations">
              عرض المزيد
            </el-button>
          </h1>
        </div>
        <el-table :data="orgsTable" style="width: 100%">
          <el-table-column prop="name" label="اسم الجهة" />
          <el-table-column prop="email" label="الإيميل" />
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "AdminPanel",
  data() {
    return {};
  },

  async fetch({ store, params }) {
    if (store.state.users.users == undefined || store.state.users.orgs == undefined ) {
      await store.dispatch('fetchUsers')
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    orgsTable() {
      return this.users.orgs;
    },
    usersTable() {
      return this.users.users;
    },
  },
  methods: {
    goToOrganizations() {
      this.$router.push({
        path: '/orgs'
      });
    },
    goToUsers() {
      this.$router.push({
        path: '/users'
      });
    },
  },
};
</script>

<style scoped>
.section {
  max-width: 900px;
  margin: 0 auto;
}
.numbers {
  width: 100px;
  height: 50px;
  border-radius: 29.5px;
  background-color: #eff2f7;
  color: #251e44;
  font-size: 30px;
}
.more {
  width: 95px;
  height: 48px;
  border-radius: 4px;
  background-color: #251e44;
  color: #ffffff;
}
.more:hover {
  background-color: #3dc1b0;
}
</style>
