import Dataset from './Dataset'

export default class Bar extends Dataset
{
    /**
     * The line thickness.
     */
    d_thickness = 10

    /**
     * The bar edge radius (rounded edges).
     */
    d_radius = 5

    /**
     * Stores the bars itself.
     */
    d_bars = []

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
     * Set the bar edge radius.
     *
     * @param {float} value
     */
    radius(value = null)
    {
        if (value != null) {
            this.d_radius = value

            return this
        }

        return this.d_radius
    }
}