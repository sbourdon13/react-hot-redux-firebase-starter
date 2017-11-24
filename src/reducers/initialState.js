export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  chatX: {
    isDataLoaded: false,
    msgList: [],
    firstKey: ""
  },
  ajaxCallsInProgress: 0
};
