import EventEmitter from 'eventemitter3';

const create = (global) => class WorkerServer {
  constructor() {
    this._eventEmitter = new EventEmitter();
    global.onmessage = (({ data }) => {
      const { type, payload } = data;
      this._eventEmitter.emit(type, payload);
    });

    this.on('ping', () => {
      this.send('pong');
    });
  }

  send(type, payload) {
    global.postMessage({ type, payload });
  }

  on(event, callback) {
    this._eventEmitter.on(event, callback);
  }
};

export default create;
