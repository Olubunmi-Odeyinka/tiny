
const ensureUrlHasProtocol = (url) => {
  let validUrl = url
  if(!(url.startsWith('http://') || url.startsWith('https://'))){
    validUrl = 'http://' + url;
  }
  return validUrl;
}

const navigateUrl = (url) => {

  let element = document.createElement('a');
  element.href =  ensureUrlHasProtocol(url);

  return element.click();
}



export {
    ensureUrlHasProtocol,
    navigateUrl
}