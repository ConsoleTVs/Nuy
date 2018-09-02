import Chart from './Chart'

export default class Progress extends Chart
{
    /**
     * Stores the bar object.
     */
    p_bar = null

    /**
     * The bar thickness.
     */
    p_thickness = 10

    /**
     * The bar edge radius.
     */
    p_radius = 5

    /**
     * The value of the progress bar.
     */
    p_value = 0

    /**
     * Determines if the bar is vertically centered.
     */
    p_center = true

    /**
     * Determines the bar color.
     */
    p_color = "#6574CD"

    /**
     * Determines if the progress is indeterminate.
     */
    p_indeterminate = false

    /**
     * Set the bar thickness.
     *
     * @param {float} value
     */
    thickness(value = null)
    {
        if (value != null) {
            this.p_thickness = value

            return this
        }

        return this.p_thickness
    }

    /**
     * Set the bar edge radius.
     *
     * @param {float} value
     */
    radius(value = null)
    {
        if (value != null) {
            this.p_radius = value

            return this
        }

        return this.p_radius
    }

    /**
     * Set or get the progress of the chart.
     *
     * @param {float} value
     */
    value(value = null)
    {
        if (value != null) {
            if (value < 0 || value > 100) {
                throw "The value of the progress must be between 0 and 100.";
            }

            this.p_value = value

            if (this.p_bar) {
                // Animate the update of the value
                if (this.p_indeterminate) {
                    this.p_bar
                        .stop()
                        .animate(this.c_animate, '<>')
                        .size(2.55 * this.c_width / 100, this.p_thickness)
                        .animate(this.c_animate, '<>')
                        .move(0, this.p_center ? (this.c_height / 2) - (this.p_thickness / 2) : 0)
                    this.p_indeterminate = false
                }

                this.p_bar
                    .animate(this.c_animate, '<>')
                    .size(value * this.c_width / 100, this.p_thickness)
            }

            return this
        }

        return this.p_value
    }

    /**
     * Determines if the bar is vertically centered.
     *
     * @param {float} value
     */
    center(value = null)
    {
        if (value != null) {
            this.p_center = value

            return this
        }

        return this.p_center
    }

    /**
     * Determines the bar color.
     *
     * @param {float} value
     */
    color(value = null)
    {
        if (value != null) {
            this.p_color = value

            // Animate the color
            if (this.p_bar) {
                this.p_bar
                    .animate(this.c_animate, '<>')
                    .fill(value)
            }

            return this
        }

        return this.p_color
    }

    /**
     * Determines if the progress is indeterminate.
     *
     * @param {bool} value
     */
    indeterminate(value = null)
    {
        if (value != null) {

            if (this.p_bar) {
                if (value) {
                    this.p_bar
                        .animate(this.c_animate, '<>')
                        .size(
                            20 * this.c_width / 100,
                            this.p_thickness
                        )
                        .animate(this.c_animate * 2, '<>')
                        .dmove(80 * this.c_width / 100, 0)
                        .loop(null, true)

                    this.p_indeterminate = value

                    return this
                }

                this.value(this.value)
            }

            this.p_indeterminate = value

            return this
        }

        return this.p_indeterminate
    }

    /**
     * Renders the chart to the SVG container.
     */
    render()
    {
        this.p_bar = this.chart
            .rect(0, this.p_thickness)
            .radius(this.p_radius)
            .fill(this.p_color)
            .move(0, this.p_center ? (this.c_height / 2) - (this.p_thickness / 2) : 0)
        if (this.p_indeterminate) {
            this.p_bar
                .size(
                    20 * this.c_width / 100,
                    this.p_thickness
                )
                .animate(this.c_animate * 2, '<>')
                .dmove(80 * this.c_width / 100, 0)
                .loop(null, true)

            return super.render()
        }
        this.p_bar
            .animate(this.c_animate, '<>')
            .size(
                (this.p_indeterminate ? 25 : this.p_value) * this.c_width / 100,
                this.p_thickness
            )

        return super.render()
    }
}