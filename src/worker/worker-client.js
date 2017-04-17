import EventEmitter from 'eventemitter3';

const workerAddress = 'dist/vengarioth-github-io-worker.max.js';

const create = () => class WorkerClient {
  constructor() {
    this._eventEmitter = new EventEmitter();
  }

  start() {
    this._worker = new Worker(workerAddress);
    this._worker.onmessage = (({ data }) => {
      const { type, payload } = data;
      this._eventEmitter.emit(type, payload);
    });
  }

  send(type, payload) {
    this._worker.postMessage({ type, payload });
  }

  shutdown() {
    this._worker.terminate();
  }

  ping(callback) {
    const start = new Date().getTime();
    this._eventEmitter.once('pong', () => {
      const end = new Date().getTime();
      callback(end - start);
    });
    this.send('ping')
  }

  on(event, callback) {
    this._eventEmitter.on(event, callback);
  }
};

export default create;
