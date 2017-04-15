import React, { Component } from 'react';

const create = () => class Graph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.update();
  }

  addData(x, y) {
    this.state.data.push({x, y});
    this.update();
  }

  update() {
    const data = this.state.data;
    const margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom().scale(x).ticks(5);

    var yAxis = d3.axisLeft().scale(y).ticks(5);

    var line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

    var svg = d3.select(this.refs.svg);
    svg.selectAll('*').remove();
    svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain([0, d3.max(data, function(d) { return d.y; })]);

    // Add the valueline path.
    svg.append("path")
    .attr("class", "line")
    .attr("d", line(data))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr("transform", "translate("+ margin.left +")");

    // Add the X Axis
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+ margin.left +"," + height + ")")
    .call(xAxis);

    // Add the Y Axis
    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ")")
    .call(yAxis);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <svg ref="svg" width={200} height={100} />
    );
  }
};

export default create;
