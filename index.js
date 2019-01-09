var express = require('express');
var app = express();

class MazeEscape {
    constructor(req) {
        this.req = req;
        this.matrixx                        = JSON.parse(req.query.matrix);
        this.matrixsolved                   = this.matrixx;
        this.startingpoint                  = JSON.parse(req.query.startingpoint);
        this.position                       = this.startingpoint;
        this.m_width                        = this.matrixx[0].length;
        this.m_height                       = this.matrixx.length;
        this.prev_dir                       = "";
        this.dir_to_go                      = "";
        this.o                              = 0;
        this.m                              = 0;
        this.v                              = 0;
        this.p                              = 0;
        this.path                           = [];
        this.nodes                          = [];
        this.nn                             = 0;
        this.result                         = [];
    }

    mainfunction() {
        for (var aa = 0; aa < 1; aa++) {
            this.matrixsolved                   = this.matrixx;
            this.position                       = this.startingpoint;
            this.prev_dir                       = "";
            this.dir_to_go                      = "";
            this.o                              = 0;
            this.m                              = 0;
            this.v                              = 0;
            this.p                              = 0;
            this.path                           = [];
            this.nodes                          = [];
            this.nn                             = aa;
            this.result[aa]                     = {};
            var i                               = 0;
            // console.log("this.matrixx",this.matrixx);
            // console.log("this.matrixsolved",this.matrixsolved);
            while (!this.checkIfBorder(i)) {
                // console.log(aa);
                console.log(i);
                console.log("position",this.position);
                console.log(this.matrixsolved);
                this.path[i]            = [];
                this.path[i][0]         = this.position[0];
                this.path[i][1]         = this.position[1];
                
                this.checkIntersection();
                if (this.o === 1 || this.o === 2) {
                    if (this.intersec) {
                        if (this.changeDir()===false) {
                            break;
                        }
                    } else {
                        this.followDir();
                    }
                } else if (this.o > 2) {
                    if (this.changeDir()===false) {
                        break;
                    }
                } else if (this.m === 1 || this.m === 2) {
                    if (this.intersec) {
                        if (this.tryMarked()===false) {
                            break;
                        }
                    } else {
                        this.followDirM();
                    }
                } else if (this.m > 2) {
                    if (this.changeDir()===false) {
                        break;
                    }
                } else {
                    if (this.changeDir()===false) {
                        break;
                    }
                }
                ///// breaking too long processes or infinite loops
                if  (i>45) {
                    break;
                }
                i++;
            }
            
            this.path[i]             = [];
            this.path[i][0]          = this.position[0];
            this.path[i][1]          = this.position[1];
            console.log(i);
            console.log("position",this.position);
            // console.log("this.path",this.path);
            if (this.checkIfBorder(i)) {
                this.matrixsolved[this.position[0]][this.position[1]] = "E";
                // console.log(this.matrixsolved);
                this.result[aa] = this.win(i);
            } else {
                this.matrixsolved[this.position[0]][this.position[1]] = "F";
                // console.log(this.matrixsolved);
                this.result[aa] = this.fail(i);
            }
        }
        return this.result;
    }

