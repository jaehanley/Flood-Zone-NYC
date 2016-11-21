/**
 * Redux middleware for making API requests.
 */
export default function api({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      request,
      onSuccess,
      shouldRequest = () => true,
      payload = {}
    } = action;

    if (!types) {
      return next(action);
    }

    if (!Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof request !== 'function') {
      throw new Error('Expected request to be a function.');
    }

    if (!shouldRequest(getState())) {
      return null;
    }

    const [requestType, successType, failureType] = types;

    const promise = request();

    dispatch({
      ...payload,
      promise,
      type: requestType,
    });

    promise.then((response) => {
      dispatch({
        ...payload,
        response,
        type: successType,
      });

      if (onSuccess) {
        onSuccess(dispatch, getState());
      }
    }, (error) => {
      dispatch({
        ...payload,
        error,
        type: failureType,
      });
    });
  };
}
