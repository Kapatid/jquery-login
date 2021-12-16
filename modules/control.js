/**
 * Inserts pages to HTML.
 * 
 * @param {() => string} page
 * @param {string} rootId
 */
function render(page, rootId) {
  $(rootId).empty()

  // Get the whole return block
  const codes = page.toString().match(/return[^]*`/)[0]

  // Get the return value only
  const htmlStrings = codes
    .replace("return", "")
    .replaceAll("+", "")
    .replaceAll("`", "")
    .replaceAll('"', "")
    .replaceAll("\\n", "")
    .trim()
 
  $(rootId).append(htmlStrings)

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