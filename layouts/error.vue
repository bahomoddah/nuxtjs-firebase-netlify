<template>
  <section style="display: grid; place-items: center; height: 100vh;">
    <div style="display: grid; place-items: center;">
            <h3 style="text-align: center;">حدث خطأ أو الصفحة التي طلبتها غير موجودة</h3>
            <el-button class="mr-25">
              <nuxt-link to="/">
                <span class="p-5 btn-login">
                  الذهاب للرئيسية <fa icon="arrow-alt-circle-left" class="ml-5"
                /></span>
              </nuxt-link>
            </el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ErrorLayout",
  layout: "auth",
  head: {
    title: "رضاكم - الرئيسية",
  },
};
</script>

<style scoped>
.header {
  font-size: 5rem;
  margin-top: -30px;
  margin-bottom: -10px;
}
.btn-login {
  font-size: 20px;
  font-weight: bold;
}
</style>
