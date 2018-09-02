import Dataset from './Dataset'

export default class Point extends Dataset
{
    /**
     * The radius of the point.
     */
    d_point = 5

    /**
     * Stores the dataset points.
     */
    d_points = []

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
}