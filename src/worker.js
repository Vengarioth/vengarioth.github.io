import createWorkerServer from './worker/worker-server';
import Perceptron from './perceptron/perceptron';
import generateXorData from './perceptron/generate-xor-data';
import createPerceptronController from './worker/perceptron-controller';

((global) => {
  const WorkerServer = createWorkerServer(global);
  const PerceptronController = createPerceptronController(Perceptron, generateXorData);
  const worker = new WorkerServer();

  const perceptronController = new PerceptronController(worker);
})(self);
