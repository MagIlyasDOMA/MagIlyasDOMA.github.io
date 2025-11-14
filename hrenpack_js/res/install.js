const element = document.querySelector('.language-html')
let old = element.innerHTML
old = old.replace(' &lt;название', '&lt;название')
console.log(old === old)
element.innerHTML = old
