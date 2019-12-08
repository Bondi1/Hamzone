/**
 * route - Representing the path between boxes
 *
 * @param  {type} start starting box
 * @param  {type} end   destination box
 * @param  {type} cost  cost spent by Hambotic to run the route
 * @return {type}       Object
 */
function route(start, end, cost) {
  this.start = start;
  this.end = end;
  this.cost = cost;
  this.id = start.id + end.id;

  this.print = function print() {
    console.log(`${this.fromTo} : ${this.cost}`);
  };

  this.fromTo = this.start.id + " -> " + this.end.id;
  return this;
};


/**
 * box - Representing each hambox Object
 *
 * @param  {type} id Name
 * @return {type}    Object
 */
function box(id) {
  this.id = id;
  return this;
};
