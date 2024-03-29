/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "https://ngtbackend-v1.fly.dev/friendship/";

class CommunintyService {
  getFriendList(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `list?search=${search}`, { headers })
  }

  getChatHistories(access_token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `chat-histories`, { headers })
  }

  markAsRead(access_token, ids) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.patch(API_URL + `mark-as-read`, ids, { headers })
  }

  searchForUsers(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `search-friend-list?search=${search}&take=10`, {headers})
  }

  searchForFriendRequest(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL + `user-friend-requests?search=${search}`, {headers})
  }

  acceptFriendRequest(access_token, friendshipId, accept) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.patch(API_URL + `response-friend-request`, {friendship_id: friendshipId, accept: accept}, {headers})
  }

  addFriend(access_token, friendId) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.post(API_URL + `send-request?friendId=${friendId}`, {}, {headers})
  }

  getServerList(access_token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL +`server-list`, {headers})
  }

  getServerChatHistory(access_token, serverId, take) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };
    return axios.get(API_URL +`server-chat-histories?serverId=${serverId}&take=${take}`, {headers})
  }
}

export default new CommunintyService();