//Matrix opertation libaray for JS
//Arthur: L.Wu

//testBench(); 
function Matrix() {
    this.create = function (dimention, container, threshold) {
        var Matrix = new Array();
        for (var idxI = 0; idxI < dimention[0]; idxI++) {
            var matrixSubUnit = new Array();
            for (var idxJ = 0; idxJ < dimention[1]; idxJ++) {
                if (container) {
                    matrixSubUnit.push(container);
                } else {
                    var value = Math.random();
                    if (threshold) {
                        value = value < threshold ? 0 : 1;
                    }
                    matrixSubUnit.push(value);
                }
            }
            Matrix.push(matrixSubUnit);
        }
        this.matrix = Matrix;
    };
    this.shape = function () {
        return [this.matrix.length, this.matrix[0].length];
    };
    this.T = function () {
        var matrixContainer = new Matrix();
        matrixContainer.create([this.matrix[0].length, this.matrix.length, 0]);
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[0].length; j++) {
                matrixContainer.matrix[j][i] = this.matrix[i][j];
            }
        }
        return matrixContainer;
    };
    this.inv = function () {
        //if the matrix isn't square: exit (error)
        if (this.matrix.length !== this.matrix[0].length) {
            throw "Error: the matrix isn't square";
        }
        //create the identity matrix (matrixContainer), and a dummy (dummyMatrix) of the original
        var i = 0, ii = 0, j = 0, dim = this.matrix.length, element = 0, t = 0;
        var matrixContainer = new Matrix();
        matrixContainer.create([dim, dim], 0);
        var dummyMatrix = [];
        for (i = 0; i < dim; i += 1) {
            dummyMatrix[dummyMatrix.length] = [];
            for (j = 0; j < dim; j += 1) {
                if (i === j) {
                    matrixContainer.matrix[i][j] = 1;
                } else {
                    matrixContainer.matrix[i][j] = 0;
                }
                dummyMatrix[i][j] = this.matrix[i][j];
            }
        }
        // Perform elementary row operations
        for (i = 0; i < dim; i += 1) {
            element = dummyMatrix[i][i];
            if (element === 0) {
                for (ii = i + 1; ii < dim; ii += 1) {
                    if (dummyMatrix[ii][i] !== 0) {
                        for (j = 0; j < dim; j++) {
                            element = dummyMatrix[i][j];
                            dummyMatrix[i][j] = dummyMatrix[ii][j];
                            dummyMatrix[ii][j] = element;
                            element = matrixContainer.matrix[i][j];
                            matrixContainer.matrix[i][j] = matrixContainer.matrix[ii][j];
                            matrixContainer.matrix[ii][j] = element;
                        }
                        break;
                    }
                }
                element = dummyMatrix[i][i];
                //if the element is still zero: exit (error)
                if (element === 0) {
                    throw "Error: the matrix is not invertable";
                }
            }
            for (j = 0; j < dim; j++) {
                dummyMatrix[i][j] = dummyMatrix[i][j] / element;
                matrixContainer.matrix[i][j] = matrixContainer.matrix[i][j] / element;
            }
            for (ii = 0; ii < dim; ii++) {
                if (ii === i) {
                    continue;
                }
                element = dummyMatrix[ii][i];
                for (j = 0; j < dim; j++) {
                    dummyMatrix[ii][j] -= element * dummyMatrix[i][j];
                    matrixContainer.matrix[ii][j] -= element * matrixContainer.matrix[i][j];
                }
            }
        }
        return matrixContainer;
    };
    this.sum = function () {
        var sum = 0;
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[0].length; j++) {
                sum += this.matrix[i][j];
            }
        }
        return sum;
    };
    this.dot = function (matrix, operation) {
        matrix = matrix.matrix;
        var i1 = this.matrix.length;
        var j1 = this.matrix[0].length;
        var i2 = matrix.length;
        var j2 = matrix[0].length;
        if (operation === "/") {
            for (var i = 0; i < i2; i++) {
                for (var j = 0; j < j2; j++) {
                    matrix[i][j] = 1 / (matrix[i][j] + Math.pow(0.1, 10));
                }
            }
        }
        if (i1 !== i2 && j1 !== j2) {
            throw "Error: unable to dot the matrix with wrong dimension";
        } else if (i1 === i2 && j1 === j2) {
            var matrixContainer = new Matrix();
            matrixContainer.create([i1, j1], 0);
            for (var i = 0; i < i1; i++) {
                for (var j = 0; j < j1; j++) {
                    matrixContainer.matrix[i][j] = this.matrix[i][j] * matrix[i][j];
                }
            }
        } else {
            if (i2 === 1 || j2 === 1) {
                var matrixContainer = new Matrix();
                matrixContainer.create([i1, j1], 0);
                for (var i = 0; i < i1; i++) {
                    for (var j = 0; j < j1; j++) {
                        if (i2 === 1 && j2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] * matrix[0][0];
                        } else if (i2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] * matrix[0][j];
                        } else if (j2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] * matrix[i][0];
                        }
                    }
                }
            } else if (i1 === 1 || j1 === 1) {
                var matrixContainer = new Matrix();
                matrixContainer.create([i2, j2], 0);
                for (var i = 0; i < i2; i++) {
                    for (var j = 0; j < j2; j++) {
                        if (i1 === 1 && j1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[0][0] * matrix[i][j];
                        } else if (i1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[0][j] * matrix[i][j];
                        } else if (j1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][0] * matrix[i][j];
                        }
                    }
                }
            } else {
                throw "Error: unable to broadcast the matrix with non-one demension";
            }
        }
        return matrixContainer;
    };
    this.mul = function (matrix) {
        matrix = matrix.matrix;
        var i1 = this.matrix.length;
        var j1 = this.matrix[0].length;
        var i2 = matrix.length;
        var j2 = matrix[0].length;
        if (j1 !== i2) {
            throw "Error: unable to multiply the matrix with wrong dimension";
        } else {
            var matrixContainer = new Matrix();
            matrixContainer.create([i1, j2], 0);
            for (var i = 0; i < i1; i++) {
                for (var j = 0; j < j2; j++) {
                    for (var k = 0; k < j1; k++) {
                        matrixContainer.matrix[i][j] += this.matrix[i][k] * matrix[k][j];
                    }
                }
            }
        }
        return matrixContainer;
    };
    this.add = function (matrix, operation) {
        matrix = matrix.matrix;
        var i1 = this.matrix.length;
        var j1 = this.matrix[0].length;
        var i2 = matrix.length;
        var j2 = matrix[0].length;
        if (operation === "-") {
            for (var i = 0; i < i2; i++) {
                for (var j = 0; j < j2; j++) {
                    matrix[i][j] = -matrix[i][j];
                }
            }
        }
        if (i1 !== i2 && j1 !== j2) {
            throw "Error: unable to add the matrix with different dimension";
        } else if (i1 === i2 && j1 === j2) {
            var matrixContainer = new Matrix();
            matrixContainer.create([i1, j1], 0);
            for (var i = 0; i < i1; i++) {
                for (var j = 0; j < j1; j++) {
                    matrixContainer.matrix[i][j] = this.matrix[i][j] + matrix[i][j];
                }
            }
        } else {
            if (i2 === 1 || j2 === 1) {
                var matrixContainer = new Matrix();
                matrixContainer.create([i1, j1], 0);
                for (var i = 0; i < i1; i++) {
                    for (var j = 0; j < j1; j++) {
                        if (i2 === 1 && j2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] + matrix[0][0];
                        } else if (i2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] + matrix[0][j];
                        } else if (j2 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][j] + matrix[i][0];
                        }
                    }
                }
            } else if (i1 === 1 || j1 === 1) {
                var matrixContainer = new Matrix();
                matrixContainer.create([i2, j2], 0);
                for (var i = 0; i < i2; i++) {
                    for (var j = 0; j < j2; j++) {
                        if (i1 === 1 && j1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[0][0] + matrix[i][j];
                        } else if (i1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[0][j] + matrix[i][j];
                        } else if (j1 === 1) {
                            matrixContainer.matrix[i][j] = this.matrix[i][0] + matrix[i][j];
                        }
                    }
                }
            } else {
                throw "Error: unable to broadcast the matrix with non-one demension";
            }
        }
        return matrixContainer;
    };
    this.show = function () {
        var i1 = this.matrix.length;
        for (var i = 0; i < i1; i++) {
            print(this.matrix[i]);
        }
    };
}
function testBench() {
    print("=====Testbench=====");
    var matrix1 = new Matrix();
    matrix1.create([2, 4]);
    matrix1.show();
    print("===Create===");
//print(matrix1.shape());
    var matrix2 = new Matrix();
    matrix2.create([2, 4]);
    matrix2.show();
    print("===dot, div===");
    matrix3 = matrix1.dot(matrix2, "/");
    matrix3.show();
    print("===mul===");
    var matrix4 = new Matrix();
    matrix4.create([1, 4]);
    var matrix5 = matrix3.mul(matrix4.T());
    matrix5.show();
    print("===add, minus===");
    var matrix6 = new Matrix();
    matrix6.create([1, 2]);
    matrix6.show();
    var matrix7 = matrix5.add(matrix6.T(), "-");
    matrix7.show();
    print(matrix7.shape());
    print("===sum===");
    print(matrix7.sum());
    print("===inv===");
    var matrix8 = new Matrix();
    matrix8.create([4, 4]);
    matrix9 = matrix8.inv();
    matrix9.show();
}
