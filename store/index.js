import { Message } from "element-ui";
export const state = () => ({
  user: null,
  users: {},
});
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users.users = users;
  },
  SET_ORGS(state, orgs) {
    state.users.orgs = orgs;
  },
  ADD_USER(state, user) {
    user.type == "org"
      ? state.users.orgs.push(user)
      : state.users.users.push(user);
  },
};
export const actions = {
  alert({}, data) {
    data.type = data.type === "" ? "حدث خطأ.. حاول مرة آخرى" : data.type;
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
  async login({ commit, dispatch }, payload) {
    await this.$fire.auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((userData) => {
        console.log('55');
        this.$router.push({
          path: "/",
        });
        dispatch("alert", {
          msg: "تم تسجيل الدخول بنجاح",
          type: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch("alert", {
          msg: "حدث خطأ.. حاول مرة آخرى",
          type: "error",
        });
      });
  },
  async logout({ commit, dispatch }, payload) {
    this.$fire.auth
      .signOut()
      .then(() => {
        commit("SET_USER", null);
        // Direction to login page
        this.$router.push({
          path: "/login",
        });
        dispatch("alert", {
          msg: "تم تسجيل الخروج بنجاح",
          type: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch("alert", {
          msg: "حدث خطأ.. حاول مرة آخرى",
          type: "error",
        });
      });
  },
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit("SET_USER", null);
      this.$router.push({
        path: "/login",
      });
    } else {
      const { uid, email, displayName } = authUser;
      commit("SET_USER", { uid,
        email,
        displayName
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
        dispatch("alert", {
          msg: "تم جلب البيانات بنجاح",
          type: "success",
        });
      });
  },
  async addNewUser({ dispatch }, payload) {
    this.$fire.firestore.collection("users").add({
      name: "nnn",
      email: "nn@n.com",
      user_id: "5455",
    });
  },
  async addUser({ commit, dispatch }, payload) {
    await this.$fire.auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userData) => {
        // update name of user in firebase auth
        userData.user.updateProfile({
          displayName: payload.name,
          photoURL: ''
        })
        const user = {
          name: payload.name,
          email: payload.email,
          type: payload.type,
          user_id: userData.user.uid,
        };
        this.$fire.firestore
          .collection("users")
          .doc(user.user_id)
          .set({
            ...user,
          })
          .then(() => {
            commit("ADD_USER", user);
            dispatch("alert", {
              msg: "تمت الإضافة بنجاح",
              type: "success",
            });
          });
      });
  },
  async editUser({ commit, dispatch }, payload) {
    await this.$fire.firestore
      .collection("users")
      .doc(payload.user_id)
      .update({
        name: payload.name,
      })
      .then((sec) => {
        console.log("ss", sec);
        dispatch("alert", {
          msg: "تم تحديث البيانات بنجاح",
          type: "success",
        });
      });
  },
  async deleteUser({ dispatch }, user_id) {
    await this.$fire.firestore
      .collection("users")
      .doc(user_id)
      .delete()
      .then((sec) => {
        console.log("ss", sec);
        dispatch("alert", {
          msg: "تم الحذف بنجاح",
          type: "success",
        });
      });
  },
};
export const getters = {
  getUser(state) {
    return state.user;
  },
};
