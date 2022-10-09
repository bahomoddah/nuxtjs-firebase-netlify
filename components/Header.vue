<template>
  <div class="rtl">
    <div class="header-nav rtl">
      <nuxt-link to="/">
        <img class="logo" height="55" src="~/assets/images/tools/nuxtjs-firebase.png" />
      </nuxt-link>
      <span>
        <nuxt-link v-if="isLogin && isAdmin" to="/users" :class="{ activeLink: activeLink.includes('/users') }" class="btnLink">
          <span class="el-submenu-text"><fa icon="users" /> المستخدمين</span>
        </nuxt-link>
        <nuxt-link v-if="isLogin && isAdmin" to="/books" :class="{ activeLink: activeLink.includes('/books') }" class="btnLink">
          <span class="el-submenu-text"><fa icon="city" /> كتب </span>
        </nuxt-link>
      </span>
      <span>
        <el-dropdown @command="handleCommand">
          <span>
            <span>
              <fa icon="cog" style="cursor: pointer" />
            </span>
          </span>
          <el-dropdown-menu slot="dropdown" style="direction: rtl">
            <el-dropdown-item v-if="isLogin" command="email" style="color: #108776">
              <fa icon="user" class="ml-5" /> {{ userDetails.name }}
            </el-dropdown-item>
            <!-- <el-dropdown-item v-if="isLogin" command="change_password">
              نسيت كلمة المرور
            </el-dropdown-item> -->
            <el-dropdown-item v-if="isLogin" command="logout" divided style="color: red;">
              <fa icon="sign-out-alt" class="ml-5" />
              تسجيل الخروج
            </el-dropdown-item>
            <el-dropdown-item v-if="!isLogin" command="login">
              <fa icon="sign-in-alt" class="ml-5" />
              تسجيل الدخول
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
    userDetails() {
      return this.$store.state.userDetails || {};
    },
    isLogin() {
      return !!this.$store.state.user
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  watch: {},
  methods: {
    async handleCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('logout')
      } else if (command === 'change_password') {
        this.$fire.auth.sendPasswordResetEmail(this.userDetails.email)
      } else if (command === 'login') {
        this.$router.push({
          path: "/login",
        });
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
  background-color: #e7e4ed;
  color: #2e495e;
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
  color: #108776;
  padding: 10px 20px;
  border-radius: 6px;
}
.activeLink {
  color: #ffffff !important;
  background-color: #2e495e;
}
.logo {
  margin-top: 12px;
}
.linkStyle {
  color: #2e495e !important
}
@media (max-width: 768px) {
  .header-nav {
    padding: 2px 5px 2px 10px;
  }
  .header-nav a {
    margin: 0 2px;
  }
  .btnLink {
    padding: 10px 10px;
  }
}
@media (max-width: 460px) {
  .header-nav {
    padding: 2px 5px 2px 8px;
  }
  .header-nav a {
    margin: 0 0px;
  }
  .btnLink {
    padding: 5px;
  }
  .header-nav a svg {
    width: 1em !important;
  }
  .header-nav a span {

    font-size: 14px;
  }
}
</style>
