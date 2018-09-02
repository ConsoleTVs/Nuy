import Dataset from './Dataset'

export default class Line extends Dataset
{
    /**
     * The line thickness.
     */
    d_thickness = 3

    /**
     * The radius of the point.
     */
    d_point = 10

    /**
     * Determines if the line will display an area.
     */
    d_area_enable = false

    /**
     * Stores the dataset line.
     */
    d_line = null

    /**
     * Stores the dataset area.
     */
    d_area = null

    /**
     * Stores the dataset points.
     */
    d_points = []

    /**
     * Set or get the dataset thickness.
     *
     * @param {float} value
     */
    thickness(value = null)
    {
        if (value != null) {
            this.d_thickness = value

            return this
        }

        return this.d_thickness
    }

    /**
     * Set or get the dataset point radius.
     *
     * @param {float} value
     */
    point(value = null)
    {
        if (value != null) {
            this.d_point = value

            return this
        }

        return this.d_point
    }

    /**
     * Determines if the line will show an area.
     *
     * @param {bool} value
     */
    area(value = null)
    {
        if (value != null) {
            this.d_area_enable = value

            return this
        }

        return this.d_area_enable
    }
}