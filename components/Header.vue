<template>
  <div class="rtl">
    <div class="header-nav rtl">
     <span>
        <nuxt-link to="/" :class="{ activeLink: activeLink === '/' }">
        <span class="el-submenu-text">رضاكم</span>
      </nuxt-link>
      <nuxt-link to="/users" :class="{ activeLink: activeLink === '/users' }">
        <span class="el-submenu-text">المستخدمين</span>
      </nuxt-link>
      <nuxt-link to="/orgs" :class="{ activeLink: activeLink === '/orgs' }">
        <span class="el-submenu-text">الجهات</span>
      </nuxt-link>
     </span>
      <span>
        <span class="email"> {{ user.email }}</span>
      <el-button type="primary" plain class="mr-25" @click="logout()">
        <span class="flex">
          <span class="p-5">تسجيل الخروج</span>
        </span>
      </el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeLink: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },
  watch: {},
  methods: {
    handleSelect(e) {
      console.log("ee", e);
    },
    logout() {
      this.$fire.auth.signOut().then(() => {
        this.$store.commit("SET_USER", null);
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
  created() {
    this.activeLink = this.$router.currentRoute.path;
    this.$router.afterEach(() => {
      this.activeLink = this.$router.currentRoute.path;
    });
  },
};
</script>

<style>
.header-nav {
  background-color: #bfa628;
  color: #12044d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 20px;
}
.header-nav a {
  display: inline-block;
  margin: 0 10px;
}
.activeLink {
  color: #fff;
  background-color: #12044d;
  padding: 10px 20px;
  border-radius: 6px;
}

@media (max-width: 600px) {
  .email {
    display: none;
  }
}
</style>
