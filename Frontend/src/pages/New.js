import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

export default class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    descriptions: '',
    hashtags: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleSubmint = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('descriptions', this.state.descriptions);
    data.append('hashtags', this.state.hashtags);

    await api.post('/posts', data);
    this.props.history.push('/');
  };
  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmint}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="descriptions"
          placeholder="Descrição"
          onChange={this.handleChange}
          value={this.state.descriptions}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