    checkIntersection() {
        this.o = 0;
        this.m = 0;
        this.v = 0;
        this.p = 0;
        this.intersec = false;

        var yy = this.position[0];
        var xx = this.position[1];
        var rr = xx+1;
        var dd = yy+1;
        var ll = xx-1;
        var uu = yy-1;

        if (rr<this.matrixsolved[0].length) {
            if (this.matrixsolved[yy][rr]==="M") {
                this.m++;
                this.p++;
                this.dir_to_go = "R";
            }
        }

        if (dd<this.matrixsolved.length) {
            if (this.matrixsolved[dd][xx]==="M") {
                this.m++;
                this.p++;
                this.dir_to_go = "D";
            }
        }

        if (ll>0) {
            if (this.matrixsolved[yy][ll]==="M") {
                this.m++;
                this.p++;
                this.dir_to_go = "L";
            }
        }
            
        if (uu>0) {
            if (this.matrixsolved[uu][xx]==="M") {
                this.m++;
                this.p++;
                this.dir_to_go = "U";
            }
        }

        if (rr<this.matrixsolved[0].length) {
            if (this.matrixsolved[yy][rr]==="O") {
                this.o++;
                this.p++;
                this.dir_to_go = "R";
            }
        }

        if (dd<this.matrixsolved.length) {
            if (this.matrixsolved[dd][xx]==="O") {
                this.o++;
                this.p++;
                this.dir_to_go = "D";
            }
        }

        if (ll>0) {
            if (this.matrixsolved[yy][ll]==="O") {
                this.o++;
                this.p++;
                this.dir_to_go = "L";
            }
        }
            
        if (uu>0) {
            if (this.matrixsolved[uu][xx]==="O") {
                this.o++;
                this.p++;
                this.dir_to_go = "U";
            }
        }

        if (rr<this.matrixsolved[0].length) {
            if (this.matrixsolved[yy][rr]==="V") {
                this.v++;
            }
        }

        if (dd<this.matrixsolved.length) {
            if (this.matrixsolved[dd][xx]==="V") {
                this.v++;
            }
        }

        if (ll>0) {
            if (this.matrixsolved[yy][ll]==="V") {
                this.v++;
            }
        }
            
        if (uu>0) {
            if (this.matrixsolved[uu][xx]==="V") {
                this.v++;
            }
        }


        if (this.prev_dir==="") {
            this.prev_dir = this.dir_to_go;
        }

        if (this.o+this.m > 2) {
            this.intersec                  = true;
            this.nodes[this.nn]            = [];
            this.nodes[this.nn][0]         = this.position[0];
            this.nodes[this.nn][1]         = this.position[1];
            this.nn++;
        }
    }
    
    checkIfBorder(i) {
        if (i>0) {
            if ((this.position[0] === 0 || this.position[1] === 0 || this.position[0] === this.matrixx.length-1 || this.position[1] === this.matrixx[0].length-1)) {
                return true;
            } else {
                return false;
            }
        } else {
            this.matrixsolved[this.position[0]][this.position[1]] = "M";
            return false;
        }
            
    }

    win(i) {
        var result = {
            result: 1,
            message: "Exit Found",
            matrixsolved: this.matrixsolved,
            path: this.path,
            nodes: this.nodes
        }
        return result;
    }

    fail(i) {
        var result = {
            result: 0,
            message: "No Exit Found",
            matrixsolved: this.matrixsolved,
            path: this.path,
            nodes: this.nodes
        }
        return result;
    }

    followDir() {
        // console.log("followDir");
        var funcToCall = "this.try"+this.dir_to_go+"()";
        eval(funcToCall);
    }

