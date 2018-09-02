import Chart from './Chart'
import BarDataset from '../datasets/Bar'
import PointDataset from '../datasets/Point'
import LineDataset from '../datasets/Line'

export default class Multi extends Chart
{
    /**
     * Stores the datasets used in the bar chart.
     */
    m_datasets = []

    /**
     * Padding of the bars in the same set.
     */
    m_bar_padding = 5

    /**
     * Create a new bar dataset for the chart.
     *
     * @param {array} value
     */
    barDataset(value)
    {
        let data = new BarDataset(value)

        this.m_datasets.push(data)

        data.on_update = (old_data, new_data) => {
            data.d_bars.forEach((value, index) => {
                if (new_data[index] != old_data[index]) {
                    value
                        .animate(this.c_animate, '<>')
                        .size(data.d_thickness, (new_data[index] * this.getMaxHeight()) / this.getMaxValue())
                }
            })
        }

        return data
    }

    /**
     * Create a new point dataset for the chart.
     *
     * @param {array} value
     */
    pointDataset(value)
    {
        let data = new PointDataset(value)

        this.m_datasets.push(data)

        data.on_update = (old_data, new_data) => {
            data.d_points.forEach((value, index) => {
                if (new_data[index] != old_data[index]) {
                    value
                        .animate(this.c_animate, '<>')
                        .dmove(
                            0,
                            ((old_data[index] * this.getMaxHeight()) / this.getMaxValue())
                            - ((new_data[index] * this.getMaxHeight()) / this.getMaxValue())
                        )
                }
            })
        }

        return data
    }

    /**
     * Create a new line dataset for the chart.
     *
     * @param {array} value
     */
    lineDataset(value)
    {
        let data = new LineDataset(value)

        this.m_datasets.push(data)

        data.on_update = (old_data, new_data) => {
            var [slot_space, bars_space] = this.resizeAvailable()
            let offset = data.d_point / 2
            var path = "M"
            var a_path = "M"
            data.d_points.forEach((value, index) => {
                let set = (slot_space * index)
                let origin = set + (slot_space / 2)
                let circle_origin = origin - offset
                let circle_origin2 = (this.c_height - (new_data[index] * this.getMaxHeight()) / this.getMaxValue()) - offset
                if (index > 0) {
                    path += "L"
                    a_path += "L"
                } else {
                    a_path += origin + " " + this.c_height + " "
                }
                path += (circle_origin + offset) + " " + (circle_origin2 + offset) + " "
                a_path += (circle_origin + offset) + " " + (circle_origin2 + offset) + " "

                if (index == data.d_data.length - 1) {
                    a_path += "L" + origin + " " + this.c_height + ""
                }

                if (new_data[index] != old_data[index]) {
                    value
                        .animate(this.c_animate, '<>')
                        .dmove(
                            0,
                            ((old_data[index] * this.getMaxHeight()) / this.getMaxValue())
                            - ((new_data[index] * this.getMaxHeight()) / this.getMaxValue())
                        )
                }
            })

            data.d_area
            .animate(this.c_animate, '<>')
            .plot(a_path)

            data.d_line
                .animate(this.c_animate, '<>')
                .plot(path)
        }

        return data
    }

    /**
     * Set the bar padding in each set.
     *
     * @param {float} value
     */
    padding(value = null)
    {
        if (value != null) {
            this.m_bar_padding = value

            return this
        }

        return this.m_bar_padding
    }

    /**
     * Helper to get the max value from the datasets data.
     */
    getMaxValue()
    {
        // Avoid using spread operator or .apply as they may fail
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
        return this.m_datasets
            .map((dataset) => dataset.d_data.reduce(function(a, b) {
                return Math.max(a, b);
            }))
            .reduce(function(a, b) {
                return Math.max(a, b);
            })
    }

    /**
     * Helper to get the most data length in the datasets.
     */
    getMaxDataLength()
    {
        return this.m_datasets.reduce((a, b) => b.d_data.length > a.d_data.length ? b : a).d_data.length
    }

    /**
     * Calculates the space of the bars.
     */
    calculateBarsSpace()
    {
        return this.m_datasets
            .map((a) => a instanceof BarDataset ? a.d_thickness + (this.m_bar_padding * 2) : 0)
            .reduce((a, b) => a + b)
    }

    /**
     * Helper to get the max point thickness
     */
    getMaxPoint()
    {
        return this.m_datasets
            .map((dataset) => {
                if (dataset instanceof LineDataset || dataset instanceof PointDataset) {
                    return dataset.d_point
                }
                return 0
            })
            .reduce((a, b) => {
                return Math.max(a, b);
            })
    }

    /**
     * Helper to determine the max height of the chart, added the point circle
     */
    getMaxHeight()
    {
        return this.c_height - (this.getMaxPoint() / 2)
    }

