// TODO: 
// get avoid working lol
//get f = 0 working
//then av
//then co
//then macth
//value are superceding each other

class Agent {

  constructor() {
    this.x = random(width);
    this.y = random(height);
    //     orientation
    this.o = random(0, TWO_PI); //orientation angle
    //     velocity
    this.v = 3; //speed
    this.id = agents.length
    this.r = congregateR
    this.rCongregate = this.r; //pos
    this.rAvoid = this.r; // space
    this.rMatch = this.r; //v and o
    this.avoidF = 0.004;
    this.matchF = 0.1;
    this.congregateF = 0.0001;
    this.maxV = 10;
    this.w = 0
    this.h = 0
    //size of agent
    this.radius = 10;
    //avoidance
    this.a = this.radius * 2
    this.n = []
  }

  showArea() {
    stroke(200, 0, 0)
    ellipse(this.x, this.y, this.rAvoid); //avoid
    // stroke(0, 0, 255)
    ellipse(this.x, this.y, this.rMatch); //match
    stroke(255, 100, 100)
    ellipse(this.x, this.y, this.rCongregate); //cong
  }

  show() {
    noFill()
    if (this == agents[0]) stroke(0, 0, 255)
    else stroke(255, 0, 0)
    ellipse(this.x, this.y, this.radius);
    stroke(255)

    line(this.x, this.y, map(this.v, 0, this.maxV, 0, 20) * cos(this.o) + this.x, map(this.v, 0, this.maxV, 0, 20) * sin(this.o) + this.y)
    // this.showArea()
  }

  go() {
    this.show()
    allx += this.x
    ally += this.y

    this.n = this.findNeighbors2(agents, this.rAvoid)
    let n = this.n,
      ch = ['x', this.x.toPrecision(2) * 1, 'y', this.y.toPrecision(2) * 1, 'v', this.v, 'o', this.o.toPrecision(2) * 1],
      check = false //this == agents[0]

    if (n.length > 0) {

      if (check) console.log('s', ['x', this.x.toPrecision(2) * 1, 'y', this.y.toPrecision(2) * 1, 'v', this.v, 'o', this.o.toPrecision(2) * 1])
      this.avoid(n)
      if (check) console.log('as', ['x', this.x.toPrecision(2) * 1, 'y', this.y.toPrecision(2) * 1, 'v', this.v, 'o', this.o.toPrecision(2) * 1])
      this.match(n)
      if (check) console.log('ms', ['x', this.x.toPrecision(2) * 1, 'y', this.y.toPrecision(2) * 1, 'v', this.v, 'o', this.o.toPrecision(2) * 1])
      this.congregate(n)
      if (check) console.log('cs', ['x', this.x.toPrecision(2) * 1, 'y', this.y.toPrecision(2) * 1, 'v', this.v, 'o', this.o.toPrecision(2) * 1])
    }
    this.move()
    // if (check) console.log('es', ch)
  }

  findNeighbors(poop1, poop2) {
    this.n = []
    this.n = qt.ask({
      x: this.x,
      y: this.y,
      r: max(this.rCongregate, this.rAvoid, this.rMatch)
    }, this.n)

    let n2 = []
    for (let agent in this.n) {
      if (this != this.n[agent]) n2.push(this.n[agent])
    }
    return n2
  }

  findNeighbors2(arr, distance) {
    let n = []
    for (let i = 0; i < arr.length; i++) {
      if (dist(arr[i].x, arr[i].y, this.x, this.y) <= distance && this != arr[i]) n.push(arr[i])
    }
    return n
  }

  move() {
    this.x = (this.x + this.v * cos(this.o) + w) % w
    this.y = (this.y + this.v * sin(this.o) + h) % h;
  }

  update(x, y, f) {
    let newO = atan2(this.y - y, this.x - x) + PI,
      newV = dist(this.x, this.y, x, y)

    this.o += (newO - this.o) * f
    this.v += (newV - this.v) * f
    this.v = ((this.v + this.maxV) % this.maxV).toPrecision(2) * 1
    if (f == this.avoidF) fill(220)
    else if (f == this.congregateF) fill(155)

    // ellipse(x, y, 10)
  }

  congregate(neighbors) {
    let congregateX = 0,
      congregateY = 0
    for (let neighbor in neighbors) {
      congregateX += neighbors[neighbor].x
      congregateY += neighbors[neighbor].y
      // if (this == agents[0]) console.log('coE',neighbors[neighbor].x)
    }
    congregateX /= neighbors.length
    congregateY /= neighbors.length
    // if (this == agents[0]) console.log('con',congregateX,congregateY,this.congregateF)
    this.update(congregateX, congregateY, this.congregateF)
  }

  match(neighbors) {
    // if (this == agents[0]) console.log('no',this.o)
    let matchO = 0,
      matchV = 0
    for (let neighbor in neighbors) {
      matchO += neighbors[neighbor].o
      // if (this == agents[0]) console.log('nnn', )
      matchV += neighbors[neighbor].v
    }
    // if (this == agents[0]) console.log('noM',matchO)
    matchV /= neighbors.length
    matchO /= neighbors.length
    // if (this == agents[0]) console.log('noM',matchO)
    this.v += (matchV - this.v) * this.matchF
    this.o += (matchO - this.o) * this.matchF
    // if (this == agents[0]) console.log('noE',this.o,this.matchF)
  }

  avoid(neighbors) { //neighbor = {x,y,o,v} :)
    let avoidX = 0,
      avoidY = 0
    for (let neighbor in neighbors) {
      let n = neighbors[neighbor]
      let d =dist(this.x, this.y, n.x, n.y) 
      if (d<= this.rAvoid) {
        avoidX += n.x+ 1/d 
        avoidY += n.y+ 1/d 
      }
    }
    avoidX /= neighbors.length
    avoidY /= neighbors.length

    avoidX = ((this.x - avoidX)) + this.x
    avoidY = ((this.y - avoidY)) + this.y
    if (this == agents[0]) {
      fill(255)
      // ellipse(avoidX, avoidY, 20)
    }
    this.update(avoidX, avoidY, this.avoidF)
  }
}