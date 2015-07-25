/* globals content, sendAsyncMessage, addMessageListener, removeMessageListener */
'use strict';

(function () {
  function screenshot (e) {
    console.error(99999);
    var thumbnail = content.document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    var left = e.data.left || 0;
    var top = e.data.top || 0;
    var width = e.data.width || content.innerWidth;
    var height = e.data.height || content.innerHeight;
    thumbnail.width = width;
    thumbnail.height = height;
    var ctx = thumbnail.getContext('2d');
    ctx.drawWindow(content, content.scrollX + left, content.scrollY + top, width, height, '#fff');
    sendAsyncMessage('iescreenshot-screenshot', thumbnail.toDataURL());
  }
  function download (e) {
    var link = content.document.createElement('a');
    link.setAttribute('style', 'display: none');
    link.download = e.data.name;
    link.href = e.data.uri;
    content.document.body.appendChild(link);
    link.click();
  }

  function detach () {
    removeMessageListener('iescreenshot-screenshot', screenshot);
    removeMessageListener('iescreenshot-download', download);
    removeMessageListener('iescreenshot-detach', detach);
  }

  addMessageListener('iescreenshot-screenshot', screenshot);
  addMessageListener('iescreenshot-download', download);
  addMessageListener('iescreenshot-detach', detach);
})();
