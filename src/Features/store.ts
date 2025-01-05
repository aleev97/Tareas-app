import { configureStore} from '@reduxjs/toolkit';
import tasksReducer from '../Features/tasks/tasksSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

store.subscribe(() => {
    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;