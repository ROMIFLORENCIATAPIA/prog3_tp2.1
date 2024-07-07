class Sensor {
    constructor(id, name, type, value, unit, updated_at) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.updated_at = updated_at;
    }

    get updateValue() {
        return this.value;
    }

    set updateValue(newValue) {
        this.value = newValue;
        this.updated_at = new Date().toISOString();
    }
}

class SensorManager {
    constructor() {
        this.sensors = [];
    }

    async loadSensors(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load sensors: ${response.statusText}`);
            }
            const data = await response.json();
            this.sensors = data.map(sensorData => 
                new Sensor(sensorData.id, sensorData.name, sensorData.type, sensorData.value, sensorData.unit, sensorData.updated_at)
            );
            this.render();
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const sensorList = document.getElementById('sensor-list');
        sensorList.innerHTML = '';

        this.sensors.forEach(sensor => {
            const sensorItem = document.createElement('div');
            sensorItem.className = 'sensor-item';
            sensorItem.innerHTML = `
                <h3>${sensor.name}</h3>
                <p>Type: ${sensor.type}</p>
                <p>Value: ${sensor.value} ${sensor.unit}</p>
                <p>Last Updated: ${sensor.updated_at}</p>
            `;
            sensorList.appendChild(sensorItem);
        });
    }
}

// Inicialización del SensorManager y carga de sensores
const sensorManager = new SensorManager();
sensorManager.loadSensors('sensors.json');
