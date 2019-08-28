import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if(stream.userId===this.props.currentUserId){
            return (
                <div className="right floated content">
                    
                    <Link to={`/streams/edit/${stream.id}`} >
                         <button className="ui button primary">
                            Edit
                         </button>
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`}>
                         <button className="ui button negative">
                            Delete
                         </button>
                    </Link>
                </div>);
        }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon book" />
                    <div className="content list-content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                    </div>
                </div>
            );
        });
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Add a book
                    </Link>
                </div>
            )
        }
    }
    
    render() {
        return (
            <div>
                <h2>Books</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps=(state) => {
    var streams = Object.keys(state.streams).map(function(key) {
        return state.streams[key];
    });
    return { 
        streams: streams,
        currentUserId:state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps,{ fetchStreams })(StreamList);