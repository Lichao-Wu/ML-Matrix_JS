# Matrix-Library_JS
A matrix library for computation and operation.

### Standard operations

```js
const { Matrix } = require('ml-matrix');

var A = new Matrix([[1, 1], [2, 2]]);
var B = new Matrix([[3, 3], [1, 1]]);
var C = new Matrix([[3, 3], [1, 1]]);

  *.create([i,j]: matrix dimension, containerValue, theshold: for the NN dropout);
  
  *.matrix: show original matrix;

  *.shape(): print the dimension of the matrix;

  *.show(): print the matrix with the corrsponding demension;

  *.T(): transpose matrix;

  *.dot(M): multiply matrix with M elemently (broadcasting);

  *.dot(M, "/"): devide matrix with M elemently (broadcasting);

  *.mul(M): multiply matrix with M;

  *.add(M): add matrix with M elemently (broadcasting);

  *.add(M, "-"): minus matrix with M elemently (broadcasting).
