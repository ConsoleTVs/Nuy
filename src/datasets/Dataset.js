
export default class Dataset
{
    /**
     * The dataset data.
     */
    d_data = []

    /**
     * Callback when updated.
     */
    on_update = null

    /**
     * The color of the dataset.
     */
    d_color = '#6574CD'

    constructor(data)
    {
        this.d_data = data

        return this
    }

    /**
     * Set the data of the dataset.
     *
     * @param {array} value
     */
    data(value = null)
    {
        if (value != null) {

            if (this.on_update) {
                this.on_update(this.d_data, value)
            }

            this.d_data = value

            return this
        }

        return this.d_data
    }

    /**
     * Set the dataset color.
     *
     * @param {string} value
     */
    color(value = null)
    {
        if (value != null) {
            this.d_color = value

            return this
        }

        return this.d_color
    }
}