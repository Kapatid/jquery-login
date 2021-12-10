import App from "./App.js"

export default class AppDOM {
  /**
   * Inserts components to HTML
   * @param {[ strHTML: string, callback: () => void ][]} components 
   * @param {string} rootId 
   */
  render(components, rootId) {
    components.forEach(([ strHTML, callback ]) => {

      $(`#${rootId}`).append(strHTML)
      
      callback !== undefined && callback()
    })
  }
}

App(new AppDOM())