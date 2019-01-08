# ML-Matrix_JS
This is a function including the Fundamantal 2D matrix computation and operation methods. 

You can use it by coping the entire function to the source code, or create your own library by modifing it.

### Get started 
```js
//Create a new Matrix object
var A = new Matrix()

//Transfer the properties to a defined matrix
var B = new Matrix([[1, 1], [2, 2]]);
```
### single matrix operations
```js
//create a new matrix: *.create(matrix dimension, containerValue, theshold);
var A = new Matrix();
A.create([2, 2]); //a 2x2 matrix with ramdom elements (0 to 1)
A.create([2, 2], 0); //a 2x2 matrix with all zero elements
A.create([2, 2], "", 0.5); // Set the element value to one when smaller than 0.5 or to zero in contrast

//get the matrix: *.matrix
var B = new Matrix([[1, 2, 3], [4, 5, 6]]);
B.matrix; //return [[1, 2, 3], [4, 5, 6]]

//print the matrix: *.show()
B.show(); //print 1, 2, 3
          //      4, 5, 6

//get the matrix shape: *.shape()
B.shape(); //return [2, 3]

//Transpose: *.T()
B.T(); //[[1 ,4], [2, 5], [3, 6]]

//Inverse: *.inv()
B.inv(); //Error: the matrix is not invertable ;)

//Normalization: *.norm()
B.norm(); //[[9.539392014169456]]

//Vectorization: *.toVector()
B.toVector(); //[[1],[2],[3],[4],[5],[6]]

//Log: *.log()
B.log(); //[[0, 0.6931471805599453, 1.0986122886681098], [1.3862943611198906, 1.6094379124341003, 1.791759469228055]]

//Exponential: *.exp()
B.exp(); //[[2.718281828459045, 7.38905609893065, 20.085536923187668], [54.598150033144236, 148.4131591025766, 403.4287934927351]]

//Power: *.pow(num)
B.pow(2); //[[1, 4, 9], [16, 25, 36]]

//Summary: *.sum(axis)
B.sum(); //[[21]]
B.sum(0); //[[5, 7, 9]]
B.sum(1); //[[6], [15]]
```
### Multi-matrix operations
```js
//Shuffle: *.shuffle(matrix)
var B = new Matrix([[1, 2, 3], [4, 5, 6]]);
var C = new Matrix([[1, 2, 3]]);
B.shuffle(C); //B:[[2, 1, 3], [5, 4, 6]]; C: [[2, 1, 3]]

//Dot: *.dot(matrix)
var D = new Matrix([[1, 2, 3], [4, 5, 6]]);
var E = new Matrix([[1], [2], [3]]);
B.dot(C); //[[14], [32]]

//Multiply (boardcasting supported): *.mul(matrix)
var F = new Matrix([[1, 2, 3], [4, 5, 6]]);
var G = new Matrix([[1, 2, 3]]);
F.mul(G); //[[1, 4, 9], [4, 10, 18]]

//Division (boardcasting supported): *.div(matrix)
F.div(G); //[[1, 1, 1], [4, 2.5, 2]]

//Add (boardcasting supported): *.add(matrix)
F.add(G); //[[2, 4, 6], [5, 7, 9]]

//Minus (boardcasting supported): *.sub(matrix)
F.minus(G); //[[0, 0, 0], [3, 3, 3]]
