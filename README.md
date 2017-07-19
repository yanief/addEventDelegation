# addEventDelegation

event delegation for native DOM, heavily inspired by jQuery .on method

### Implementation
```javascript
// change an anchor element with href = '#' to href = 'javascript:void(0)'
document.addEventDelegation('mouseover', 'a[href="#"]', function(){
	this.href = 'javascript:void(0)';
});
```

### TODO

- [x] Make add event delegation
- [x] Make method for multiple event listeners with one handler
- [ ] Make events bubbled
