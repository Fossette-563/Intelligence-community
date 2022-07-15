import Dialog from '@/components/Dialog.vue'
import From from '@/components/From.vue'
import Table from '@/components/Table.vue'
import Page from '@/components/Page.vue'

export default {
  install(Vue) {
    ;[Dialog, From, Table, Page].forEach((item) =>
      Vue.component(item.name, item)
    )
  }
}
