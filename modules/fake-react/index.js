/**
 * Inserts pages to HTML. 
 * The first argument will be considered as the home/main page.
 * 
 * @param {[() => string]} pages 
 * @param {string} rootId 
 * @param {() => string} authPage 
 */
function render(pages, rootId, authPage) {
  if (authPage !== undefined) {
    $(`#${rootId}`).html(authPage) 
    authPage()
  } else {
    $(`#${rootId}`).html(pages[0]) 
    pages[0]()
  }
}

/**
 * Function for making observable variables.
 * 
 * @param {any} j 
 * @returns [getter, setter]
 */
function useState(j) {
  const p = new Proxy({ watch: j }, {
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
 * Update element.
 * 
 * @param {string} id 
 * @param {Function} page 
 */
function updateElem(id , page) {
  $(`#${id}`).html(page())
  page()
}

export {
  render, useState, updateElem
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