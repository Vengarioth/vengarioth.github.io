import React, { Component } from 'react';

const create = () => class Gradient extends Component {

  componentDidMount() {
    this._lastWidth = 0;
    window.addEventListener('resize', this.updateDimensions.bind(this));
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    this.refs.svg.setAttribute('width', parentWidth);
    this.updateDimensions();
  }

  updateDimensions() {
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    if(parentWidth === this._lastWidth) {
      return;
    }

    this._lastWidth = parentWidth;

    console.log(parentWidth);
    this.refs.svg.setAttribute('width', parentWidth);

    var n = 240, m = 125, values = new Array(n * m);
    for (var j = 0.5, k = 0; j < m; ++j) {
      for (var i = 0.5; i < n; ++i, ++k) {
        values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
      }
    }

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    svg.selectAll('*').remove();

    var thresholds = d3.range(1, 21)
    .map(function(p) { return Math.pow(2, p); });

    var contours = d3.contours()
    .size([n, m])
    .thresholds(thresholds);

    var color = d3.scaleLog()
    .domain(d3.extent(thresholds))
    .interpolate(function() { return d3.interpolateYlGnBu; });

    svg.selectAll("path")
    .data(contours(values))
    .enter().append("path")
    .attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
    .attr("fill", function(d) { return color(d.value); });

    function goldsteinPrice(x, y) {
      return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
    }
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <svg ref="svg" width={800} height={500} />
    );
  }
};

export default create;
