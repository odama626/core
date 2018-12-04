declare var window;

export const lock = () => {
  let scrollOffset = window.pageYOffset;
  let overflow = document.body.style.overflow;
  let position = document.body.style.position;
  let top = document.body.style.top;
  let width = document.body.style.width;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollOffset}px`;
  document.body.style.width = '100%';
  return () => {
    document.body.style.overflow = overflow;
    document.body.style.position = position;
    document.body.style.top = top;
    document.body.style.width = width;
    window.scrollTo(0, scrollOffset);
  }
}

export const saveLocally = (key, data) => {
  let storage = window.localStorage;
  try {
    if (!storage) 
      throw new Error('Local Storage not availabe');
    storage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const loadLocally = (key) => {
  let storage = window.localStorage;
  if (!storage) return null;
  try {
    return JSON.parse(storage.getItem(key));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const memoize = (fun, ...args) => {
  try {
    window.memoes = window.memoes || {};
    let key = JSON.stringify({fun, args});
    if (!window.memoes[key]) {
      window.memoes[key] = fun(...args);
    }
    // console.log(fun.arguments);
    return window.memoes[key];
  } catch(e) {
    return fun(...args);
  }
}