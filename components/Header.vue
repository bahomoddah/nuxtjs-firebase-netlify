<template>
  <div class="rtl">
    <div class="header-nav rtl">
      <span>
        <nuxt-link to="/" :class="{ activeLink: activeLink === '/' }" class="btnLink">
          <span class="el-submenu-text">رضاكم</span>
        </nuxt-link>
        <nuxt-link to="/users" :class="{ activeLink: activeLink === '/users' }" class="btnLink">
          <span class="el-submenu-text">المستخدمين</span>
        </nuxt-link>
        <nuxt-link to="/orgs" :class="{ activeLink: activeLink === '/orgs' }" class="btnLink">
          <span class="el-submenu-text">الجهات</span>
        </nuxt-link>
      </span>
      <span>
        <el-dropdown @command="handleCommand">
          <span>
            <span>
              <i class="el-icon-caret-bottom" />
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="email">
                {{ user.displayName ? user.displayName : user.email }}
            </el-dropdown-item>
            <el-dropdown-item command="change_password">
              نسيت كلمة المرور
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided style="color: red;">
              تسجيل الخروج
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      
    },
    async handleCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('logout')
      } else if (command === 'change_password') {
        this.$fire.auth.sendPasswordResetEmail(this.user.email)
      }
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
.btnLink {  
  padding: 10px 20px;
  border-radius: 6px;
}
.activeLink {
  color: #fff;
  background-color: #12044d;
}

</style>
