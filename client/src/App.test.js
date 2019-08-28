import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Route , withRouter} from 'react-router-dom';
import Routes from './components/Routes';
import App from './components/App';
import Header from './components/Header';
import ConnectedStreamList  from './components/streams/StreamList';
import StreamList  from './components/streams/StreamList';
import StreamCreate from './components/streams/StreamCreate';
import StreamEdit from './components/streams/StreamEdit';
import StreamDelete from './components/streams/StreamDelete';
import StreamShow from './components/streams/StreamShow';
import configureStore from "redux-mock-store";
import Provider from 'react-redux';


describe('Testing react component with enzyme', () => {
  let container;
   beforeEach(()=>{
        container  = shallow(<App />);
    })
    it('renders without crashing', () => {
        expect(container.find(Routes)).toHaveLength(1);
     });

     it('renders correct routes', () => {
        const wrapper = shallow(<Routes />);
        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
          }, {});
          expect(pathMap["/"]).toBe(ConnectedStreamList);
          expect(pathMap["/streams/new"]).toBe(StreamCreate);
          expect(pathMap["/streams/edit/:id"]).toBe(StreamEdit);
          expect(pathMap["/streams/delete/:id"]).toBe(StreamDelete);
          expect(pathMap["/streams/:id"]).toBe(StreamShow);
     });

    
    
     
  });
describe('Testing StreamList component with enzyme', () => {
    const initialState = { 
    streams: {title:'Heelo', description:'Description'},
    auth: {userId:'121312'},
    isSignedIn: true};
    const mockStore = configureStore()
    let store,container, mounter;
    
    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<ConnectedStreamList store={store} /> )  
        mounter = shallow(<Routes store={store}/>);
    })

    it("should render without throwing an error", () => {
      expect(container.containsMatchingElement(<h2>Streams</h2>))
    });

    it("should render edit button ", () => {
      console.log(mounter.debug());
      expect(mounter.find('.ui button primary').length).toEqual(1); 
    });
     
  });
  