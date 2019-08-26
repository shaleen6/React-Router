import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Route } from 'react-router-dom';
import Routes from './components/Routes';
import App from './components/App';
import Header from './components/Header';
import StreamList from './components/streams/StreamList';
import StreamCreate from './components/streams/StreamCreate';
import StreamEdit from './components/streams/StreamEdit';
import StreamDelete from './components/streams/StreamDelete';
import StreamShow from './components/streams/StreamShow';
import configureMockStore from "redux-mock-store";
import Provider from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({ 
    streams: {title:'Heelo', description:'Description'},
    currentUserId:'121312',
    isSignedIn: true});

describe('Testing react component with enzyme', () => {
   
    it('renders without crashing', () => {
        const component = shallow(<App />);
        expect(component.find(Routes)).toHaveLength(1);
     });

     it('renders correct routes', () => {
        const wrapper = shallow(<Routes />);
        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
          }, {});
          expect(wrapper.find(Header)).toHaveLength(1);
          expect(pathMap["/"]).toBe(StreamList);
          expect(pathMap["/streams/new"]).toBe(StreamCreate);
          expect(pathMap["/streams/edit/:id"]).toBe(StreamEdit);
          expect(pathMap["/streams/delete/:id"]).toBe(StreamDelete);
          expect(pathMap["/streams/:id"]).toBe(StreamShow);
     });

     it("should render without throwing an error", () => {
        const wrapper=mount(
            
                <StreamList streams="{title:'Heelo', description:'Description'}" isSignedIn="true" currentUserId='121312'  />
            
        )
        expect(wrapper.containsMatchingElement(<h2>Streams</h2>))
    });
    
     
  });

  