import { toast } from 'react-toastify';

const error = (message) => {
  toast.error(message);
  toast.clearWaitingQueue();
};

const success = (message) => {
  toast.success(message);
  toast.clearWaitingQueue();
};

const toastService = {
  error,
  success,
};

export default toastService;