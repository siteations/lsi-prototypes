import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

//generator on parent component... click area to update data

class TestPane extends Component {
	constructor(props) {
    super(props);
    this.state = {};
  }

  //----------------------------all the d3 functions nesting here--------------------------------

  //data instead of this.props to use this.props and nextProps
  sim(data){
    this.simulation = d3.forceSimulation(data.data.nodes)
      .force("charge",
        d3.forceManyBody()
          .strength(data.forceStrength)
      )
      .force("link", d3.forceLink(data.data.links).id(function(d) { return d.name }))
      .force("collide",d3.forceCollide( function(d){ return 18 }).iterations(16) )
      .force("center", d3.forceCenter(data.width / 2, data.height / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));
  }

  runSim(data) {
     this.simulation
            .nodes(data.data.nodes)
            .on("tick", this.ticked);

    this.simulation
          .force("link")
         .links(data.data.links);
  }

  ticked () {
         var link = d3.selectAll('line');
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            link.exit().remove();

            var linkT = d3.selectAll('.linkLabels');
            linkT
                .attr("x", function(d) { return (d.source.x+ d.target.x)/2; })
                .attr("y", function(d) { return (d.source.y+ d.target.y)/2; });

            var node = d3.selectAll('circle');
            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            var nodeT = d3.selectAll('.labels');
            nodeT
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; });
        }

  dragstarted(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

  dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

  dragended(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

  setup(data){ // stupid old-school d3 data setting & vis attributes

    var svg = d3.selectAll('svg');

    var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.data.links)
            .enter()
            .append("line")
            .attr("stroke", "black");

    var linkT = svg.append("g")
            .selectAll("text")
            .data(data.data.links)
            .enter()
            .append("text")
            .attr("class", "linkLabels")
            .attr('fill', 'red')
            .text(function(d) { return d.rel });

   var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data.data.nodes)
            .enter()
            .append("circle")
            .attr("r", function(d){  return 5 })
            .call(d3.drag()
                .on("start", d=>this.dragstarted(d))
                .on("drag", d=>this.dragged(d))
                .on("end", d=>this.dragended(d)));

  var nodeT = svg.append("g")

            .selectAll("text")
            .data(data.data.nodes)
            .enter().append("text")
            .attr("class", "labels")
            .attr("dx", function(d){  return 5 })
            .attr("dy", ".35em")
            .text(function(d) { return d.name })
            .on('click', function(d) { console.log('node ', d.name, d.id, d.type) });
  }


//----------------------------END the d3 nesting here--------------------------------

//----------------------------react update cycles to trigger reloading of props--------------------------------

  componentDidMount() {
    console.log(this.props);
    this.sim(this.props)
    this.setup(this.props)
    this.runSim(this.props)
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  shouldComponentUpdate(nextProps){
    // clearly you'd want a differnet conditional, but this works for now

    return nextProps.data.nodes.length !== this.props.data.nodes.length
  }

  componentWillUpdate(nextProps){
    this.simulation.stop();
    var gs = d3.selectAll('g').remove();

    //brute force update (vs. enter, update, exit comparison cycle)

    this.sim(nextProps)
    this.setup(nextProps)
    this.runSim(nextProps)
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height} />
    );
  }
};


//typically I'd do a componentDidMount function to query about parent width/height, but this is quick
TestPane.defaultProps = {
  forceStrength: -100
};


export default TestPane;
