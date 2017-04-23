class Intersection {
    /**
     * Represents an intesrsection with its set of traffic lights
     * @param {Light[]} lights set of traffic lights in the intersection
     */
    constructor(...lights) {
        if (!lights || !lights.length) throw new Error('Cannot instantiate intersection without lights.');

        this._lights = lights;
    }

    /**
     * Current traffic lights in the intersection
     */
    get lights() {
        return this._lights;
    }

    /**
     * Updates the colors of the traffic lights in the intersection
     * @param {*} currentColor the new traffic light color in the intersection
     */
    updateActiveLights(color) {
        if (!color) throw new Error('Cannot update lights without a color');

        const activeLights = this._lights.filter(light => light.active);
        activeLights.forEach(light => light.color = color);
    }

    /**
     * Swaps active set of traffic ligts.
     */
    activateOppositeLights() {
        this._lights.forEach(light => light.active = !light.active);
    }
}