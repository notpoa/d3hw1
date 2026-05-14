const margin = 30;
const width = 500;
const height = 500;

d3.csv("emails.csv").then(data => {

    data.forEach(d => {
        d.day = d.day;
        d.emails = +d.emails;
    });

    const maxY = d3.max(data, d => d.emails);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.day))
        .range([margin, width - margin])
        .paddingInner(.02);

    const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin, margin]);

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const bottomAxis = d3.axisBottom()
        .scale(xScale);

    const leftAxis = d3.axisLeft()
        .scale(yScale);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.day))
        .attr("y", d => yScale(d.emails))
        .attr("width", xScale.bandwidth())
        .attr("height", d => (height - margin) - yScale(d.emails))
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(bottomAxis);

    svg.append("g")
        .attr("transform", "translate(" + margin + ",0)")
        .call(leftAxis);

});