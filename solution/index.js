// ============== BLOCK ONE ==============

let dataset = [{letter:'A', value:1}, {letter:'D', value:1}, {letter:'J', value:3}, {letter:'L', value:1}, {letter:'M', value:1}, {letter:'P', value:1}, {letter:'R', value:2}, {letter:'Z', value:1}]; //G63 + Louis, Zubair, Justin

// ============== BLOCK TWO ==============

let svg = d3.select("svg"),
    margin = {top:20, right:20, bottom:30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    color = d3.scaleOrdinal(d3.schemeCategory10);

// ============== BLOCK THREE ==============

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

// ============== BLOCK FOUR ==============

let g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(dataset.map(function(d) { return d.letter; }));
y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

// ============== BLOCK FIVE ==============

g.append("g")
  .attr("class", "axis axis-x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(y).ticks(3))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("# names starting with each letter");

g.selectAll(".bar")
  .data(dataset)
  .enter().append("rect")
  .attr("class", "bar")
    .attr("x", function(d) { return x(d.letter); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.value)})