    /**
     * Returns the dimensions and resizes the chart.
     */
    resizeAvailable()
    {
        if (this.m_datasets.length == 0) {
            throw 'You need at least 1 dataset to use the resize'
        }

        // Calculate the available slot and bar space
        let slot_space = (this.c_width / this.getMaxDataLength())
        // let bars_space = this.m_datasets.length * (this.b_thickness + (this.m_bar_padding * 2))
        let bars_space = this.calculateBarsSpace()

        // Calculate if the spaces are correct
        while (bars_space + (this.m_bar_padding * 3) > slot_space) {
            if (this.b_thickness == 1 && this.m_bar_padding == 0) {
                throw 'The space of the bars is too much for the space availabe. (' + bars_space + 'px used of ' + slot_space + 'px  available)'
            }
            console.warn('The space of the bars is too much for the space availabe. Trying to shorten the bars and/or padding');
            if (this.m_bar_padding > 0) {
                this.padding(this.m_bar_padding - 1)
            }
            this.m_datasets.forEach((a) => {
                if (a instanceof BarDataset && a.d_thickness > 1) {
                    a.thickness(a.d_thickness - 1)
                }
            })
            slot_space = this.c_width / this.getMaxDataLength() // Not needed ?
            bars_space = this.calculateBarsSpace()
        }

        return [slot_space, bars_space]
    }

    /**
     * Renders the chart to the SVG container.
     */
    render()
    {
        if (this.m_datasets.length == 0) {
            throw 'You need at least 1 dataset to use this chart'
        }

        var [slot_space, bars_space] = this.resizeAvailable()

        let max_value = this.getMaxValue()
        let bar_index = 0
        // Create the chart
        this.m_datasets.forEach((dataset) => {

            /**
             * Bar dataset
             */
            if (dataset instanceof BarDataset) {
                dataset.d_data.forEach((value, v_index) => {
                    let set = (slot_space * v_index)
                    let origin = (slot_space / 2) + set - (bars_space / 2)
                    let bar_origin =
                        origin
                        + ((this.m_bar_padding + dataset.d_thickness + this.m_bar_padding) * bar_index)
                        + this.m_bar_padding
                    dataset.d_bars.push(this.chart
                        .rect(dataset.d_thickness, 0)
                        .move(bar_origin, - (this.c_height))
                        .flip('y')
                        .fill(dataset.d_color)
                        .radius(dataset.d_radius)
                        .animate(this.c_animate, '<>')
                        .size(dataset.d_thickness, (value * this.getMaxHeight()) / max_value)
                    )
                })
                bar_index++
            }

            /**
             * Point dataset
             */
            else if (dataset instanceof PointDataset) {
                dataset.d_data.forEach((value, v_index) => {
                    let set = (slot_space * v_index)
                    let origin = set + (slot_space / 2)
                    let circle_origin = origin - (dataset.d_point / 2)
                    dataset.d_points.push(this.chart
                        .circle(0)
                        .radius(dataset.d_point / 2)
                        .move(circle_origin, (this.c_height - (value * this.getMaxHeight()) / max_value) - (dataset.d_point / 2))
                        .radius(0)
                        .fill(dataset.d_color)
                        .animate(this.c_animate, '<>')
                        .radius(dataset.d_point / 2)
                    )
                })
            }

            /**
             * Line dataset
             */
            else if (dataset instanceof LineDataset) {
                let path = "M"
                let a_path = "M"
                let offset = dataset.d_point / 2
                console.log(dataset.d_point)
                dataset.d_data.forEach((value, v_index) => {
                    let set = (slot_space * v_index)
                    let origin = set + (slot_space / 2)
                    let circle_origin = origin - offset
                    let circle_origin2 = (this.c_height - (value * this.getMaxHeight()) / max_value) - offset
                    dataset.d_points.push(this.chart
                        .circle(0)
                        .radius(offset)
                        .move(circle_origin, circle_origin2)
                        .radius(0)
                        .fill(dataset.d_color)
                        .animate(this.c_animate, '<>')
                        .radius(offset)
                    )
                    if (v_index > 0) {
                        path += "L"
                        a_path += "L"
                    } else {
                        a_path += origin + " " + this.c_height + " "
                    }
                    path += (circle_origin + offset) + " " + (circle_origin2 + offset) + " "
                    a_path += (circle_origin + offset) + " " + (circle_origin2 + offset) + " "

                    if (v_index == dataset.d_data.length - 1) {
                        a_path += "L" + origin + " " + this.c_height + ""
                    }

                })

                if (dataset.d_area_enable) {
                    dataset.d_area = this.chart
                        .path(a_path)
                        .fill(dataset.d_color)
                        .opacity(0)
                        .animate(this.c_animate, '<>')
                        .opacity(0.25)
                }

                dataset.d_line = this.chart
                    .path(path)
                    .fill('transparent')
                    .stroke(dataset.d_color)
                    .animate(this.c_animate, '<>')
                    .stroke({
                        width: dataset.d_thickness
                    })
            }
        })

        return super.render()
    }
}