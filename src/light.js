class Light {

    /**
     * Represents a single Traffic light.
     * @param {string} id Identifies the traffic light
     * @param {boolean} active Tells the intersection the oppostion of this light towards others
     */
    constructor(id, active) {
        if (!id) throw new Error('A light cannot be instantiated without an id');

        // Didn't see the point in defining accessors (get/set) here since the properties
        // will be updated from the outside anyway;
        Object.defineProperties(this, {
            id: { value: id, writable: false, enumerable: true },
            color: { value: constants.colors.RED, writable: true, enumerable: true },
            active: { value: active, writable: true, enumerable: true }
        });
    }

}