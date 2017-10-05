(function(){
  // heavily inspired by jQuery .on method

  // now we can add multiple space separated event names with addEventListener
  EventTarget.prototype.addEventListener = (function(){
    var addEventListener = EventTarget.prototype.addEventListener;
    return function(){
      var args = arguments;
      var eventNames = args[0];
      var context = this;

      eventNames
      .split(' ')
      .filter(Boolean)
      .forEach(function(eventName){
        var newArgs = [].slice.call(args);
        newArgs[0] = eventName;
        addEventListener.apply(context, newArgs);
      });
    };
  }());

  if (!Element.prototype.matches) 
  Element.prototype.matches = 
    Element.prototype.matchesSelector || 
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector || 
    Element.prototype.oMatchesSelector || 
    Element.prototype.webkitMatchesSelector ||
    function(selector) {
      var doc = this.document || this.ownerDocument;
      var matches = doc.querySelectorAll(selector);
      var i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;            
    };

  // delegate events for bubbling events
  EventTarget.prototype.addEventDelegation = function(eventName, childSelector, callback){
    if (typeof eventName !== 'string' || 
      typeof childSelector !== 'string' || 
      typeof callback !== 'function')
      return;

    var parent = this;
    parent.addEventListener(eventName, function(event) {
      var eventTarget = event.target;
      var isAMatch = eventTarget.matches(childSelector);
      if (!isAMatch) return;

      callback.apply(eventTarget, arguments);
    });
  };  
}());
