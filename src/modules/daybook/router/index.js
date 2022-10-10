/**
 * Object containing all the routes for the daybook module
 * @type {import('vue-router').RouteRecordRaw}
 * @see https://next.router.vuejs.org/api/#router-record-raw
 * @see https://next.router.vuejs.org/guide/essentials/nested-routes.html
 *
 */

export default {
  name: 'daybook',
  component: () =>
    import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () =>
        import(/* webpackChunkName: "noEntry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
    },

    {
      path: ':id',
      name: 'entry',
      component: () =>
        import(/* webpackChunkName: "noEntry" */ '@/modules/daybook/views/EntryView.vue'),
      props: (route) => ({ id: route.params.id }),
    },
  ],
};
