import React from 'react';
import { Router,Route,Switch,withRouter } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history';

const PageHeader = withRouter(props => <Header {...props}/>);
const Routes =() => {
    return (
        <Router history={history}>
            <div>
            <PageHeader />
                <Switch>
                   
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                    <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                    <Route path="/streams/:id" exact component={StreamShow}/>
                </Switch>
            </div>
        </Router>
    )
}

export default Routes;