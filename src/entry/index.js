const userAgent = navigator.userAgent
const hasString = str => userAgent.indexOf(str) > -1
const isOpera = hasString('Opera')
const isIE = hasString('compatible') && hasString('MSIE') && !isOpera
const isEdge = hasString('Edge') || !isIE && hasString('Windows NT') && hasString(' Trident/7.0;')

if (isIE) {
  const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
  reIE.test(userAgent)
}

isIE || isEdge ? window.fetch = null : null

if (isIE) {
  require.ensure(['es5-shim', 'es6-shim', 'isomorphic-fetch'], require => {
    require('es5-shim')
    require('es6-shim')
    require('isomorphic-fetch')
    require('CORE/main')
  }, 'es5es6fetch')
} else {
  if (!window.Promise && window.fetch) {
    require.ensure('es6-promise', require => {
      require('es6-promise').polyfill()
      require('CORE/main')
    }, 'es6')
  } else if (window.Promise && !window.fetch) {
    require.ensure('isomorphic-fetch', require => {
      require('isomorphic-fetch')
      require('CORE/main')
    }, 'fetch')
  } else if (!window.Promise && !window.fetch) {
    require.ensure(['es6-promise', 'isomorphic-fetch'], require => {
      require('es6-promise').polyfill()
      require('isomorphic-fetch')
      require('CORE/main')
    }, 'es6fetch')
  } else {
    require('CORE/main')
  }
}