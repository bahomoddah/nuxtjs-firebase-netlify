import { Message } from "element-ui";
export const state = () => ({
  user: null,
  userDetails: null,
  users: {},
  books: [],
  is_first_load: true
});
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  GET_USER_DETAILS(state, user) {
    state.userDetails = user;
  },
  SET_USERS(state, users) {
    state.users.users = users;
  },
  ADD_USER(state, user) {
    state.users.users.push(user);
  },
  SET_FIRST_LOAD(state, payload) {
    state.is_first_load = payload
  },
  SET_BOOKS(state, books) {
    state.books = books;
  },
  ADD_BOOK(state, book) {
    state.books.push(book);
  }
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
        localStorage.setItem('email', payload.email)
        localStorage.setItem('password', payload.password)
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
          path: "/",
        });
        localStorage.clear()
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
  async onAuthStateChanged({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      commit("SET_USER", null);
      commit("GET_USER_DETAILS", null);      
      this.$router.push({
        path: "/",
      });
    } else {
      const { uid, email, displayName } = authUser;
      commit("SET_USER", { uid,
        email,
        displayName
      });
      dispatch('getUserDetails', { user_id: uid } )
    }
  },
  async fetchUsers({ commit, dispatch }) {
    await this.$fire.firestore
      .collection("users")
      .get()
      .then((res) => {
        let users = [];
        let orgs = [];
        res.docs.forEach((doc) => {
          let user = doc.data();
          users.push({ ...user });
        });
        commit("SET_USERS", users);
        // dispatch("alert", {
        //   msg: "تم جلب البيانات بنجاح",
        //   type: "success",
        // });
      });
  },
  async relogin() {
    // await this.$fire.auth.signOut()
    await this.$fire.auth
    .signInWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('password'))
  },
  async getUserDetails({ commit, dispatch }, payload) {
    this.$fire.firestore
      .collection("users")
      .doc(payload.user_id)
      .get()
      .then((res) => {
        commit("GET_USER_DETAILS", res.data());
      })
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
          allow_add: payload.allow_add,
          allow_export: payload.allow_export,
          allow_print: payload.allow_print,
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
            // to logout from this user and login with the admin email
            dispatch("relogin");
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
        email: payload.email,
        allow_add: payload.allow_add,
        allow_export: payload.allow_export,
        allow_print: payload.allow_print
      })
      .then(() => {
        dispatch('fetchUsers')
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
        dispatch("alert", {
          msg: "تم الحذف بنجاح",
          type: "success",
        });
      });
  },
  async fetchBooks({ commit, dispatch }) {
    await this.$fire.firestore
      .collection("books")
      .get()
      .then((res) => {
        let books = [];
        res.docs.forEach((doc) => {
          let book = doc.data();
          books.push({ ...book });
        });
        commit("SET_BOOKS", books);
        // dispatch("alert", {
        //   msg: "تم جلب البيانات بنجاح",
        //   type: "success",
        // });
      });
  },
  async addBook({ commit, dispatch }, payload) {
        const book = {
          name: payload.name,
        };
        await this.$fire.firestore
          .collection("books")
          .doc(book.book_id)
          .set({
            ...book,
          })
          .then(() => {
            commit("ADD_BOOK", book);
            dispatch("alert", {
              msg: "تمت الإضافة بنجاح",
              type: "success",
            });
          });
  },
  async editBook({ commit, dispatch }, payload) {
    await this.$fire.firestore
      .collection("books")
      .doc(payload.book_id)
      .update({
        name: payload.name,
      })
      .then(() => {
        dispatch('fetchBooks')
        dispatch("alert", {
          msg: "تم تحديث البيانات بنجاح",
          type: "success",
        });
      });
  },
  async deleteBook({ dispatch }, book_id) {
    await this.$fire.firestore
      .collection("books")
      .doc(book_id)
      .delete()
      .then((sec) => {
        dispatch("alert", {
          msg: "تم الحذف بنجاح",
          type: "success",
        });
      });
  }
};
export const getters = {
  getUser(state) {
    return state.user;
  },
  isAdmin(state) {
    const type = state.userDetails ? state.userDetails.type : ''
    return !!state.user && type !== 'org'
  },
  allowAdd(state) {
    const user = state.userDetails || {}
    return user.type == 'org' ? user.allow_add : true
  }
};
