export class EventEmitter {
    private events: { [eventName: string]: Array<(...args: any[]) => void> } = {};

    on = (eventName: string, listener: (...args: any[]) => void): void => {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    };

    emit = (eventName: string, ...args: any[]): void => {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(...args));
        }
    };
};
