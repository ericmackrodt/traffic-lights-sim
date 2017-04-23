class UiController {

    constructor (simulator, pubsub) {
        this._simulator = simulator;

        // Ui elements
        
        const intersectionDiv = document.getElementById('main-intersection');

        this._startButton = document.getElementById('startBtn');
        this._pauseButton = document.getElementById('pauseBtn');
        this._intersectionLights = intersectionDiv.getElementsByTagName('li');
        this._clockSpan = document.getElementById('clock');
        this._lightSpan = document.getElementById('light');

        // Events

        pubsub.subscribe('intersection', (intersection) => this._updateIntersection(intersection));
        pubsub.subscribe('tick', (cycle) => this._tick(cycle));
        this._startButton.addEventListener('click', () => this._startSimulator());
        this._pauseButton.addEventListener('click', () => this._pauseSimulator());
    }

    /**
     * Removes any light class currently in the lights
     * @param {Element} element html element to be cleared.
     */
    _clearLights(element) {
        element.classList.remove('red');
        element.classList.remove('green');
        element.classList.remove('yellow');
    }

    /**
     * Set the right light color for the html element
     * @param {Element} element html element of the light to be updated.
     */
    _updateLight(element, intersection) {
        this._clearLights(element);

        //Set the light
        for (let light of intersection.lights) {
            if (light.id === element.className) {
                element.classList.add(light.color);
            }
        }
    }

    _tick(cycle) {
        this._clockSpan.innerText = cycle.tick;
        this._lightSpan.innerText = cycle.currentColor;
    }

    _logIntersection(intersection) {
        const currentTime = new Date();
        const lightStrings = intersection.lights.map(light => `${light.id}: ${light.color}`);
        console.log(`[${currentTime.toString()}] - ${lightStrings.join(', ')}`);
    }

    _updateIntersection(intersection) {
        this._logIntersection(intersection);
        // This is not a normal array, I can't use forEach
        for (let element of this._intersectionLights) {
            this._updateLight(element, intersection);
        }
    }

    _startSimulator() {
        this._simulator.start();
        this._startButton.setAttribute('disabled', '');
        this._pauseButton.removeAttribute('disabled', '');
    }

    _pauseSimulator() {
        this._simulator.end();
        this._startButton.removeAttribute('disabled', '');
        this._pauseButton.setAttribute('disabled', '');
    }
}