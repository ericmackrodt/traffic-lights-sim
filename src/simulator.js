class Simulator {
    /**
     * Main traffic simulator class
     * @param {Intersection[]} intersections sets the intersections in for the current simulator
     * @param {Pubsub} pubsub accepts an event aggregator if needed for reporting
     */
    constructor(intersection, pubsub) {
        if (!intersection) throw new Error('A simulations cannot be instantiated without an intersection');

        this._intersection = intersection;
        this._pubsub = pubsub;
        this._currentCount = 0;
        this._currentColor = this._getColorSetting(constants.colors.RED);
    }

    /**
     * Exposes the current intersection
     */
    get intersection() {
        return this._intersection;
    }

    /**
     * Exposes the current cycle color
     */
    get currentColor() {
        return this._currentColor;
    }

    _sendEvent(name, intersection) {
        if (this._pubsub && this._pubsub.publish) {
            this._pubsub.publish(name, intersection);
        }
    }

    _getColorSetting(color) {
        return constants.colorSettings.find((light) => color === light.color);
    }

    _updateLights() {
        this._currentColor = this._getColorSetting(this._currentColor.next);
        this._intersection.updateActiveLights(this._currentColor.color);
    }

    /**
     * Runs a cycle of the simulation.
     */
    updateSimulation() {
        this._currentCount--;

        if (this._currentCount < 0) {
            this._updateLights();
            
            // When a set of lights finshes its cycle, activate the other set and 
            // start the process over
            if (this._currentColor.activate) {
                this._intersection.activateOppositeLights();
                // All lights will be red for a second if the line below is commented
                // I believe they do that in real life for safety purposes, if that's not a requirement
                // the next line can be uncommented.
                // this._updateLights();
            }
            
            this._sendEvent('intersection', this._intersection);        
            this._currentCount = this._currentColor.duration;
        }

        this._sendEvent('tick', { tick: this._currentCount, currentColor: this._currentColor.color });
    }

    /**
     * Starts the simulation
     */
    start() {
        this._interval = setInterval(() => this.updateSimulation(), constants.INTERSECTION_INTERVAL_MS);
    }

    /**
     * Ends the simulation
     */
    end() {
        clearInterval(this._interval);
    }
}