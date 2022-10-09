import Vue from 'vue'
import Element from 'element-ui'
import ar from 'element-ui/lib/locale/lang/ar'
import elementLocale from 'element-ui/lib/locale';

export default () => {
  Vue.use(Element, { ar })
  elementLocale.use(ar);
}
