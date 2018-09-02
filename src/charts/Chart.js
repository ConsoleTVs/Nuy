import 'svg.js'

export default class Chart
{
    /**
     * Stores the Nuy instance
     */
    nuy = null

    /**
     * Contains the svg chart.
     */
    chart = null

    /**
     * Stores the chart height.
     */
    c_height = null

    /**
     * Stores the chart width.
     */
    c_width = null

    /**
     * The chart animation time in ms.
     */
    c_animate = 350

    /**
     * Constructs the chart
     *
     * @param {Nuy} nuy
     */
    constructor(nuy)
    {
        // Set the nuy instance
        this.nuy = nuy

        // Precalculate the size of the chart before the SVG method
        var [width, height] = this.getElementDimensions()

        // Chart init
        this.chart = SVG(nuy.container)

        // Initial chart resize
        this.resize(width, height)

        return this
    }

    /**
     * Returns the dimensions of the div element.
     */
    getElementDimensions()
    {
        return [this.nuy.element.clientWidth, this.nuy.element.clientHeight]
    }

    /**
     * Resizes the chart with the given dimensions.
     *
     * @param {float} width
     * @param {float} height
     */
    resize(width = null, height = null)
    {
        this.c_width = width == null || width == 0 ? this.nuy.defaultDimensions[0] : width
        this.c_height = height == null || height == 0 ? this.nuy.defaultDimensions[1] : height
        this.chart.size(this.c_width, this.c_height)

        return this
    }

    /**
     *  Set the chart height.
     *
     * @param {float} value
     */
    height(value)
    {
        this.resize(this.c_width, value)

        return this
    }

    /**
     * Set the chart width.
     *
     * @param {float} value
     */
    width(value)
    {
        this.resize(value, this.c_height)

        return this
    }

    /**
     * Set the animation time of the chart.
     *
     * @param {float} value
     */
    animate(value)
    {
        if (value != null) {
            this.c_animate = value

            return this
        }

        return this.c_animate
    }

    /**
     * Render function.
     */
    render()
    {
        // Here as a definition.
        return this
    }

    /**
     * Removes the chart.
     */
    remove()
    {
        this.chart.clear()
    }

    /**
     * Destroy the chart.
     */
    destroy()
    {
        this.chart.remove()
    }

    /**
     * Removes and renders the chart again.
     */
    reRender()
    {
        this.destroy()

        this.chart = SVG(this.nuy.container)

        var [width, height] = this.getElementDimensions()
        this.resize(width, height)

        return this.render()
    }
}