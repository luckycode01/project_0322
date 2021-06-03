setTimeout(() => {
  console.log('1');
}, 1000);

setInterval(() => {
  console.log('2');
}, 1000);

setImmediate(() => {
  console.log('3');
});

console.log('4');
