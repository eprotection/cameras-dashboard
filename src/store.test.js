import { render, screen } from '@testing-library/react';

import backend from './Backend'
import {store} from './store'
import {loadAuth, selectAuth} from './auth/authSlice'

const data = {
  ws   : {id:"Agtech",name:"Agtech 2030",prefs:{allowPublic:null}},
  auth : {user:{name:"Igor"}, role:{name:"tester"}}
}


jest.mock('./Backend', ()=>{
  return {
    __esModule: true,
    default: {
      apiRequest : async (method,path)=>{ 
        switch(path){
          case '/':          return data.ws
          case '/auth/info': return data.auth
        }
      }
    }
  }
});


describe('auth slice test', () => {

  test('initial value', () => {
    const auth = selectAuth(store.getState())
    expect(auth).toEqual({
      ws       : null,
      user     : null,
      error    : null
    });
  });
 
  it('load', async () => {
    store.dispatch(loadAuth())
    await new Promise(resolve=>{setTimeout(()=>{resolve()}, 2000)})
    const auth = selectAuth(store.getState())
    expect(auth).toEqual({
      ws       : data.ws,
      user     : {name: data.auth.user.name, role: data.auth.role.name},
      error    : null
    });
  });
});
