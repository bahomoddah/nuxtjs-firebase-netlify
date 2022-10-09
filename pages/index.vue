<template>
  <section class="sectionStyle">
    <div class="section rtl">
      <el-row :gutter="20">
        <el-col :span="6" :xs="0">
          <div class="divStyleBox" style="margin-top: 8rem">
            <img src="~/assets/images/tools/nuxtjs.png" alt="">
          </div>
          <div class="divStyleBox">
            <img src="~/assets/images/tools/firebase.png" alt="">
          </div>
        </el-col>
        <el-col :span="6" :xs="0">
          <div class="divStyleBox" style="margin-top: 8rem">
            <img src="~/assets/images/tools/element-ui.png" alt="">
          </div>
          <div class="divStyleBox">
            <img src="~/assets/images/tools/netlify.png" alt="">
          </div>
        </el-col>
        <el-col :span="12" :xs="24" class="hero">
          <div class="divStyle">
            <img
              height="60"
              src="~/assets/images/tools/nuxtjs-firebase.png"
            /><br />
            <p>مرحبا بكم في</p>
            <h1 class="hero__header">قائمة الكتب</h1>
            <p> تم عمل الموقع بالتقنات الآتية </p>
            <p>Nuxt.js - Firebase - Element-ui - Netlify</p>

            <br />

            <el-button v-if="isLogin" class="mr-25">
              <nuxt-link to="/books" class="btnLink">
                <span class="el-submenu-text"
                  ><fa icon="paste" /> الكتب</span
                >
              </nuxt-link>
            </el-button>
            <el-button v-else class="mr-25" @click="update_info_dialog = true">
              <!-- <nuxt-link to="/login"> -->
                <span class="p-5 btn-login">
                  دخول <fa icon="arrow-alt-circle-left"
                /></span>
              <!-- </nuxt-link> -->
            </el-button>
            <br /><br />

            <br class="showInSmallDevice" />
            <a href="mailto:bahomoddah@gmail.com">
              <fa icon="at" class="email" style="font-size: 16px;" />
              <span>bahomoddah@gmail.com</span>
            </a>

            <br />

            <a href="https://github.com/bahomoddah" target="_blank">
              <i class="fa fa-github" style="font-size: 16px"></i>
              <span>bahomoddah</span>
            </a>
          </div>
        </el-col>
      </el-row>

      <el-row class="showInSmallDevice" :gutter="20">
        <el-col :span="12" :xs="24">
          <el-row :gutter="20">
            <el-col :span="12" :xs="24">
              <div class="divStyleBox">
            <img src="~/assets/images/tools/nuxtjs.png" alt="">
              </div>
            </el-col>

            <el-col :span="12" :xs="24">
              <div class="divStyleBox">
            <img src="~/assets/images/tools/firebase.png" alt="">
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-row :gutter="20">
            <el-col :span="12" :xs="24">
              <div class="divStyleBox">
            <img src="~/assets/images/tools/element-ui.png" alt="">
              </div>
            </el-col>
            <el-col :span="12" :xs="24">
              <div class="divStyleBox">
            <img src="~/assets/images/tools/netlify.png" alt="">
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <Login
      :dialog-form-visible="update_info_dialog"
      @closeModal="isInfoModalClosed"
    />
  </section>
</template>

<script>
export default {
  name: "HomePage",
  head: {
    title: "لوحة التحكم - الرئيسية",
  },
  data() {
    return {
      loading: false,
      update_info_dialog: false
    };
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user;
    },
  },
  methods: {
    whatsApp() {
      window.open(`https://api.whatsapp.com/send?phone=00967770751034&text=`, '_blank')
    },
    addAnimation() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach( entry => {
          if (entry.isIntersecting) {
            const boxes = document.querySelectorAll(".divStyleBox2")
            boxes.forEach(element => {
              element.classList.add("fadeIn")
            });
          }
        })
      })
      observer.observe(document.querySelector(".container"))
    },
    isInfoModalClosed (payload) {
      payload.value === true ? (this.update_info_dialog = false) : true
    }
  },
  mounted() {
    if (this.isLogin && this.$store.state.is_first_load) {
      this.$store.dispatch("fetchBooks");
      this.$store.commit("SET_FIRST_LOAD", false);
    }
  },
};
</script>

<style scoped>
.btn-login {
  font-size: 20px;
  font-weight: bold;
}

.divStyleBox {
  /* animation: fadeIn 0.8s 0.25s infinite alternate; */
  animation: fadeIn 1.2s both;
  animation-delay: 0.5s;
}
.divStyleBox:nth-of-type(2) {
  animation-delay: 0.8s;
}
.contact-us {
  animation: fadeIn 1.2s both  1.2s;
  /* animation-delay:; */
}
@keyframes fadeIn {
  from {
    transform: translateY(80px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.hero__header {
  animation: slideIn 0.6s;
}
@keyframes slideIn {
  from {
    transform: translateX(20%);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

/* new colors */
.colors {
  color: #108776;
  color: #00c68e;
  color: #2e495e;
  color: #fcca3f;
  color: #f7820d;
  color: #fda615;
}
</style>
