function sum_odd_5000() {
        var sum = 0;
        for (var i = 0; i<5000; i++ ){
            if (i % 2 == 1){
            sum += i;
            }
        }
        return sum;
}
console.log(sum_odd_5000())