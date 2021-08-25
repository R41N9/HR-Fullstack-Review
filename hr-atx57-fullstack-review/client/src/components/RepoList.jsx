import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {this.props.repos.length} repos.
        <ol id='repo-list'>
          {this.props.repos.map(({ url, name }) => {
            return <li><a href={url}>{name}</a></li>;
          })}
        </ol>
      </div>
    )
  }

}


export default RepoList;