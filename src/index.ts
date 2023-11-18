const copySelectionElement = (element): boolean => {
  const doc = document;
  const selection = window.getSelection();
  const range = doc.createRange();
  range.selectNodeContents(element);

  if (!selection) return false;

  // empty before adding new range
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    var successful = document.execCommand('copy');
    if (successful) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  } finally {
    selection.removeAllRanges();
  }
};

export default copySelectionElement;
