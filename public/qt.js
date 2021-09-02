class Quadtree {
  constructor(x, y, sizex, sizey) {
    this.x = x || 0;
    this.y = y || 0;
    this.sizex = sizex || width;
    this.sizey = sizey || height;
    this.items = [];
    this.children = [];
    this.capacity = 4;
    this.hasSplit = false
  }

  show() {
    stroke(255);
    noFill();
    rect(this.x + 1, this.y + 1, this.sizex - 1, this.sizey - 1);
    if (this.hasSplit) {
      let tcl =this.children.length
      for (let i = 0; i < tcl; i++) this.children[i].show()
    }
  }

  isFull() {
    return (this.items.length >= this.capacity)
  }

  contains(item) {
    return (
      item.x > this.x && item.x < this.x + this.sizex &&
      item.y > this.y && item.y < this.y + this.sizey)
  }

  intersects(range) {
    let dx = abs(range.x - (this.x + this.sizex / 2)),
      dy = abs(range.y - (this.y + this.sizey / 2)),
      dcorner = sqrt(pow(this.sizex / 2, 2) + pow(this.sizey / 2, 2))

    // no possible interection
    if (dx > range.r + this.sizex / 2 || dy > range.r + this.sizey / 2) return false

    // corner exclusion
    if (dist(range.x, range.y, this.x + this.sizex / 2, this.y + this.sizey / 2) > dcorner + range.r) return false

    return true
  }

  subdivide() {
    let w = this.sizex / 2,
      h = this.sizey / 2
    this.children.push(new Quadtree(this.x, this.y, w, h));
    this.children.push(new Quadtree(this.x + w, this.y, w, h));
    this.children.push(new Quadtree(this.x, this.y + h, w, h));
    this.children.push(new Quadtree(this.x + w, this.y + h, w, h));
    this.hasSplit = true
  }

  give(item) {
    let tcl = this.children.length
    for (let i = 0; i < tcl; i++) this.children[i].insert(item)
  }

  insert(item) {
    if (this.contains(item)) {
      if (!this.hasSplit) {
        if (!this.isFull()) this.items.push(item)
        else {
          this.subdivide();
          this.give(item);
        }
      } else this.give(item)
    }
  }

  ask(area, itemsArr) { //area = {x:,y:,r:}
    if (this.intersects(area)) {
      let til = this.items.length
      for (let i = 0; i < til; i++) {
        let d = dist(this.items[i].x, this.items[i].y, area.x, area.y)
        if (d < area.r) itemsArr.push(this.items[i])
      }
      if (this.hasSplit) {
        let tcl = this.children.length
        for (let j = 0; j < tcl; j++) this.children[j].ask(area, itemsArr)
      }
    }
    return itemsArr;
  }
}