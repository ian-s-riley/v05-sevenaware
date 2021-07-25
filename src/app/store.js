import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';
import userReducer from '../features/user/userSlice';
import navigationReducer from '../features/navigation/navigationSlice';

export default configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
    navigation: navigationReducer,
  },
});
