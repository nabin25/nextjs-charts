import dotProp from "dot-prop-immutable";

const STORAGE_PREFIX: string = "persist:";

interface persistConfig {
  key: string;
  whitelist?: string[];
  blacklist?: string[];
}

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function mergeDeep(target: any, source: any) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// This function filters the state based on the whitelist or blacklist
function filterState({
  state,
  whitelist,
  blacklist,
}: {
  state: any;
  whitelist?: string[];
  blacklist?: string[];
}) {
  if (whitelist && blacklist) {
    throw Error("Can't set both whitelist and blacklist at the same time");
  }
  if (whitelist) {
    let newState: any = {};
    for (const i in whitelist) {
      let val = dotProp.get(state, whitelist[i]);
      if (val !== undefined) {
        newState = dotProp.set(newState, whitelist[i], val);
      }
    }
    return newState;
  }
  if (blacklist) {
    let filteredState: any = JSON.parse(JSON.stringify(state));
    for (const i in blacklist) {
      filteredState = dotProp.delete(filteredState, blacklist[i]);
    }
    return filteredState;
  }
  return state;
}

export function persistReducer(config: persistConfig, reducer: any) {
  const { key, whitelist, blacklist } = config;
  let restore_complete = false;

  return (state: any, action: { type: string; payload?: any }) => {
    const newState = reducer(state, action);

    if (action.type === "@@INIT" && !restore_complete) {
      restore_complete = true;
      const data = localStorage.getItem(STORAGE_PREFIX + key);

      if (data !== null) {
        // Log the data to verify the merged state
        const newData = mergeDeep(newState, JSON.parse(data));
        return newData;
      }
    }

    if (restore_complete) {
      // Log the state after it's filtered and before it's persisted
      const filteredNewState = filterState({
        state: newState,
        whitelist,
        blacklist,
      });

      // Store the filtered state to localStorage
      localStorage.setItem(
        STORAGE_PREFIX + key,
        JSON.stringify(filteredNewState)
      );
    }

    return newState;
  };
}
