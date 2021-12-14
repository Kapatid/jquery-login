/**
 * Inserts pages to HTML. 
 * The first argument will be considered as the home/main page.
 * 
 * @param {[() => string]} pages 
 * @param {string} rootId 
 * @param {() => string} authPage Route w/ auth
 */
function render(pages, rootId, authPage) {
  $(`#${rootId}`).empty()

  authPage !== undefined
    ? $(`#${rootId}`).append(authPage)
    : $(`#${rootId}`).append(pages[0])
}

/**
 * Function for making observable variables.
 * 
 * @param {any} data 
 * @returns [getter, setter]
 */
function useState(data) {
  const p = new Proxy({ watch: data }, {
    get: function(target, prop, receiver) {
      return prop in target ? target[prop] : null
    }
  })

  let set = (n) => {
    p.watch = n
  }

  return [p.watch, set]
}

/**
 * Update element based on selector.
 * 
 * @param {string} selector 
 * @param {Function} page 
 */
function updateElem(selector , page) {
  $(selector).empty()
  $(selector).append(page)
}

/**
 * Execute codes after given element is available.
 * 
 * @param {string} selector element to wait
 * @param {Function} func 
 */
function waitElemToLoad(selector, func) {
  const checkExist = setInterval(() => {
    if ($(selector).length) {
      func()
      clearInterval(checkExist)
    }
  }, 100)
}

export {
  render, useState, updateElem, waitElemToLoad
}

// (
//   /**
//    * {@link https://developer.mozilla.org/en-US/docs/Web/API/setInterval Mozilla}
//    */
//   function loop(){
//     setTimeout(function() {
//       console.log("Helloo")

//       loop()
//     }, 2000)
//   }
// )()

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
// const elementToObserve = document.querySelector("#watchdiv")
// const observer = new MutationObserver(function() {/**Callback */})
// observer.observe(elementToObserve, {subtree: true, childList: true})