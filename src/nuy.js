import Progress from './charts/Progress'
import Multi from './charts/Multi'

export default class Nuy
{
    /**
     * The container (id) where the chart will be rendered.
     */
    container = null

    /**
     * Stores the element where to plot the chart.
     */
    element = null

    /**
     * Stores the default dimensions.
     */
    defaultDimensions = [500, 500]

    constructor(container)
    {
        this.container = container
        this.element = document.getElementById(container)

        return this
    }

    progress()
    {
        return new Progress(this)
    }

    multi()
    {
        return new Multi(this)
    }
}

window.Nuy = Nuy