    followDirM() {
        // console.log("followDirM");
        var funcToCall = "this.tryM"+this.dir_to_go+"()";
        eval(funcToCall);
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    changeDir() {
        console.log(">>>>>> changeDir");
        var arrDir = ["R","D","L","U"];
        arrDir = this.shuffle(arrDir);
        var funcToCall1 = "this.try"+arrDir[0]+"()";
        var funcToCall2 = "this.try"+arrDir[1]+"()";
        var funcToCall3 = "this.try"+arrDir[2]+"()";
        var funcToCall4 = "this.try"+arrDir[3]+"()";
        console.log("arrDir",arrDir);
        if (eval(funcToCall1)) {
            return true;
        } else if (eval(funcToCall2)) {
            return true;
        } else if (eval(funcToCall3)) {
            return true;
        } else if (eval(funcToCall4)) {
            return true;
        } else {
            return this.tryMarked();
        }
    }

    tryMarked() {
        console.log(">>>>>> tryMarked");
        var arrDir = ["R","D","L","U"];
        arrDir = this.shuffle(arrDir);
        var funcToCall1 = "this.tryM"+arrDir[0]+"()";
        var funcToCall2 = "this.tryM"+arrDir[1]+"()";
        var funcToCall3 = "this.tryM"+arrDir[2]+"()";
        var funcToCall4 = "this.tryM"+arrDir[3]+"()";
        console.log("arrDir",arrDir);
        if (eval(funcToCall1)) {
            return true;
        } else if (eval(funcToCall2)) {
            return true;
        } else if (eval(funcToCall3)) {
            return true;
        } else if (eval(funcToCall4)) {
            return true;
        } else {
            return false;
        }
    }

    tryR() {
        if ((this.position[1]+1)>this.matrixx[this.position[0]].length) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]][this.position[1]+1]==="O") {
                this.matrixsolved[this.position[0]][this.position[1]] = "M";
                this.matrixsolved[this.position[0]][this.position[1]+1] = "M";
                this.position[1]++;
                this.prev_dir = "R";
                this.dir_to_go = "R";
                return true;
            } else return false;
        }
    }

    tryD() {
        if ((this.position[0]+1)>this.matrixx.length) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]+1][this.position[1]]==="O") {
                this.matrixsolved[this.position[0]][this.position[1]] = "M";
                this.matrixsolved[this.position[0]+1][this.position[1]] = "M";
                this.position[0]++;
                this.prev_dir = "D";
                this.dir_to_go = "D";
                return true;
            } else return false;
        }
    }
    tryL() {
        if ((this.position[1]-1)<0) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]][this.position[1]-1]==="O") {
                this.matrixsolved[this.position[0]][this.position[1]] = "M";
                this.matrixsolved[this.position[0]][this.position[1]-1] = "M";
                this.position[1]--;
                this.prev_dir = "L";
                this.dir_to_go = "L";
                return true;
            } else return false;
        }
    }
    tryU() {
        if ((this.position[0]-1)<0) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]-1][this.position[1]]==="O") {
                this.matrixsolved[this.position[0]][this.position[1]] = "M";
                this.matrixsolved[this.position[0]-1][this.position[1]] = "M";
                this.position[0]--;
                this.prev_dir = "U";
                this.dir_to_go = "U";
                return true;
            } else return false;
        }
        
    }

    tryMR() {
        if ((this.position[1]+1)>this.matrixx[this.position[0]].length) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]][this.position[1]+1]==="M") {
                this.matrixsolved[this.position[0]][this.position[1]] = "V";
                this.matrixsolved[this.position[0]][this.position[1]+1] = "V";
                this.position[1]++;
                this.prev_dir = "R";
                this.dir_to_go = "R";
                return true;
            } else return false;
        }
    }
    tryMD() {
        if ((this.position[0]+1)>this.matrixx.length) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]+1][this.position[1]]==="M") {
                this.matrixsolved[this.position[0]][this.position[1]] = "V";
                this.matrixsolved[this.position[0]+1][this.position[1]] = "V";
                this.position[0]++;
                this.prev_dir = "D";
                this.dir_to_go = "D";
                return true;
            } else return false;
        }
    }
    tryML() {
        if ((this.position[1]-1)<0) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]][this.position[1]-1]==="M") {
                this.matrixsolved[this.position[0]][this.position[1]] = "V";
                this.matrixsolved[this.position[0]][this.position[1]-1] = "V";
                this.position[1]--;
                this.prev_dir = "L";
                this.dir_to_go = "L";
                return true;
            } else return false;
        }
    }
    tryMU() {
        if ((this.position[0]-1)<0) {
            return false;
        } else {
            if (this.matrixsolved[this.position[0]-1][this.position[1]]==="M") {
                this.matrixsolved[this.position[0]][this.position[1]] = "V";
                this.matrixsolved[this.position[0]-1][this.position[1]] = "V";
                this.position[0]--;
                this.prev_dir = "U";
                this.dir_to_go = "U";
                return true;
            } else return false;
        }
    }

}

app.get('/mazeescape', function (req, res, next) {
    // var matrix                  = JSON.parse(req.query.matrix);
    // var startingpoint           = JSON.parse(req.query.startingpoint);
    var mazeEscape              = new MazeEscape(req);
    res.json(
        mazeEscape.mainfunction()
    );
});


app.listen(3000, function () {
  console.log('Maze app listening on port 3000!');
});