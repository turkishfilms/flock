// TODO: 
// get avoid working lol
//get f = 0 working
//then av
//then co
//then macth
//value are superceding each other
let bbb = 30
class Agent {

  constructor() {
    this.x = random(bbb, width - bbb);
    this.y = random(bbb, height - bbb);
    //     orientation
    this.orientation = random(0, TWO_PI);
    //     velocity
    this.velocity = 9;

    // how far agent can see
    this.r = 30;
    this.rCongregate = congregateR; //pos
    this.rAvoid = avoidR; // space
    this.rMatch = matchR; //v and o

    //size of agent
    this.radius = 10;
    //avoidance
    this.a = this.radius * 2
    this.n = []

  }

  showArea() {
    stroke(255, 0, 0)
    ellipse(this.x, this.y, this.rAvoid); //avoid
    // stroke(0, 0, 255)
    //ellipse(this.x, this.y, this.rMatch); //match
    stroke(255, 100, 100)
    ellipse(this.x, this.y, this.rCongregate); //cong
  }

  show() {
    noFill()
    ellipse(this.x, this.y, this.radius);
    stroke(255)
    line(this.x, this.y, map(this.velocity, 0, maxV, 0, 20) * cos(this.orientation) + this.x, map(this.velocity, 0, maxV, 0, 20) * sin(this.orientation) + this.y)
    // this.showArea()
  }

  go2() {
    this.show()
    allx += this.x
    ally += this.y
    // if (this == agents[0]) console.log(this.n.length - 1)
    this.n = []
    this.n = qt.ask({
      x: this.x,
      y: this.y,
      r: this.rCongregate
    }, this.n)

    let cx = 0,
      cy = 0,
      ax = 0,
      ay = 0,
      mo = 0,
      mv = 0

    if (this.n.length > 1) {
      let nlen = this.n.length - 1

      for (let i = 0; i < nlen + 1; i++) { //gotcha
        if (this == this.n[i]) continue

        let neighbor = this.n[i],
          nDist = dist(this.x, neighbor.x, this.y, neighbor.y)
        if (nDist <= this.rAvoid) {
          let {
            ax1,
            ay1
          } = this.avoid(neighbor)
          ax += ax1
          ay += ay1
        }
        mo += neighbor.orientation
        mv += neighbor.velocity
        cx += neighbor.x
        cy += neighbor.y
      }
      cx /= nlen
      cy /= nlen
      ax /= nlen
      ay /= nlen
      mo /= nlen
      mv /= nlen

      this.update(this.x, this.y, mo, mv, matchF)
      this.update(cx, cy, this.orientation, this.velocity, congregateF)
      this.update(ax, ay, this.orientation, this.velocity, avoidF)
    }

    this.move()
  }


  update(x, y, o, v, f) {
    if (f != 0) {
      let newo = 0,
        newv = 0

      if (this.orientation == o) { //avoid and cong 
        newo = (atan2(y - this.y, x - this.x) - this.orientation - PI) * f
        newv = (sqrt(((this.x - x) ** 2) + (this.y - y) ** 2) - this.velocity) * f
      } else { //match 
        newo = (o - this.orientation) * f
        newv = (v - this.velocity) * f
      }
      if (abs(this.orientation) > TWO_PI) {
        if (this.orientation < 0) this.orientation = (this.orientation + newo + TWO_PI) % TWO_PI
        else this.orientation = (this.orientation + newo + TWO_PI) % TWO_PI
      }

      this.velocity = min(max(0, this.velocity + newv), maxV)
    }
  }

  move() {
    // this.x = (this.v * cos(this.o) + this.x + width) % width;
    // this.y = (this.v * sin(this.o) + this.y + height) % height;
    if (this.x + this.rCongregate >= width + this.rCongregate / 2 + 10 ||
      this.x - this.rCongregate <= -this.rCongregate / 2 - 10 ||
      this.y + this.rCongregate >= height + this.rCongregate / 2 + 10 ||
      this.y - this.rCongregate <= -this.rCongregate / 2 - 10) this.orientation += PI

    this.orientation = (this.orientation + random(-PI / rn, PI / rn) + TWO_PI) % TWO_PI
    this.x = this.velocity * cos(this.orientation) + this.x
    this.y = this.velocity * sin(this.orientation) + this.y

  }

  avoid(neighbor) { //neighbor = {x,y,o,v} XX
    let no = (atan2(this.y - neighbor.y, this.x - neighbor.x) + PI + TWO_PI) % TWO_PI
    return {
      ax1: cos(no) + this.x,
      ay1: sin(no) + this.y
    }
  }

}


// go() {}
//   this.n = []
//   this.n = qt.ask(this, this.n)
//   this.show()
//   //flcok 

//   let an = [], //avoid birds within personal space
//     ao = 0
//   an = qt.ask({
//     x: this.x,
//     y: this.y,
//     r: this.r
//   }, an)
//   if (an.length > 1) {
//     for (let p = 0; p < an.length; p++) {
//       if (this.x == an[p].x && this.y == an[p].y) an.splice(i, 1)
//       else {
//         let z = atan2(an[p].y - this.y, an[p].x - this.x)
//         ao += z
//         this.x = (this.radius / 4 * cos(z + PI) + this.x + width) % width;
//         this.y = (this.radius / 4 * sin(z + PI) + this.y + height) % height;
//       }
//     }
//     ao = (ao / (an.length - 1) + 3 * PI) % TWO_PI
//   }

//   let co = 0,
//     cx = 0,
//     cy = 0,
//     mv = 0,
//     mo = this.o

//   if (this.n.length > 1) {
//     //congregate fly toward ceneter of neighbor group
//     for (let l = 0; l < this.n.length; l++) {
//       cx += this.n[l].x
//       cy += this.n[l].y

//       //match tend towards avg vel of n group
//       mv += this.n[l].v
//       mo += this.n[l].o
//     }

//     cx /= (this.n.length - 1)
//     cy /= (this.n.length - 1)
//     co = atan2(cy - this.y, cx - this.x)


//     mv /= this.n.length - 1
//     mo /= this.n.length - 1
//   }
//   // console.log(mo,ao,co,this.n.length)
//   //// update
//   //o
//   this.o = (((mo) + TWO_PI) % TWO_PI)
//   //v
//   this.v += mv
//   //xy
//   this.x = (this.v * cos(this.o) + this.x + width) % width;
//   this.y = (this.v * sin(this.o) + this.y + height) % height;
//   this.v -= mv
// }