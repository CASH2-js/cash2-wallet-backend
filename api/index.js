require('../lib')()

console.log(encodeURIComponent(JSON.stringify({name: 'test', password: 'test', spk: 'ea4e77f94400f3705af87bc61d79c46161bfb40697088ff1050f7259184c6fb1', vpk: 'f295277008cd9e11cf3cb0dc8916d8581c1039e86867dcb43c9225932918a104'})))
//console.log(encodeURIComponent(JSON.stringify({name: 'test1', password: 'test'})))