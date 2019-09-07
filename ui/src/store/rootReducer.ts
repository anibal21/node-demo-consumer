/*
 * Description: This file combine all the reducers of the app,
  and provides the types too.
 * Last Modified: Friday, 17th May 2019 11:27:30 am
 */

import { combineReducers } from 'redux'

import homeReducer from '../containers/Home/reducers/home'

const rootReducer = combineReducers({
    home: homeReducer,
})

export default rootReducer
