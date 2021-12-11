import { Message } from "element-ui";
export const state = () => ({
  user: null,
  users: [],
  orgs: [],
});
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_ORGS(state, orgs) {
    state.orgs = orgs;
  },
};
export const actions = {
  alert({}, data) {
    data.type =
      data.type === "" ? "حدث خطأ.. حاول مرة آخرى" : data.type;
    Message({
      showClose: true,
      message: data.msg,
      type: data.type,
    });
  },
  async nuxtServerInit({ dispatch }, ctx) {
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { ...authUser } = ctx.res.locals.user;
      console.info("Auth User verified on server-side. User: ", authUser);
      await dispatch("onAuthStateChanged", {
        authUser,
      });
    }
  },
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit("SET_USER", null);
      this.$router.push({
        path: "/login",
      });
    } else {
      const { uid, email } = authUser;
      commit("SET_USER", {
        uid,
        email,
      });
    }
  },
  async fetchUsers({ commit, dispatch }, payload) {
    await this.$fire.firestore
      .collection("users")
      .get()
      .then((res) => {
        let users = [];
        let orgs = [];
        res.docs.forEach((doc) => {
          let user = doc.data();
          if (user.type == "org") {
            orgs.push({ ...user });
          } else {
            users.push({ ...user });
          }
        });
        commit("SET_ORGS", orgs);
        commit("SET_USERS", users);
        dispatch('alert', {
          msg: 'تم جلب البيانات بنجاح',
          type: 'success'
        })
      });
  },
  async addNewUser({ dispatch }, payload) {
    this.$fire.firestore
      .collection("users").add({
        name: 'nnn',
        email: 'nn@n.com',
        user_id: '5455'
      })
  },
  async addUser({ dispatch }, payload) {
    await this.$fire.auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    ).then((res) => {
        const id = res.user.uid
        this.$fire.firestore
        .collection("users").doc(id).set({
          name: payload.name,
          email: payload.email,
          type: payload.type,
          user_id: id
        }).then((sec) => {
          console.log('ss', sec);
          dispatch('alert', {
            msg: 'تمت الإضافة بنجاح',
            type: 'success'
          })
        })
      })
  },
  async editUser({ dispatch }, payload) {
    await this.$fire.firestore
      .collection("users").doc(payload.user_id).update({
        name: payload.name
      })
      .then((sec) => {
        console.log('ss', sec);
        dispatch('alert', {
          msg: 'تم تحديث البيانات بنجاح',
          type: 'success'
        })
      })
  },
  async deleteUser({ dispatch }, user_id) {
    await this.$fire.firestore
      .collection("users").doc(user_id).delete()
      .then((sec) => {
        console.log('ss', sec);
        dispatch('alert', {
          msg: 'تم الحذف بنجاح',
          type: 'success'
        })
      })
  },
};
export const getters = {
  getUser(state) {
    return state.user;
  },
};
