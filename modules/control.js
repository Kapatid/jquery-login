/**
 * Inserts pages to HTML.
 * 
 * @param {() => string} page
 * @param {string} rootId
 */
function render(page, rootId) {
  $(rootId).empty()
  const funcString = page.toString();

  // Get html string in return
  const htmlStringArray = funcString
    .match(/return[^]*`/)[0].match(/<.*>/g)
 
  $(rootId).append(htmlStringArray.join(''))

  // After inserting element run codes
  page()
}

export {
  render
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