import React, { Component } from 'react';

const create = () => class Gradient extends Component {

  componentDidMount() {
    this._lastWidth = 0;
    window.addEventListener('resize', this.updateDimensions.bind(this));
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    this.refs.svg.setAttribute('width', parentWidth);
    this.updateDimensions();
  }

  update(n, m, data) {
    this.updateDimensions();
    const svg = d3.select(this.refs.svg),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    svg.selectAll('*').remove();

    const thresholds = d3.range(1, 11)
      .map(function(p) { return p / 10; });

    const contours = d3.contours()
      .size([n, m])
      .thresholds(thresholds);

    const color = d3.scaleLog()
      .domain(d3.extent(thresholds))
      .interpolate(function() { return d3.interpolateYlGnBu; });

    svg.selectAll("path")
      .data(contours(data))
      .enter().append("path")
      .attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
      .attr("fill", function(d) { return color(d.value); });
  }

  updateDimensions() {
    const parentWidth = this.refs.svg.parentNode.clientWidth;
    if(parentWidth === this._lastWidth) {
      return;
    }

    const f = this.props.f ? this.props.f : goldsteinPrice;

    this._lastWidth = parentWidth;

    this.refs.svg.setAttribute('width', parentWidth);
    this.refs.svg.setAttribute('height', parentWidth);
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
