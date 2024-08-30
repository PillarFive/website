document.addEventListener('DOMContentLoaded', function () {
  function addError(element, message) {
    var errorMsg = document.createElement('span')
    errorMsg.classList.add('error-message')
    errorMsg.textContent = message
    element.parentNode.insertBefore(errorMsg, element.nextSibling)
  }

  function addErrorMessage(selector, message) {
    document.querySelectorAll(selector).forEach(function (element) {
      addError(element, message)
    })
  }

  // Add error messages to <img> elements without alt tags
  addErrorMessage('img:not([alt])', 'Error: Missing alt attribute')

  // Add errors messages to empty <button> elements
  addErrorMessage('button:empty', 'Error: Empty button element')

  // Add error messages to <a> elements where a <button> would be a better choice
  addErrorMessage(
    'a[href=""], a[href="#"], a[href="javascript:void(0)"], a:not([href]):not([target])',
    'Error: Consider using a button instead'
  )

  // Add error messages to <button> elements where an <a> would be a better choice
  addErrorMessage(
    'button[href]',
    'Error: Use an anchor tag instead of a button'
  )

  // Add error messages to <input> elements that do not have a <label>
  document
    .querySelectorAll('input:not([type="hidden"])')
    .forEach(function (input) {
      var hasLabel = input.labels.length > 0 || input.getAttribute('aria-label')
      if (!hasLabel) {
        input.classList.add('no-label')
        var errorMsg = document.createElement('span')
        errorMsg.classList.add('error-message')
        errorMsg.textContent = 'Error: Input without label'
        input.parentNode.insertBefore(errorMsg, input.nextSibling)
      }
    })

  // Add error messages to <button> elements that contain only non-text nodes e.g. <svg>
  function missingButtonText() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      if (button.textContent.trim().length === 0) {
        addError(button, 'This button has no text')
        button.classList.add('outline-error')
      }
    })
  }

  // Add error messages where aria labels are misused
  function brokenAriaReference(aria) {
    const complementaries = document.querySelectorAll(`[${aria}]`)
    complementaries.forEach((comp) => {
      const id = comp.getAttribute(`${aria}`)
      console.log('id ', id)
      if (!document.getElementById(id)) {
        addError(comp, 'Broken ARIA reference')
        comp.classList.add('outline-error')
      }
    })
  }

  // Add error messages where tabindexes are considered invalid
  function faultyTabIndexes() {
    const elementsWithTabIndex = Array.from(
      document.querySelectorAll('[tabindex]')
    )
    const validTabIndexValues = [0, -1]

    elementsWithTabIndex.forEach((el) => {
      if (!validTabIndexValues.includes(Number(el.tabIndex))) {
        addError(el, 'Use tabindex values of 0 or -1')
        el.classList.add('outline-error')
      }
    })
  }

  missingButtonText()
  brokenAriaReference('aria-labelledby')
  brokenAriaReference('aria-describedby')
  faultyTabIndexes()
})