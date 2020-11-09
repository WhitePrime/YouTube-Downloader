function factorial(n) {
    if (n == 1) {
        return 1
    }
    let bla = n * factorial(n-1)
    return bla
}
console.log(factorial(5))