import React, { Component } from 'react';

const create = () => class Gradient extends Component {

  componentDidMount() {
    this._lastWidth = 0;
    window.addEventListener('resize', this.updateDimensions.bind(this));
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    this.refs.svg.setAttribute('width', parentWidth);
    this.updateDimensions();
  }

  updateDimensions(force = false) {
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    if(!force && parentWidth === this._lastWidth) {
      return;
    }

    const f = this.props.f ? this.props.f : goldsteinPrice;

    this._lastWidth = parentWidth;

    this.refs.svg.setAttribute('width', parentWidth);
    this.refs.svg.setAttribute('height', parentWidth);

    const size = 10;
    const n = size, m = size, values = new Array(n * m);
    for(let i = 0, k = 0; i < n; i++) {
      for(let j = 0; j < m; j++, k++) {
        values[k] = f(i / size, j / size);
      }
    }

    var svg = d3.select(this.refs.svg),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    svg.selectAll('*').remove();

    var thresholds = d3.range(1, 11)
      .map(function(p) { return p / 10; });

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
      <svg ref="svg" width={200} height={200} />
    );
  }
};

export default create;
