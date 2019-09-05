export function getScrollPosition(el) {
  const element = el;
  if (element === document.body || element === document.documentElement || element === window) {
    return {
      top: document.body.scrollTop || document.documentElement.scrollTop,
      left: document.body.scrollLeft || document.documentElement.scrollLeft,
    };
  }

  return {
    top: element.scrollTop,
    left: element.scrollLeft,
  };
}

export function setScrollPosition(el, position) {
  const element = el;
  if (element === window) {
    document.documentElement.scrollLeft = position.left;
    document.documentElement.scrollTop = position.top;
  } else {
    element.scrollTop = position.top;
    element.scrollLeft = position.left;
  }
}
