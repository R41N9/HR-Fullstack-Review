import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    console.log('onsearch has run')
    axios.post('/repos', {term})
    .then((res) => {
      console.log('Status code: 200')
      console.log(res)
      this.getRepos()
    })
    .catch((err) => {
      console.log('Error from App.search: ', err);
      this.getRepos()
    })
  }

  getRepos() {
    axios.get('/repos')
    .then((repoData) => {
      let repos = [];
      for (var i = 0; i < repoData.data.length; i++) {
        repos.push({
          url: repoData.data[i].repo_url,
          name: repoData.data[i].repo_name
        });
      }
      this.setState({
        repos: repos
      })
    })
    .catch((err) => {
      console.log('Error from componentDidMount: ', err);
    })
  }

  componentDidMount() {
    console.log('Component did mount');
    this.getRepos()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));